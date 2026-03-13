def encode_input(data):
    ordinal_map = {"Low": 0, "Medium": 1, "High": 2}
    yes_no_map = {"No": 0, "Yes": 1}
    school_type_map = {"Public": 0, "Private": 1}
    peer_map = {"Negative": 0, "Neutral": 1, "Positive": 2}
    gender_map = {"Male": 0, "Female": 1}
    parent_education_level_map = {"High School": 0, "College": 1, "Post Graduate": 2}
    distance_from_home_map = {"Near": 0, "Moderate": 1, "Far": 2}


    encoded = [

        data.hours_studied,
        data.attendance,
        ordinal_map[data.parental_involvement],
        ordinal_map[data.access_to_resources],
        yes_no_map[data.extracurricular_activities],
        data.sleep_hours,
        data.previous_scores,
        ordinal_map[data.motivation_level],
        yes_no_map[data.internet_access],
        data.tutoring_sessions,
        ordinal_map[data.family_income],
        ordinal_map[data.teacher_quality],
        school_type_map[data.school_type],
        peer_map[data.peer_influence],
        data.physical_activity,
        yes_no_map[data.learning_disabilities],
        parent_education_level_map[data.parent_education_level],
        distance_from_home_map[data.distance_from_home],
        gender_map[data.gender]
    ]

    return encoded