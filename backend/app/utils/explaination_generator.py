import numpy as np

def generate_explanation(contributions, feature_names):
    # coerce to 1D numeric array
    contributions = np.array(contributions).flatten()

    if contributions.size != len(feature_names):
        raise ValueError(f"shap contributions length {contributions.size} != feature_names length {len(feature_names)}")

    explanation = []
    for feature, value in zip(feature_names, contributions):
        if value > 0:
            explanation.append(f"{feature} increases prediction by {abs(float(value)):.4f}")
        elif value < 0:
            explanation.append(f"{feature} decreases prediction by {abs(float(value)):.4f}")
        else:
            explanation.append(f"{feature} has no effect")
    return explanation