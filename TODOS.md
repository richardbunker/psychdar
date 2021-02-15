**TODOS**

### Include in Statistical Analyses

-   Move boolean field from Client to Treatment model

**Questions re: questionnaires**

Using the "JSON" column on the App/Models/Consultation::class method:

Is it possible to dynamically calculate:

-   RCIs (MAYBE - you need the measure's Chronbach's alpha, but if you have that then yes)
-   Effect Sizes (YES - just need pre/post means, SD of pre-test scores, and correlation for repeated-measures effect sizes)

A Client:

-   RC is comparing pre-test with post-test using the measures Chronbach's Alpha

A Clinician:

-   Effect Size is comparing grouped paired pre and post means. Mpost - Mpre / SDpre (ESpre). Effect size tells you the magnitude of a significant result.

**Features to build**

### Paired Ttest

-   Need for significant p value to detetrmine whether to render/invoke EffectSize function

### Dynamic Questionnaires

-   User uploaded/created questionnaires
    -   gets out of the copyright issues and accepting payment for said questionnaires
-   Perhaps flag if a questionnaire is to be used as an outcome measure upon questionnaire creation
-   Can only calculate clinician effect size per 1 measure (e.g., CORE10 or ORS)
    -   will need to be able to set the clinician's outcome measure to then go ahead and filter the results

_Clinician Settings_
"is_active": 1 (add column)
"preferences": {
"effect_size_settings": {
"selected_measure": 4,
"current_measures": [ 1, 3, 4 ],
}
}

### Snapshots

-   Snapshots of stats for clinics and clinicians

-   Create a client meta table/column to keep track of whether a client:
    -   canCreateOwnResources()
    -   shouldBeIncludedInStatisicalAnalyses()
    -   isCurrentlyActive()
    -   selectedOutcomeMeasure()

_JSON 'preferences' field on Client Model_
{
"can_create_own_resources" : 0|1,
"included_in_analyses: 0|1,
"outcom_measure": ''
}

### Graphing

-   Effect size graphing
    -   plot clinician's ES score against other de-identified clinicians from same clinic/organisation

### Client URL API

-   Offloading resource creation (Treatments, Consultations) to the client when filling out their questionnaire forms
-   Ability to delete consultations acidentally created

    _FLOW_ (Store Actions)
    -> http://therapyoutcomes.test/exa/eO31wK41EX
    -> checks (isActive(), canCreateOwnResources(), selectedOutcomeMeasure())
    -> checks ? continue : bail
    -> checks for active Treatments (ended_at !== null) - if true, add consultation to it - if false, create new treatment episode, and then add a consultation to it
    -> render the client's selecetedOutcomeMeasure()
    -> submit and store results in the consultation's data field
    -> return redirect() to thank you page

    _Clinician/User Manual Generation_ (Update Actions)
    -> create a new consultation
    -> consultation generates a unique URL that: - can only be used to complete the questionnaire once - has an expiry
    -> http://therapyoutcomes.test/exm/eO31wK41EX
    -> checks (isLinkNew(), isLinkAlive())
    -> checks ? continue : bail
    -> find the specific consultation
    -> render the client's selecetedOutcomeMeasure()
    -> submit and store results in the consultation's data field
    -> isLinkNew() = false, isLinkAlive() = false
    -> return redirect() to thank you page

## Other

-   questionnaire meta data:
    -   how many instances can be created over a day/week
    -   Add created_at timestamp to questionnaire JSON field

## Re-Design of URL API

_URL API/Measure Refactor_

-   Create multiple URLs for each Measure that's associated to the client.
-   the URL should contain information about the measure and the client
    -   eg http://therapyoutcomes.test/a/{hashed_measure_id}/{hashed_client_id}
-   When a client hits the URL it should:

    -   Render the seleceted measure (eg CORE10)
    -   determine whether the measure shouldIncrementConsultationCount(measure_id)
    -   On submit create a new Assessment::class instance with:
        -> organisation_id,
        -> clinic_id,
        -> clinician_id,
        -> client_id,
        -> treatment_id,
        -> measure_id (new Model to be created)
        -> data/values (JSON)
    -   update consultation_count on Treatment::class model if needed

-   Create a Measure::class model that will house the user generated measures
    -> id,
    -> name_long (STRING)
    -> name_short (STRING)
    -> structure (JSON)
    -> details (JSON)
    -> "text": [
    "instructions": 'Please rate today's session by dragging the slider to the nearest description that best fits your experience.',
    "items_header": ''
    ]
    -> "is_outcome": true,
    -> "alpha": 0.89,

*   Create a (many_to_many) org <-> measure relationship
    -> id
    -> organisation_id
    -> measure_id
    -   This can have two features
        1. keep a short list of "my measures" in drop downs (\$organisation->measures)
        2. show how popular a given measure is across organisations (\$measure->organisations->count())

## Measure Builder Component

-   add "instructions" to measure's structure JSON object and to details JSON object
-   finish Slider.js, Qualitative.js, Text.js
-   create Preview.js in ./MeasureBuilder
    -> renders a preview of entire measure within a full screen modal
