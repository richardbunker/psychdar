**TODOS**

-   snapshots
-   RC for client assessments

On the Client

-   User::clientsAssociatedWithMeasure(\$measure->id)->with('treatments.assessments')->get();

-   Treatment::ownedByUser($user->id)->canBeAnalysed(true)->withAssessmentsByMeasure($measure->id)->get()

*   implement RCI feature

For later:

-   Snapshots
-

### Dynamic Questionnaires

-   Can only calculate clinician effect size per 1 measure (e.g., CORE10 or ORS)
    -   will need to be able to set the clinician's outcome measure to then go ahead and filter the results

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
