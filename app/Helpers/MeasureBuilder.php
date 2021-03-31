<?php

namespace App\Helpers;


class MeasureBuilder
{
    public static function dass21()
    {
        $dass21 = new \App\Models\Measure;
        $dass21->name = "Depression, Anxiety and Stress Scale 21 (DASS21)";
        $dass21->structure = json_encode(array(
            'name' => 'Depression, Anxiety and Stress Scale 21 (DASS21)',
            'instructions' => 'Please read each statement and select an option which indicates how much the statement applied to you over the past week. There are no right or wrong answers. Do not spend too much time on any statement.',
            'items' =>
            array(
                0 =>
                array(
                    'title' => '1. I found it hard to wind down',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                1 =>
                array(
                    'title' => '2. I was aware of dryness of my mouth',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                2 =>
                array(
                    'title' => '3. I couldn’t seem to experience any positive feeling at all',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                3 =>
                array(
                    'title' => '4. I experienced breathing difficulty (eg, excessively rapid breathing,  breathlessness in the absence of physical exertion)',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                4 =>
                array(
                    'title' => '5. I found it difficult to work up the initiative to do things',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                5 =>
                array(
                    'title' => '6. I tended to over-react to situations',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                6 =>
                array(
                    'title' => '7. I experienced trembling (eg, in the hands)',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                7 =>
                array(
                    'title' => '8. I felt that I was using a lot of nervous energy',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                8 =>
                array(
                    'title' => '9. I was worried about situations in which I might panic and make a fool of myself',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                9 =>
                array(
                    'title' => '10. I felt that I had nothing to look forward to',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                10 =>
                array(
                    'title' => '11. I found myself getting agitated',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                11 =>
                array(
                    'title' => '12. I found it difficult to relax',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                12 =>
                array(
                    'title' => '13. I felt down-hearted and blue',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                13 =>
                array(
                    'title' => '14. I was intolerant of anything that kept me from getting on with what I was  doing',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                14 =>
                array(
                    'title' => '15. I felt I was close to panic',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                15 =>
                array(
                    'title' => '16. I was unable to become enthusiastic about anything',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                16 =>
                array(
                    'title' => '17. I felt I wasn\'t worth much as a person',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                17 =>
                array(
                    'title' => '18. I felt that I was rather touchy',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                18 =>
                array(
                    'title' => '19. I was aware of the action of my heart in the absence of physical exertion (eg,  sense of heart rate increase, heart missing a beat)',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                19 =>
                array(
                    'title' => '20. I felt scared without any good reason',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
                20 =>
                array(
                    'title' => '21. I felt that life was meaningless',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' =>
                    array(
                        0 =>
                        array(
                            'label' => 'Never',
                            'value' => 0,
                        ),
                        1 =>
                        array(
                            'label' => 'Sometimes',
                            'value' => 1,
                        ),
                        2 =>
                        array(
                            'label' => 'Often',
                            'value' => 2,
                        ),
                        3 =>
                        array(
                            'label' => 'Almost Always',
                            'value' => 3,
                        ),
                    ),
                ),
            ),
        ));
        $dass21->details = json_encode(array(
            'author' => 'Lovibond, S.H. & Lovibond, P.F. (1995).  Manual for the Depression Anxiety Stress Scales. (2nd. Ed.)  Sydney: Psychology Foundation.',
        ));
        $dass21->scales = json_encode(array(
            0 =>
            array(
                'title' => 'Depression',
                'alpha' => '0.81',
                'operation' => 'Sum',
                'items' =>
                array(
                    0 => 12,
                    1 => 15,
                    2 => 16,
                    3 => 2,
                    4 => 20,
                    5 => 4,
                    6 => 9,
                ),
                'cuttOffs' =>
                array(
                    0 =>
                    array(
                        'label' => 'Normal',
                        'min' => 0,
                        'max' => 4,
                        'alert' => false,
                    ),
                    1 =>
                    array(
                        'label' => 'Mild',
                        'min' => 5,
                        'max' => 6,
                        'alert' => false,
                    ),
                    2 =>
                    array(
                        'label' => 'Moderate',
                        'min' => 7,
                        'max' => 10,
                        'alert' => false,
                    ),
                    3 =>
                    array(
                        'label' => 'Severe',
                        'min' => 11,
                        'max' => 13,
                        'alert' => false,
                    ),
                    4 =>
                    array(
                        'label' => 'Extremely Severe',
                        'min' => 14,
                        'max' => 21,
                        'alert' => false,
                    ),
                ),
            ),
            1 =>
            array(
                'title' => 'Anxiety',
                'alpha' => '0.89',
                'operation' => 'Sum',
                'items' =>
                array(
                    0 => 1,
                    1 => 14,
                    2 => 18,
                    3 => 19,
                    4 => 3,
                    5 => 6,
                    6 => 8,
                ),
                'cuttOffs' =>
                array(
                    0 =>
                    array(
                        'label' => 'Normal',
                        'min' => 0,
                        'max' => 3,
                        'alert' => false,
                    ),
                    1 =>
                    array(
                        'label' => 'Mild',
                        'min' => 4,
                        'max' => 5,
                        'alert' => false,
                    ),
                    2 =>
                    array(
                        'label' => 'Moderate',
                        'min' => 6,
                        'max' => 7,
                        'alert' => false,
                    ),
                    3 =>
                    array(
                        'label' => 'Severe',
                        'min' => 8,
                        'max' => 9,
                        'alert' => false,
                    ),
                    4 =>
                    array(
                        'label' => 'Extremely Severe',
                        'min' => 10,
                        'max' => 21,
                        'alert' => false,
                    ),
                ),
            ),
            2 =>
            array(
                'title' => 'Stress',
                'alpha' => '0.78',
                'operation' => 'Sum',
                'items' =>
                array(
                    0 => 0,
                    1 => 10,
                    2 => 11,
                    3 => 13,
                    4 => 17,
                    5 => 5,
                    6 => 7,
                ),
                'cuttOffs' =>
                array(
                    0 =>
                    array(
                        'label' => 'Normal',
                        'min' => 0,
                        'max' => 7,
                        'alert' => false,
                    ),
                    1 =>
                    array(
                        'label' => 'Mild',
                        'min' => 8,
                        'max' => 9,
                        'alert' => false,
                    ),
                    2 =>
                    array(
                        'label' => 'Moderate',
                        'min' => 10,
                        'max' => 12,
                        'alert' => false,
                    ),
                    3 =>
                    array(
                        'label' => 'Severe',
                        'min' => 13,
                        'max' => 16,
                        'alert' => false,
                    ),
                    4 =>
                    array(
                        'label' => 'Extremely Severe',
                        'min' => 17,
                        'max' => 21,
                        'alert' => false,
                    ),
                ),
            ),
        ));
        $dass21->is_private = false;
        $dass21->is_published = true;
        $dass21->save();
    }

    public static function core10()
    {        
        $core10 = new \App\Models\Measure;
        $core10->name = "CORE-10";
        $core10->structure = json_encode(
            array (
                'name' => 'CORE-10',
                'instructions' => 'This questionnaire has 10 statements about how you have been OVER THE LAST WEEK. Please read each statement and think how often you felt that way last week. Then select the option which is closest to this.',
                'items' => 
                array (
                    0 => 
                    array (
                    'title' => '1. I have felt tense, anxious or nervous',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    1 => 
                    array (
                    'title' => '2. I have felt I have someone to turn to for support when needed',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 4,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 3,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 1,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 0,
                        ),
                    ),
                    ),
                    2 => 
                    array (
                    'title' => '3. I have felt able to cope when things go wrong',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 4,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 3,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 1,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 0,
                        ),
                    ),
                    ),
                    3 => 
                    array (
                    'title' => '4. Talking to people has felt too much for me',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    4 => 
                    array (
                    'title' => '5. I have felt panic or terror',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    5 => 
                    array (
                    'title' => '6. I made plans to end my life',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    6 => 
                    array (
                    'title' => '7. I have had difficulty getting to sleep or staying asleep',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    7 => 
                    array (
                    'title' => '8. I have felt despairing or hopeless',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    8 => 
                    array (
                    'title' => '9. I have felt unhappy',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                    9 => 
                    array (
                    'title' => '10. Unwanted images or memories have been distressing me',
                    'subtitle' => NULL,
                    'type' => 'Options',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Not at all',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Only occasionally',
                        'value' => 1,
                        ),
                        2 => 
                        array (
                        'label' => 'Sometimes',
                        'value' => 2,
                        ),
                        3 => 
                        array (
                        'label' => 'Often',
                        'value' => 3,
                        ),
                        4 => 
                        array (
                        'label' => 'Most or all of the time',
                        'value' => 4,
                        ),
                    ),
                    ),
                ),
            )
        );
        $core10->details = json_encode(
            array (
            'author' => 'Barkham, M., Bewick, B., Mullin, T., Gilbody, S., Connell, J., Cahill, J., ... & Evans, C. (2013). The CORE‐10: A short measure of psychological distress for routine use in the psychological therapies. Counselling and Psychotherapy Research, 13(1), 3-13.',
            )
        );
        $core10->scales = json_encode(
            array (
                0 => 
                array (
                    'title' => 'Total',
                    'alpha' => '0.90',
                    'operation' => 'Sum',
                    'items' => 
                    array (
                    0 => 0,
                    1 => 1,
                    2 => 2,
                    3 => 3,
                    4 => 4,
                    5 => 5,
                    6 => 6,
                    7 => 7,
                    8 => 8,
                    9 => 9,
                    ),
                    'cuttOffs' => 
                    array (
                    0 => 
                    array (
                        'label' => 'Clinical',
                        'min' => 11,
                        'max' => 40,
                        'alert' => false,
                    ),
                    1 => 
                    array (
                        'label' => 'Sub Clinical',
                        'min' => 0,
                        'max' => 10,
                        'alert' => true,
                    ),
                    ),
                ),
                1 => 
                array (
                    'title' => 'Suicide Risk',
                    'alpha' => NULL,
                    'operation' => 'Sum',
                    'items' => 
                    array (
                    0 => 5,
                    ),
                    'cuttOffs' => 
                    array (
                    0 => 
                    array (
                        'label' => 'High Risk',
                        'min' => 3,
                        'max' => 4,
                        'alert' => true,
                    ),
                    ),
                ),
            )
        );
        $core10->is_private = false;
        $core10->is_published = true;
        $core10->save();
    }

    public static function therapyFeedback()
    {        
        $therapyFeedback = new \App\Models\Measure;
        $therapyFeedback->name = "Therapy Feedback";
        $therapyFeedback->structure = json_encode(
            array (
                'name' => 'Therapy Feedback',
                'instructions' => 'This information is only used for the purpose of enhancing your therapy experience. For example, when a therapy session is experienced as effective, the therapist reflects on the process to understand what types of interventions were best suited for that individual. Research suggests that feedback becomes a compass for the therapist to better understand and help their clients.',
                'items' => 
                array (
                    0 => 
                    array (
                    'title' => 'How helpful was your most recent session?',
                    'subtitle' => NULL,
                    'type' => 'Slider',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Extremely Unhelpful',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Extremely Helpful',
                        'value' => 10,
                        ),
                    ),
                    ),
                    1 => 
                    array (
                    'title' => 'Rate the quality of the therapy relationship.',
                    'subtitle' => NULL,
                    'type' => 'Slider',
                    'anchors' => 
                    array (
                        0 => 
                        array (
                        'label' => 'Extremely Poor',
                        'value' => 0,
                        ),
                        1 => 
                        array (
                        'label' => 'Excellent',
                        'value' => 10,
                        ),
                    ),
                    ),
                ),
            )
        );
        $therapyFeedback->scales = json_encode(
            array (
                0 => 
                array (
                    'title' => 'Helpfulness',
                    'alpha' => NULL,
                    'operation' => 'Sum',
                    'items' => 
                    array (
                    0 => 0,
                    ),
                    'cuttOffs' => 
                    array (
                    0 => 
                    array (
                        'label' => '🎉 Helpful Session 🎉',
                        'min' => 9,
                        'max' => 10,
                        'alert' => true,
                    ),
                    1 => 
                    array (
                        'label' => '🚨 Therapy Issue 🚨',
                        'min' => 0,
                        'max' => 7,
                        'alert' => true,
                    ),
                    ),
                ),
                1 => 
                array (
                    'title' => 'Relationship',
                    'alpha' => NULL,
                    'operation' => 'Sum',
                    'items' => 
                    array (
                    0 => 1,
                    ),
                    'cuttOffs' => 
                    array (
                    0 => 
                    array (
                        'label' => '🚨 Relationship Issue 🚨',
                        'min' => 0,
                        'max' => 7,
                        'alert' => true,
                    ),
                    ),
                ),
            )
        );
        $therapyFeedback->is_private = false;
        $therapyFeedback->is_published = true;
        $therapyFeedback->save();
    }
}