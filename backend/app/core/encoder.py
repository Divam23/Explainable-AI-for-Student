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
        data.sleep_hours,
        data.previous_scores,
        data.tutoring_sessions,
        data.physical_activity,

        ordinal_map[data.parental_involvement],
        ordinal_map[data.access_to_resources],
        ordinal_map[data.motivation_level],
        ordinal_map[data.family_income],
        ordinal_map[data.teacher_quality],
        parent_education_level_map[data.parent_education_level],
        distance_from_home_map[data.distance_from_home],

        yes_no_map[data.extracurricular_activities],
        yes_no_map[data.internet_access],
        yes_no_map[data.learning_disabilities],

        school_type_map[data.school_type],
        peer_map[data.peer_influence],
        gender_map[data.gender]
    ]   
    return encoded