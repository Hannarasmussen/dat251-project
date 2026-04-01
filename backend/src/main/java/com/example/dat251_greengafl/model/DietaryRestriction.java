package com.example.dat251_greengafl.model;

/**
 * Allergen-based and medical dietary restrictions.
 * Lifestyle choices belong in {@link DietaryPreference}.
 */
public enum DietaryRestriction {

    // Gluten & wheat
    GLUTEN_FREE,
    WHEAT_FREE,

    // Dairy & eggs
    DAIRY_FREE,
    LACTOSE_FREE,
    EGG_FREE,

    // Nuts
    PEANUT_FREE,
    TREE_NUT_FREE,

    // Seafood
    FISH_FREE,
    SHELLFISH_FREE,

    // Other common allergens
    SOY_FREE,
    SESAME_FREE,
    MUSTARD_FREE,
    CELERY_FREE,
    LUPIN_FREE,
    MOLLUSC_FREE,
    SULPHITE_FREE
}
