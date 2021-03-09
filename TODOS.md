**TODOS**

### Dynamic Questionnaires

-   User uploaded/created questionnaires
    -   gets out of the copyright issues and accepting payment for said questionnaires
-   Perhaps flag if a questionnaire is to be used as an outcome measure upon questionnaire creation
-   Can only calculate clinician effect size per 1 measure (e.g., CORE10 or ORS)
    -   will need to be able to set the clinician's outcome measure to then go ahead and filter the results

## Measuers

-   Add 'Publish' functionality
    -   Display Draft themeing on Measure.Index to alert user to unpublished measures
-   Fix Item type:scale edit 'not displaying add custom anchor component' bug
-   Create a published measure view that displays URL measure
-   Add to Client.Show assessment results with graphs

### Statistical Analyses

-   Move boolean field from Client to Treatment model

Is it possible to dynamically calculate:

-   RCIs (MAYBE - you need the measure's Chronbach's alpha, but if you have that then yes)
-   Effect Sizes (YES - just need pre/post means, SD of pre-test scores, and correlation for repeated-measures effect sizes)

A Client:

-   RC is comparing pre-test with post-test using the measures Chronbach's Alpha

A User:

-   Effect Size is comparing grouped paired pre and post means. Mpost - Mpre / SDpre (ESpre). Effect size tells you the magnitude of a significant result.

### Paired Ttest

-   Need for significant p value to detetrmine whether to render/invoke EffectSize function

### Snapshots

-   Snapshots of stats for a user
-   Graphically present these too

## Flow ->

-   fresh sign up creates a new measure
-   structure is made first, then details can be added second
-   add that measure to a client gives unqiue Client_Measure URL
-   everytime URL is hit, creates and stores an Assemment instance with all relevant details (Client|Measure|User), increment treatmentEpisode/consultation count
