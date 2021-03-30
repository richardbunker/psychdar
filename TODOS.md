**TODOS**

-   Email varification
-   Login/Register w/ inertia or Laravel?

On the Client

-   User::clientsAssociatedWithMeasure(\$measure->id)->with('treatments.assessments')->get();

-   Treatment::ownedByUser($user->id)->canBeAnalysed(true)->withAssessmentsByMeasure($measure->id)->get()

*   implement RCI feature

### Dynamic Questionnaires

-   Can only calculate clinician effect size per 1 measure (e.g., CORE10 or ORS)
    -   will need to be able to set the clinician's outcome measure to then go ahead and filter the results

Is it possible to dynamically calculate:

-   RCIs (MAYBE - you need the measure's Chronbach's alpha, but if you have that then yes)

A Client:

-   RC is comparing pre-test with post-test using the measures Chronbach's Alpha

## Flow ->

-   fresh sign up creates a new measure
-   structure is made first, then details can be added second
-   add that measure to a client gives unqiue Client_Measure URL
-   everytime URL is hit, creates and stores an Assemment instance with all relevant details (Client|Measure|User), increment treatmentEpisode/consultation count
