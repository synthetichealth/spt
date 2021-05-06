const MODULES = {"allergic_rhinitis":{
  "name": "Allergic Rhinitis",
  "remarks": [
    "Better known as 'hay fever' or 'seasonal allergies'.",
    "Statistics are from the American College of Allergy, Asthma, & Immunology (ACAAI):",
    "http://acaai.org/news/facts-statistics/allergies",
    "or the Allergy and Asthma Foundation of America (AAFA):",
    "http://www.aafa.org/page/allergy-facts.aspx"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Delay_For_Atopy"
    },
    "Delay_For_Atopy": {
      "type": "Delay",
      "remarks": [
        "The Atopy module must be processed before any of the allergy modules so ",
        "atopy can appropriately influence allergies. Delaying the smallest possible ",
        "time step to ensure this happens."
      ],
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "transition": "Atopic"
        },
        {
          "transition": "Not_Atopic"
        }
      ]
    },
    "Atopic": {
      "type": "Simple",
      "remarks": [
        "85% of all atopic patients develop allergic rhinitis. See the Atopy model for more info."
      ],
      "distributed_transition": [
        {
          "distribution": 0.85,
          "transition": "Delay_Until_Early_Mid_Childhood"
        },
        {
          "distribution": 0.15,
          "transition": "Terminal"
        }
      ]
    },
    "Not_Atopic": {
      "type": "Simple",
      "remarks": [
        "Estimated 50 million Americans affected by nasal allergies (ACAAI). 50M / 318.9M => 15.7%.",
        "It makes more sense to wait until early-mid childhood (2-6 years old) for these ",
        "symptoms to appear and to be diagnosed by a doctor."
      ],
      "distributed_transition": [
        {
          "distribution": 0.029,
          "transition": "Delay_Until_Early_Mid_Childhood"
        },
        {
          "distribution": 0.971,
          "transition": "Terminal"
        }
      ]
    },
    "Delay_Until_Early_Mid_Childhood": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 6,
        "unit": "years"
      },
      "direct_transition": "Has_Allergic_Rhinitis"
    },
    "Has_Allergic_Rhinitis": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Has_Seasonal_Allergic_Rhinitis",
          "remarks": [
            "Seasonal allergies occur only at a specific time of year. They can be more actue but ",
            "are easily treated. 20% of Americans have just seasonal allergies.",
            "source: http://www.neilmed.com/neilmedblog/2014/08/seasonal-and-perennial-allergic-rhinitis/"
          ]
        },
        {
          "distribution": 0.4,
          "transition": "Has_Perennial_Allergic_Rhinitis",
          "remarks": [
            "Perennial allergies are not influenced by the seasons. They are typically tied to other ",
            "allergens like pet dander, mold, and dust mites."
          ]
        },
        {
          "distribution": 0.4,
          "transition": "Has_Perennial_And_Seasonal_Allergic_Rhinitis",
          "remarks": [
            "Perennial allergies flare up in the spring with additional allergies, like grass and ",
            "tree pollens."
          ]
        }
      ]
    },
    "Has_Seasonal_Allergic_Rhinitis": {
      "type": "ConditionOnset",
      "assign_to_attribute": "allergic_rhinitis",
      "target_encounter": "Allergic_Rhinitis_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "367498001",
          "display": "Seasonal allergic rhinitis"
        }
      ],
      "direct_transition": "Allergic_Rhinitis_Diagnosis"
    },
    "Has_Perennial_Allergic_Rhinitis": {
      "type": "ConditionOnset",
      "assign_to_attribute": "allergic_rhinitis",
      "target_encounter": "Allergic_Rhinitis_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "446096008",
          "display": "Perennial allergic rhinitis"
        }
      ],
      "direct_transition": "Allergic_Rhinitis_Diagnosis"
    },
    "Has_Perennial_And_Seasonal_Allergic_Rhinitis": {
      "type": "ConditionOnset",
      "assign_to_attribute": "allergic_rhinitis",
      "target_encounter": "Allergic_Rhinitis_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "232353008",
          "display": "Perennial allergic rhinitis with seasonal variation"
        }
      ],
      "direct_transition": "Allergic_Rhinitis_Diagnosis"
    },
    "Allergic_Rhinitis_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "allergic_rhinitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "Allergic_Rhinitis_Symptom1"
    },
    "Allergic_Rhinitis_Symptom1": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Allergic_Rhinitis_Symptom2"
    },
    "Allergic_Rhinitis_Symptom2": {
      "type": "Symptom",
      "symptom": "Nasal Discharge",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Allergic_Rhinitis_Symptom3"
    },
    "Allergic_Rhinitis_Symptom3": {
      "type": "Symptom",
      "symptom": "Itching",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Allergic_Rhinitis_Symptom4"
    },
    "Allergic_Rhinitis_Symptom4": {
      "type": "Symptom",
      "symptom": "Sneezing Fits",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Allergic_Rhinitis_Symptom5"
    },
    "Allergic_Rhinitis_Symptom5": {
      "type": "Symptom",
      "symptom": "Ear Pressure",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Symptom_Period"
    },
    "Symptom_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Prescribe_OTC_Antihistamine"
    },
    "Prescribe_OTC_Antihistamine": {
      "type": "CallSubmodule",
      "remarks": [
        "This submodule will only prescribe an antihistamine if one is ",
        "not already prescribed."
      ],
      "submodule": "medications/otc_antihistamine",
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Advise_To_Visit_Allergist": {
      "type": "SetAttribute",
      "attribute": "visit_allergist",
      "value": true,
      "direct_transition": "End_Allergic_Rhinitis_Diagnosis"
    },
    "End_Allergic_Rhinitis_Diagnosis": {
      "type": "EncounterEnd",
      "direct_transition": "Living_With_Allergic_Rhinitis"
    },
    "Living_With_Allergic_Rhinitis": {
      "type": "Guard",
      "allow": {
        "condition_type": "Age",
        "operator": ">",
        "quantity": 18,
        "unit": "years"
      },
      "direct_transition": "Outgrow_Allergic_Rhinitis?"
    },
    "Outgrow_Allergic_Rhinitis?": {
      "type": "Guard",
      "remarks": [
        "It's very uncommon for a person to 'outgrow' allergic rhinitis, ",
        "but symptoms can lessen or disappear as a child ages or if they ",
        "are given immunotherapy (85%)."
      ],
      "allow": {
        "condition_type": "Not",
        "condition": {
          "condition_type": "Or",
          "conditions": [
            {
              "condition_type": "Active Condition",
              "codes": [
                {
                  "system": "SNOMED-CT",
                  "code": "419263009",
                  "display": "Allergy to tree pollen"
                }
              ]
            },
            {
              "condition_type": "Active Condition",
              "codes": [
                {
                  "system": "SNOMED-CT",
                  "code": "418689008",
                  "display": "Allergy to grass pollen"
                }
              ]
            },
            {
              "condition_type": "Active Condition",
              "codes": [
                {
                  "system": "SNOMED-CT",
                  "code": "232347008",
                  "display": "Dander (animal) allergy"
                }
              ]
            },
            {
              "condition_type": "Active Condition",
              "codes": [
                {
                  "system": "SNOMED-CT",
                  "code": "232350006",
                  "display": "House dust mite allergy"
                }
              ]
            },
            {
              "condition_type": "Active Condition",
              "codes": [
                {
                  "system": "SNOMED-CT",
                  "code": "419474003",
                  "display": "Allergy to mould"
                }
              ]
            }
          ]
        }
      },
      "direct_transition": "Allergic_Rhinitis_Subsides"
    },
    "Allergic_Rhinitis_Subsides": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "allergic_rhinitis",
      "direct_transition": "Allergic_Rhinitis_Symptom1_Ends"
    },
    "Allergic_Rhinitis_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Allergic_Rhinitis_Symptom2_Ends"
    },
    "Allergic_Rhinitis_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Nasal Discharge",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Allergic_Rhinitis_Symptom3_Ends"
    },
    "Allergic_Rhinitis_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Itching",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Allergic_Rhinitis_Symptom4_Ends"
    },
    "Allergic_Rhinitis_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Ear Pressure",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/allergy_incidence":{
  "name": "Allergy Incidence",
  "remarks": [
    "This submodule onsets various allergies and is intended to be called ",
    "by the main allergies module."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Chance_of_Peanut_Allergy"
    },
    "Chance_of_Peanut_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " PEANUT ALLERGY                                                       ",
        "======================================================================",
        "Allergy to peanuts and tree nuts in the general population is, respectively, 0.6 percent and 0.4 percent, ",
        "with the rate in children under age 18 (0.8 percent and 0.2 percent) slightly different from adults (0.6 percent and 0.5 percent respectively). "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Peanut_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_TreeNut_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.006,
              "transition": "Peanut_Allergy"
            },
            {
              "distribution": 0.994,
              "transition": "Chance_of_TreeNut_Allergy"
            }
          ]
        }
      ]
    },
    "Peanut_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91935009",
          "display": "Allergy to peanuts"
        }
      ],
      "direct_transition": "Chance_of_TreeNut_Allergy"
    },
    "Chance_of_TreeNut_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " NUT ALLERGY                                                          ",
        "======================================================================",
        "Allergy to peanuts and tree nuts in the general population is, respectively, 0.6 percent and 0.4 percent, ",
        "with the rate in children under age 18 (0.8 percent and 0.2 percent) slightly different from adults (0.6 percent and 0.5 percent respectively). "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "TreeNut_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Fish_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.004,
              "transition": "TreeNut_Allergy"
            },
            {
              "distribution": 0.996,
              "transition": "Chance_of_Fish_Allergy"
            }
          ]
        }
      ]
    },
    "TreeNut_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91934008",
          "display": "Allergy to nut"
        }
      ],
      "direct_transition": "Chance_of_Fish_Allergy"
    },
    "Chance_of_Fish_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " FISH ALLERGY                                                         ",
        "======================================================================",
        "The prevalence of seafood allergy in the general population is 0.4 percent to fish, 2.0 percent to shellfish and 0.2 percent to both.",
        "Seafood allergy is less common in children (0.6 percent) than adults (2.8 percent). "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Fish_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Shellfish_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.004,
              "transition": "Fish_Allergy"
            },
            {
              "distribution": 0.996,
              "transition": "Chance_of_Shellfish_Allergy"
            }
          ]
        }
      ]
    },
    "Fish_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "417532002",
          "display": "Allergy to fish"
        }
      ],
      "direct_transition": "Chance_of_Shellfish_Allergy"
    },
    "Chance_of_Shellfish_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SHELLFISH ALLERGY                                                    ",
        "======================================================================",
        "The prevalence of seafood allergy in the general population is 0.4 percent to fish, 2.0 percent to shellfish and 0.2 percent to both.",
        "Seafood allergy is less common in children (0.6 percent) than adults (2.8 percent). "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Shellfish_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Wheat_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.02,
              "transition": "Shellfish_Allergy"
            },
            {
              "distribution": 0.98,
              "transition": "Chance_of_Wheat_Allergy"
            }
          ]
        }
      ]
    },
    "Shellfish_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "300913006",
          "display": "Shellfish allergy"
        }
      ],
      "direct_transition": "Chance_of_Wheat_Allergy"
    },
    "Chance_of_Wheat_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " WHEAT ALLERGY                                                        ",
        "======================================================================",
        "Wheat allergy is different than celiac disease. There are few studies on prevalence of wheat allergy.",
        "A recent study 0.4% of US adults reported an allergy to wheat diagnosed via a doctor [6]. The prevalence ",
        "of wheat allergy is highest amongst children in the US, ranging from 0.4% to 1.0% of the population.",
        "http://www.drschaer-institute.com/us/wheat-allergy/epidemiology-1043.html",
        "Wheat allergy is typically outgrown by adulthood — about 65 percent of children with a wheat allergy ",
        "will outgrow it by the time they are 12. Based on prevalences we assume that adult onset of ",
        "the allergy is rare enough to ignore."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Wheat_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Eggs_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.006,
              "transition": "Wheat_Allergy"
            },
            {
              "distribution": 0.994,
              "transition": "Chance_of_Eggs_Allergy"
            }
          ]
        }
      ]
    },
    "Wheat_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "420174000",
          "display": "Allergy to wheat"
        }
      ],
      "direct_transition": "Chance_of_Eggs_Allergy"
    },
    "Chance_of_Eggs_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " EGG ALLERGY                                                          ",
        "======================================================================",
        "Experts estimate that as many as 2 percent of children are allergic to eggs. ",
        "Fortunately, studies show that about 70 percent of children with an egg allergy ",
        "will outgrow the condition by age 16.",
        "http://acaai.org/allergies/types/food-allergies/types-food-allergy/egg-allergy",
        "Based on prevalences we assume that adult onset of the allergy is rare enough to ignore."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Eggs_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Soy_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.006,
              "transition": "Eggs_Allergy"
            },
            {
              "distribution": 0.994,
              "transition": "Chance_of_Soy_Allergy"
            }
          ]
        }
      ]
    },
    "Eggs_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91930004",
          "display": "Allergy to eggs"
        }
      ],
      "direct_transition": "Chance_of_Soy_Allergy"
    },
    "Chance_of_Soy_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SOY ALLERGY                                                          ",
        "======================================================================",
        "Soy allergies are uncommon but closely related to peanut and milk allergies. ",
        "http://www.soyconnection.com/newsletters/soy-connection/health-nutrition/articles/Estimating-Prevalence-Of-Soy-Protein-Allergy"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "Soy_Allergy"
            },
            {
              "distribution": 0.9,
              "transition": "Chance_of_Dairy_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.002,
              "transition": "Soy_Allergy"
            },
            {
              "distribution": 0.998,
              "transition": "Chance_of_Dairy_Allergy"
            }
          ]
        }
      ]
    },
    "Soy_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "714035009",
          "display": "Allergy to soya"
        }
      ],
      "direct_transition": "Chance_of_Dairy_Allergy"
    },
    "Chance_of_Dairy_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " DAIRY ALLERGY                                                        ",
        "======================================================================",
        "The prevalence of dairy/milk allergy in the general population is 1-2% for young ",
        "children and 0.2-0.4% in the general population. About 80 percent of children are ",
        "likely to outgrow their milk allergy before they are 16. Based on prevalences we ",
        "assume that adult onset of the allergy is rare enough to ignore."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Dairy_Allergy"
            },
            {
              "distribution": 0.75,
              "transition": "Chance_of_Tree_Pollen_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.0015,
              "transition": "Dairy_Allergy"
            },
            {
              "distribution": 0.9985,
              "transition": "Chance_of_Tree_Pollen_Allergy"
            }
          ]
        }
      ]
    },
    "Dairy_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "assign_to_attribute": "food_allergy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "425525006",
          "display": "Allergy to dairy product"
        }
      ],
      "direct_transition": "Chance_of_Tree_Pollen_Allergy"
    },
    "Chance_of_Tree_Pollen_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " TREE POLLEN ALLERGY                                                  ",
        "======================================================================",
        "At present, up to 20% of children are diagnosed with a tree pollen allergy. ",
        "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4098757/",
        "In this model most of those children are also atopic, aligning with the ",
        "prevalence of allergic rhinitis."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.85,
              "transition": "Tree_Pollen_Allergy"
            },
            {
              "distribution": 0.15,
              "transition": "Chance_of_Grass_Pollen_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.03,
              "transition": "Tree_Pollen_Allergy"
            },
            {
              "distribution": 0.97,
              "transition": "Chance_of_Grass_Pollen_Allergy"
            }
          ]
        }
      ]
    },
    "Tree_Pollen_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "419263009",
          "display": "Allergy to tree pollen"
        }
      ],
      "direct_transition": "Chance_of_Grass_Pollen_Allergy"
    },
    "Chance_of_Grass_Pollen_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " GRASS POLLEN ALLERGY                                                 ",
        "======================================================================",
        "At present, up to 20% of children are diagnosed with a grass pollen allergy. ",
        "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4098757/",
        "In this model most of those children are also atopic, aligning with the ",
        "prevalence of allergic rhinitis."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.85,
              "transition": "Grass_Pollen_Allergy"
            },
            {
              "distribution": 0.15,
              "transition": "Chance_of_Pet_Dander_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.03,
              "transition": "Grass_Pollen_Allergy"
            },
            {
              "distribution": 0.97,
              "transition": "Chance_of_Pet_Dander_Allergy"
            }
          ]
        }
      ]
    },
    "Grass_Pollen_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "418689008",
          "display": "Allergy to grass pollen"
        }
      ],
      "direct_transition": "Chance_of_Pet_Dander_Allergy"
    },
    "Chance_of_Pet_Dander_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " PET DANDER ALLERGY                                                   ",
        "======================================================================",
        "At present, up to 30% of people are diagnosed with a pet dander allergy. ",
        "Source: http://allergicliving.com/2010/07/02/pet-allergies-a-gander-at-dander/",
        "In this model most of these people are also atopic, aligning with the ",
        "prevalence of allergic rhinitis and asthma."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Pet_Dander_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "Pet_Dander_Allergy"
            },
            {
              "distribution": 0.9,
              "transition": "Chance_of_Dust_Mite_Allergy"
            }
          ]
        }
      ]
    },
    "Pet_Dander_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "232347008",
          "display": "Dander (animal) allergy"
        }
      ],
      "direct_transition": "Chance_of_Dust_Mite_Allergy"
    },
    "Chance_of_Dust_Mite_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " DUST MITE ALLERGY                                                    ",
        "======================================================================",
        "About 85% of all atopic patients have mite allergies. ",
        "Source: https://www.ncbi.nlm.nih.gov/pubmed/12190652"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.85,
              "transition": "Dust_Mite_Allergy"
            },
            {
              "distribution": 0.15,
              "transition": "Chance_of_Mold_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.02,
              "transition": "Dust_Mite_Allergy"
            },
            {
              "distribution": 0.98,
              "transition": "Chance_of_Mold_Allergy"
            }
          ]
        }
      ]
    },
    "Dust_Mite_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "232350006",
          "display": "House dust mite allergy"
        }
      ],
      "direct_transition": "Chance_of_Mold_Allergy"
    },
    "Chance_of_Mold_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MOLD ALLERGY                                                         ",
        "======================================================================",
        "Sensitization to mold is very common, but symptoms are usually mild.",
        "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1240910/"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Mold_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.15,
              "transition": "Mold_Allergy"
            },
            {
              "distribution": 0.85,
              "transition": "Chance_of_Bee_Allergy"
            }
          ]
        }
      ]
    },
    "Mold_Allergy": {
      "type": "AllergyOnset",
      "remarks": [
        "Note the British spelling of 'mold'."
      ],
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "419474003",
          "display": "Allergy to mould"
        }
      ],
      "direct_transition": "Chance_of_Bee_Allergy"
    },
    "Chance_of_Bee_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " BEE STING ALLERGY                                                    ",
        "======================================================================",
        "Estimates range from 1-7%. Source: ",
        "http://www.worldallergy.org/professional/allergic_diseases_center/insect_allergy/"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.33,
              "transition": "Bee_Allergy"
            },
            {
              "distribution": 0.67,
              "transition": "Chance_of_Latex_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.01,
              "transition": "Bee_Allergy"
            },
            {
              "distribution": 0.99,
              "transition": "Chance_of_Latex_Allergy"
            }
          ]
        }
      ]
    },
    "Bee_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424213003",
          "display": "Allergy to bee venom"
        }
      ],
      "direct_transition": "Chance_of_Latex_Allergy"
    },
    "Chance_of_Latex_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " LATEX ALLERGY                                                        ",
        "======================================================================",
        "Estimates range from 4-9%. Prevalence is especially high in healthcare ",
        "workers and those who had frequent surgeries during childhood.",
        "https://www.ncbi.nlm.nih.gov/pubmed/27010091"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.33,
              "transition": "Latex_Allergy"
            },
            {
              "distribution": 0.67,
              "transition": "Allergy_Incidence_Terminal"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.02,
              "transition": "Latex_Allergy"
            },
            {
              "distribution": 0.98,
              "transition": "Allergy_Incidence_Terminal"
            }
          ]
        }
      ]
    },
    "Latex_Allergy": {
      "type": "AllergyOnset",
      "target_encounter": "Allergist_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "300916003",
          "display": "Latex allergy"
        }
      ],
      "direct_transition": "Allergy_Incidence_Terminal"
    },
    "Allergy_Incidence_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/allergy_panel":{
  "name": "Allergy Panel",
  "remarks": [
    "This submodule explicity references states in the 'Allergies and Treatment' module. ",
    "In the future an Active Condition test should be favored instead of PriorState once ",
    "there's a distinction between an 'Active' and 'Diagnosed' condition.",
    "Most of these tests measure the amount of IgE Ab antibody in serum. ",
    "http://www.mayomedicallaboratories.com/interpretive-guide/?alpha=S&unit_code=82716",
    "IgE Ab < 0.35 kU/L == Negative Result ",
    "IgE Ab > 0.70 kU/L == Positive ",
    "IgE Ab > 17.5 kU/L == Strongly Positive ",
    "The following allergens are tested here, and expected to be onset in allergies.json: ",
    "Peanut, Treenut, Fish, Shellfish, Wheat, Egg, Dairy, Tree Pollen, Grass Pollen, ",
    "Pet Dander, Dust Mite, Mold, Bee, Latex"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Peanut_Test"
    },
    "Peanut_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " PEANUT ALLERGY TEST                                                  ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "91935009",
                "display": "Allergy to peanuts"
              }
            ]
          },
          "transition": "Peanut_Test_Positive"
        },
        {
          "transition": "Peanut_Test_Negative"
        }
      ]
    },
    "Peanut_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6206-7",
          "display": "Peanut IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Nut_Test"
    },
    "Peanut_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6206-7",
          "display": "Peanut IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Nut_Test"
    },
    "Nut_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " NUT ALLERGY TEST                                                     ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "91934008",
                "display": "Allergy to nut"
              }
            ]
          },
          "transition": "Nut_Test_Positive"
        },
        {
          "transition": "Nut_Test_Negative"
        }
      ]
    },
    "Nut_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6273-7",
          "display": "Walnut IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Fish_Test"
    },
    "Nut_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6273-7",
          "display": "Walnut IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Fish_Test"
    },
    "Fish_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " FISH ALLERGY TEST                                                    ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "417532002",
                "display": "Allergy to fish"
              }
            ]
          },
          "transition": "Fish_Test_Positive"
        },
        {
          "transition": "Fish_Test_Negative"
        }
      ]
    },
    "Fish_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6082-2",
          "display": "Codfish IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Shellfish_Test"
    },
    "Fish_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6082-2",
          "display": "Codfish IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Shellfish_Test"
    },
    "Shellfish_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SHELLFISH ALLERGY TEST                                               ",
        "======================================================================",
        "There were LOINC codes available for shrimp, scallops, and clam. ",
        "I chose to include only the shrimp test at this time."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "300913006",
                "display": "Shellfish allergy"
              }
            ]
          },
          "transition": "Shellfish_Test_Positive"
        },
        {
          "transition": "Shellfish_Test_Negative"
        }
      ]
    },
    "Shellfish_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6246-3",
          "display": "Shrimp IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Wheat_Test"
    },
    "Shellfish_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6246-3",
          "display": "Shrimp IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Wheat_Test"
    },
    "Wheat_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " WHEAT ALLERGY TEST                                                   ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "420174000",
                "display": "Allergy to wheat"
              }
            ]
          },
          "transition": "Wheat_Test_Positive"
        },
        {
          "transition": "Wheat_Test_Negative"
        }
      ]
    },
    "Wheat_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6276-0",
          "display": "Wheat IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Egg_Test"
    },
    "Wheat_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6276-0",
          "display": "Wheat IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Egg_Test"
    },
    "Egg_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " EGG ALLERGY TEST                                                     ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "91930004",
                "display": "Allergy to eggs"
              }
            ]
          },
          "transition": "Egg_Test_Positive"
        },
        {
          "transition": "Egg_Test_Negative"
        }
      ]
    },
    "Egg_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6106-9",
          "display": "Egg white IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Soy_Test"
    },
    "Egg_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6106-9",
          "display": "Egg white IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Soy_Test"
    },
    "Soy_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SOY ALLERGY TEST                                                     ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "714035009",
                "display": "Allergy to soya"
              }
            ]
          },
          "transition": "Soy_Test_Positive"
        },
        {
          "transition": "Soy_Test_Negative"
        }
      ]
    },
    "Soy_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6248-9",
          "display": "Soybean IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Milk_Test"
    },
    "Soy_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6248-9",
          "display": "Soybean IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Milk_Test"
    },
    "Milk_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " DAIRY ALLERGY TEST                                                   ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "425525006",
                "display": "Allergy to dairy product"
              }
            ]
          },
          "transition": "Milk_Test_Positive"
        },
        {
          "transition": "Milk_Test_Negative"
        }
      ]
    },
    "Milk_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "7258-7",
          "display": "Cow milk IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Tree_Test"
    },
    "Milk_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "7258-7",
          "display": "Cow milk IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Tree_Test"
    },
    "Tree_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " TREE ALLERGY TEST                                                    ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "419263009",
                "display": "Allergy to tree pollen"
              }
            ]
          },
          "transition": "Tree_Test_Positive"
        },
        {
          "transition": "Tree_Test_Negative"
        }
      ]
    },
    "Tree_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6189-5",
          "display": "White oak IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Grass_Test"
    },
    "Tree_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6189-5",
          "display": "White oak IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Grass_Test"
    },
    "Grass_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " GRASS ALLERGY TEST                                                   ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "418689008",
                "display": "Allergy to grass pollen"
              }
            ]
          },
          "transition": "Grass_Test_Positive"
        },
        {
          "transition": "Grass_Test_Negative"
        }
      ]
    },
    "Grass_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6085-5",
          "display": "Common Ragweed IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Dander_Test"
    },
    "Grass_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6085-5",
          "display": "Common Ragweed IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Dander_Test"
    },
    "Dander_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " PET DANDER ALLERGY TEST                                              ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "232347008",
                "display": "Dander (animal) allergy"
              }
            ]
          },
          "transition": "Dander_Test_Positive"
        },
        {
          "transition": "Dander_Test_Negative"
        }
      ]
    },
    "Dander_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6833-8",
          "display": "Cat dander IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Mite_Test"
    },
    "Dander_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6833-8",
          "display": "Cat dander IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Mite_Test"
    },
    "Mite_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MITE ALLERGY TEST                                                    ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "232350006",
                "display": "House dust mite allergy"
              }
            ]
          },
          "transition": "Mite_Test_Positive"
        },
        {
          "transition": "Mite_Test_Negative"
        }
      ]
    },
    "Mite_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6095-4",
          "display": "American house dust mite IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Mold_Test"
    },
    "Mite_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6095-4",
          "display": "American house dust mite IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Mold_Test"
    },
    "Mold_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MOLD ALLERGY TEST                                                    ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "419474003",
                "display": "Allergy to mould"
              }
            ]
          },
          "transition": "Mold_Test_Positive"
        },
        {
          "transition": "Mold_Test_Negative"
        }
      ]
    },
    "Mold_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6075-6",
          "display": "Cladosporium herbarum IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Bee_Test"
    },
    "Mold_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6075-6",
          "display": "Cladosporium herbarum IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Bee_Test"
    },
    "Bee_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " BEE ALLERGY TEST                                                     ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "424213003",
                "display": "Allergy to bee venom"
              }
            ]
          },
          "transition": "Bee_Test_Positive"
        },
        {
          "transition": "Bee_Test_Negative"
        }
      ]
    },
    "Bee_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6844-5",
          "display": "Honey bee IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Latex_Test"
    },
    "Bee_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6844-5",
          "display": "Honey bee IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Latex_Test"
    },
    "Latex_Test": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " LATEX ALLERGY TEST                                                   ",
        "======================================================================"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "300916003",
                "display": "Latex allergy"
              }
            ]
          },
          "transition": "Latex_Test_Positive"
        },
        {
          "transition": "Latex_Test_Negative"
        }
      ]
    },
    "Latex_Test_Positive": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6158-0",
          "display": "Latex IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0.7,
        "high": 100
      },
      "direct_transition": "Allergy_Test_Terminal"
    },
    "Latex_Test_Negative": {
      "type": "Observation",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "6158-0",
          "display": "Latex IgE Ab in Serum"
        }
      ],
      "unit": "kU/L",
      "range": {
        "low": 0,
        "high": 0.35
      },
      "direct_transition": "Allergy_Test_Terminal"
    },
    "Allergy_Test_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/immunotherapy":{
  "name": "Allergy Immunotherapy",
  "remarks": [
    "This submodule is called by 'allergies.json'. This models a series of ",
    "immunotherapy treatments designed to lessen the severity of allergy ",
    "symptoms, or even eliminate the sensitivity altogether. ",
    "Immunotherapy is most effective against outdoor allergens (trees, grass), ",
    "and common indoor allergens (mold, mites, pet dander). Immunotherapy is ",
    "minimally effective against food allergens."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Immunotherapy_Consultation"
    },
    "Immunotherapy_Consultation": {
      "type": "Encounter",
      "remarks": [
        "======================================================================",
        " IMMUNOTHERAPY                                                        ",
        "======================================================================",
        "Allergen immunotherapy for hay fever has been common practice since the ",
        "1930's. It was first proven by scientists in the UK in 1911. It has since ",
        "been expanded to include additional environmental and food allergens."
      ],
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "170837001",
          "display": "Allergic disorder initial assessment"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "Immunotherapy_Given"
        },
        {
          "distribution": 0.25,
          "transition": "Immunotherapy_Not_Given",
          "remarks": [
            "The distribution here is somewhat arbitrary. I could not find reasonable stats for",
            "what percentage of people are given immunotherapy but it's not everyone.",
            "I went with a 75/25 split. Reasons to not give immunotherapy include fear of needles,",
            "pre-existing immune conditions (like AIDS), and prohibitive cost."
          ]
        }
      ]
    },
    "Immunotherapy_Given": {
      "type": "SetAttribute",
      "attribute": "immunotherapy_status",
      "value": "given",
      "direct_transition": "Immunotherapy_CarePlan"
    },
    "Immunotherapy_Not_Given": {
      "type": "SetAttribute",
      "attribute": "immunotherapy_status",
      "value": "not-given",
      "direct_transition": "End_Consultation"
    },
    "Immunotherapy_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Immunotherapy_Consultation",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "170836005",
          "display": "Allergic disorder monitoring"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "764101000000108",
          "display": "Allergen immunotherapy drugs Band 1"
        }
      ],
      "direct_transition": "Benchmark_Allergy_Test"
    },
    "Benchmark_Allergy_Test": {
      "type": "Procedure",
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "395142003",
          "display": "Allergy screening test"
        }
      ],
      "direct_transition": "Benchmark_Allergy_Panel"
    },
    "Benchmark_Allergy_Panel": {
      "type": "CallSubmodule",
      "submodule": "allergies/allergy_panel",
      "direct_transition": "End_Consultation"
    },
    "End_Consultation": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "immunotherapy_status",
            "operator": "==",
            "value": "not-given"
          },
          "transition": "Terminal"
        },
        {
          "transition": "Initialize_Immunotherapy_Counter"
        }
      ]
    },
    "Initialize_Immunotherapy_Counter": {
      "type": "SetAttribute",
      "attribute": "immunotherapy_counter",
      "value": 0,
      "direct_transition": "Undergoing_Immunotherapy_Treatment"
    },
    "Undergoing_Immunotherapy_Treatment": {
      "type": "Delay",
      "remarks": [
        "Patients get immunotherapy treatments for an average of 5 years.",
        "Given monthly appointments we count a total of 60 appointments before ",
        "ending the immunotherapy."
      ],
      "range": {
        "low": 3,
        "high": 4,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "immunotherapy_counter",
            "operator": "<",
            "value": 60
          },
          "transition": "Immunotherapy_Treatment"
        },
        {
          "transition": "Immunotherapy_Treatment_Complete"
        }
      ]
    },
    "Immunotherapy_Treatment": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "371883000",
          "display": "Outpatient procedure"
        }
      ],
      "direct_transition": "Immunotherapy_Procedure"
    },
    "Immunotherapy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Immunotherapy_Treatment",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "180256009",
          "display": "Subcutaneous immunotherapy"
        }
      ],
      "duration": {
        "low": 15,
        "high": 60,
        "unit": "minutes"
      },
      "direct_transition": "End_Treatment_Session"
    },
    "End_Treatment_Session": {
      "type": "EncounterEnd",
      "direct_transition": "Count_A_Treatment"
    },
    "Count_A_Treatment": {
      "type": "Counter",
      "action": "increment",
      "attribute": "immunotherapy_counter",
      "direct_transition": "Undergoing_Immunotherapy_Treatment"
    },
    "Immunotherapy_Treatment_Complete": {
      "type": "Simple",
      "direct_transition": "Immunotherapy_Followup"
    },
    "Immunotherapy_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "170838006",
          "display": "Allergic disorder follow-up assessment"
        }
      ],
      "direct_transition": "Immunotherapy_CarePlan_Ends"
    },
    "Immunotherapy_CarePlan_Ends": {
      "type": "CarePlanEnd",
      "careplan": "Immunotherapy_CarePlan",
      "direct_transition": "Immunotherapy_Success_Rate"
    },
    "Immunotherapy_Success_Rate": {
      "type": "Simple",
      "remarks": [
        "My research has shown up to 85% of people respond positively to ",
        "immunotherapy treatment. This allows patients to 'outgrow' their ",
        "environmental allergies."
      ],
      "distributed_transition": [
        {
          "distribution": 0.8,
          "transition": "Outgrown_Environmental_Allergies"
        },
        {
          "distribution": 0.2,
          "transition": "Followup_Test"
        }
      ]
    },
    "Outgrown_Environmental_Allergies": {
      "type": "CallSubmodule",
      "submodule": "allergies/outgrow_env_allergies",
      "direct_transition": "Followup_Test"
    },
    "Followup_Test": {
      "type": "Procedure",
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "395142003",
          "display": "Allergy screening test"
        }
      ],
      "direct_transition": "Followup_Allergy_Panel"
    },
    "Followup_Allergy_Panel": {
      "type": "CallSubmodule",
      "submodule": "allergies/allergy_panel",
      "direct_transition": "Followup_End"
    },
    "Followup_End": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/outgrow_env_allergies":{
  "name": "Outgrow Environmental Allergies",
  "remarks": [
    "When children reach adolescence or early adulthood, especially if they've ",
    "undergone immunotherapy, the potential to outgrow environmental allergies ",
    "is pretty high. Using the same general 'outgrow' percentage of 75%."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Tree_Allergy"
    },
    "Tree_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW TREE ALLERGY                                                 ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "419263009",
                "display": "Allergy to tree pollen"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Tree_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Grass_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Grass_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Tree_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "419263009",
          "display": "Allergy to tree pollen"
        }
      ],
      "direct_transition": "Grass_Allergy"
    },
    "Grass_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW GRASS ALLERGY                                                ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "418689008",
                "display": "Allergy to grass pollen"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Grass_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Mold_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Mold_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Grass_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "418689008",
          "display": "Allergy to grass pollen"
        }
      ],
      "direct_transition": "Mold_Allergy"
    },
    "Mold_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW MOLD ALLERGY                                                 ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "419474003",
                "display": "Allergy to mould"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Mold_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Pet_Dander_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Pet_Dander_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Mold_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "419474003",
          "display": "Allergy to mould"
        }
      ],
      "direct_transition": "Pet_Dander_Allergy"
    },
    "Pet_Dander_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW PET DANDER ALLERGY                                           ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "232347008",
                "display": "Dander (animal) allergy"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Pet_Dander_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Mite_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Mite_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Pet_Dander_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "232347008",
          "display": "Dander (animal) allergy"
        }
      ],
      "direct_transition": "Mite_Allergy"
    },
    "Mite_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW DUST MITE ALLERGY                                            ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "232350006",
                "display": "House dust mite allergy"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Mite_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Terminal"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Outgrow_Mite_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "232350006",
          "display": "House dust mite allergy"
        }
      ],
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/outgrow_food_allergies":{
  "name": "Outgrow Food Allergies",
  "remarks": [
    "75% of children with food allergies outgrow their sensitivity to ",
    "milk, soy, eggs, and wheat. However, allergies to peanuts, tree ",
    "nuts, fish, and shellfish are rarely outgrown."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Wheat_Allergy"
    },
    "Wheat_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW WHEAT ALLERGY                                                ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "420174000",
                "display": "Allergy to wheat"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Wheat_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Dairy_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Dairy_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Wheat_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "420174000",
          "display": "Allergy to wheat"
        }
      ],
      "direct_transition": "Dairy_Allergy"
    },
    "Dairy_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW DAIRY ALLERGY                                                ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "425525006",
                "display": "Allergy to dairy product"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Dairy_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Eggs_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Eggs_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Dairy_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "425525006",
          "display": "Allergy to dairy product"
        }
      ],
      "direct_transition": "Eggs_Allergy"
    },
    "Eggs_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW EGGS ALLERGY                                                 ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "91930004",
                "display": "Allergy to eggs"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Eggs_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Soy_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Soy_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Eggs_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91930004",
          "display": "Allergy to eggs"
        }
      ],
      "direct_transition": "Soy_Allergy"
    },
    "Soy_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW SOY ALLERGY                                                  ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "714035009",
                "display": "Allergy to soya"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Soy_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Latex_Allergy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Latex_Allergy"
            }
          ]
        }
      ]
    },
    "Outgrow_Soy_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "714035009",
          "display": "Allergy to soya"
        }
      ],
      "direct_transition": "Latex_Allergy"
    },
    "Latex_Allergy": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OUTGROW LATEX ALLERGY                                                ",
        "======================================================================"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "300916003",
                "display": "Latex allergy"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Outgrow_Latex_Allergy"
            },
            {
              "distribution": 0.25,
              "transition": "Check_For_Other_Food_Allergies"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Check_For_Other_Food_Allergies"
            }
          ]
        }
      ]
    },
    "Outgrow_Latex_Allergy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "300916003",
          "display": "Latex allergy"
        }
      ],
      "direct_transition": "Check_For_Other_Food_Allergies"
    },
    "Check_For_Other_Food_Allergies": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "91935009",
                    "display": "Allergy to peanuts"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "91934008",
                    "display": "Allergy to nut"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "417532002",
                    "display": "Allergy to fish"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "300913006",
                    "display": "Shellfish allergy"
                  }
                ]
              }
            ]
          },
          "transition": "Still_Has_Some_Food_Allergies"
        },
        {
          "transition": "No_Food_Allergies_Here"
        }
      ]
    },
    "Still_Has_Some_Food_Allergies": {
      "type": "SetAttribute",
      "attribute": "outgrew_food_allergies",
      "value": "false",
      "direct_transition": "Terminal"
    },
    "No_Food_Allergies_Here": {
      "type": "SetAttribute",
      "attribute": "outgrew_food_allergies",
      "value": "true",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies/severe_allergic_reaction":{
  "name": "Severe Allergic Reaction",
  "remarks": [
    "A severe allergic reaction is characterized by: ",
    "1. A visit to the ED ",
    "2. Recording of 'Acute allergic reaction' ",
    "3. A dose of adrenaline (epinephrine) to stop the reaction ",
    "4. An observation period of 2-6 hours ",
    "5. A short prescription for oral steroids, usually prednisone "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "ED_Visit_For_Allergic_Reaction"
    },
    "ED_Visit_For_Allergic_Reaction": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Acute_Allergic_Reaction"
    },
    "Acute_Allergic_Reaction": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Allergic_Reaction",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "241929008",
          "display": "Acute allergic reaction"
        }
      ],
      "direct_transition": "Administer_Epinephrine"
    },
    "Administer_Epinephrine": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "313191000",
          "display": "Injection of adrenaline"
        }
      ],
      "direct_transition": "Observation_Period"
    },
    "Observation_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 6,
        "unit": "hours"
      },
      "direct_transition": "Mild_Steroid"
    },
    "Mild_Steroid": {
      "type": "MedicationOrder",
      "remarks": [
        "Typically a mild steroid is given to reduce the chance of the ",
        "reaction returning after the adrenaline wears off. Usually this is ",
        "just one dose, administered at the hospital."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "312617",
          "display": "predniSONE 5 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 1,
          "unit": "days"
        }
      },
      "direct_transition": "End_Mild_Steroid"
    },
    "End_Mild_Steroid": {
      "type": "MedicationEnd",
      "medication_order": "Mild_Steroid",
      "direct_transition": "End_Acute_Reaction"
    },
    "End_Acute_Reaction": {
      "type": "ConditionEnd",
      "condition_onset": "Acute_Allergic_Reaction",
      "direct_transition": "Discharge"
    },
    "Discharge": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"allergies":{
  "name": "Allergies and Treatment",
  "remarks": [
    "This module onsets allergies and manages the treatment of allergies and ",
    "allergic diseases. After the initial series of AllergyOnset states, the ",
    "module waits for an allergic condition (as a result of a person's allergies)",
    "to prompt treatment.",
    "Primary reference for allergy statistics: ",
    "https://web.archive.org/web/20100407195412/http://www.niaid.nih.gov/topics/foodAllergy/understanding/Pages/quickFacts.aspx"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Delay_For_Atopy"
    },
    "Delay_For_Atopy": {
      "type": "Delay",
      "remarks": [
        "The Atopy module must be processed before any of the allergy modules so ",
        "atopy can appropriately influence allergies. Delaying the smallest possible ",
        "time step to ensure this happens."
      ],
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "direct_transition": "Allergy_Incidence_Submodule"
    },
    "Allergy_Incidence_Submodule": {
      "type": "CallSubmodule",
      "remarks": [
        "This submodule onsets the various food and environmental allergies that ",
        "a person can get, with different incidences for atopic and non-atopic ",
        "patients."
      ],
      "submodule": "allergies/allergy_incidence",
      "direct_transition": "Allergist_Guard"
    },
    "Allergist_Guard": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " ALLERGY TREATMENT/CARE                                               ",
        "======================================================================",
        "Now that the patient is suspected to have an allergy, we refer them to ",
        "an allergist for specialized treatment.",
        "The following can prompt a visit to the allergist: ",
        "- Asthma attack ",
        "- Moderate to severe eczema ",
        "- Any allergic reaction to food ",
        "- Moderate to severe allergic rhinitis symptoms ",
        "The asthma, eczema, and allergic rhinitis submodules set the 'visit_allergist' ",
        "attribute to trigger the visit. At the first visit to an allergist an ",
        "allergy panel is always performed."
      ],
      "allow": {
        "condition_type": "Attribute",
        "attribute": "visit_allergist",
        "operator": "is not nil"
      },
      "direct_transition": "Delay_For_Allergist_Initial_Visit"
    },
    "Delay_For_Allergist_Initial_Visit": {
      "type": "Delay",
      "remarks": [
        "Other modules are not expected to make this delay after making a ",
        "'visit_allergist' recommendation."
      ],
      "range": {
        "low": 1,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Allergist_Initial_Visit"
    },
    "Allergist_Initial_Visit": {
      "type": "Encounter",
      "remarks": [
        "This is the big one! Whatever allergies a patient has will be formally ",
        "diagnosed at this encounter."
      ],
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 1974
          },
          "transition": "Administer_Allergy_Test"
        },
        {
          "transition": "General_Allergy_CarePlan"
        }
      ]
    },
    "Administer_Allergy_Test": {
      "type": "Procedure",
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "395142003",
          "display": "Allergy screening test"
        }
      ],
      "direct_transition": "Allergy_Panel"
    },
    "Allergy_Panel": {
      "type": "CallSubmodule",
      "submodule": "allergies/allergy_panel",
      "direct_transition": "Prescribe_OTC_Antihistamine"
    },
    "Prescribe_OTC_Antihistamine": {
      "type": "CallSubmodule",
      "remarks": [
        "This submodule will only prescribe an antihistamine if one is ",
        "not already prescribed."
      ],
      "submodule": "medications/otc_antihistamine",
      "direct_transition": "General_Allergy_CarePlan"
    },
    "General_Allergy_CarePlan": {
      "type": "CarePlanStart",
      "remarks": [
        "Allergy maintenance is all about self care."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "326051000000105",
          "display": "Self care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "58332002",
          "display": "Allergy education"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">=",
            "year": 1987
          },
          "transition": "Prescribe_Epipen"
        },
        {
          "transition": "End_Allergist_Initial_Visit"
        }
      ]
    },
    "Prescribe_Epipen": {
      "type": "MedicationOrder",
      "remarks": [
        "FDA approved in 1987. It's highly likely that this prescription ",
        "will never end - it will just be periodically renewed during the ",
        "patient's lifetime."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "727316",
          "display": "0.3 ML EPINEPHrine 0.5 MG/ML Auto-Injector"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "End_Allergist_Initial_Visit"
    },
    "End_Allergist_Initial_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Living_With_Allergies"
    },
    "Living_With_Allergies": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " LIVING WITH ALLERGIES                                                ",
        "======================================================================",
        "Whatever allergies the patients have, they will continue to passively ",
        "live with them until an allergic condition or a severe reaction ",
        "prompts a visit to their PCP and a referral to an allergist. Allergies ",
        "aren't officially diagnosed until after an allergy test is performed.",
        "For patient's 12 or older we can consider immunotherapy. This will ",
        "not work for everyone but it's worth discussing. Immunotherapy is not ",
        "an option before 1990."
      ],
      "allow": {
        "condition_type": "And",
        "conditions": [
          {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 12,
            "unit": "years"
          },
          {
            "condition_type": "Date",
            "operator": ">=",
            "year": 1990
          },
          {
            "condition_type": "Attribute",
            "attribute": "immunotherapy_status",
            "operator": "is nil"
          }
        ]
      },
      "direct_transition": "Immunotherapy_Submodule"
    },
    "Immunotherapy_Submodule": {
      "type": "CallSubmodule",
      "remarks": [
        "This submodule may or may not give the patient immunotherapy. If ",
        "immunotherapy is given a series of 60 treatments will be provided ",
        "over the course of 3-5 years."
      ],
      "submodule": "allergies/immunotherapy",
      "direct_transition": "Living_With_Allergies"
    }
  }
}
,
"appendicitis":{
  "name": "Appendicitis",
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Male"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Female"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Male": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.086,
          "transition": "Pre_appendicitis"
        },
        {
          "distribution": 0.914,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Men have an approx lifetime risk of appendicitis of 8.6%. Ref: http://www.ncbi.nlm.nih.gov/pubmed/2239906"
      ]
    },
    "Female": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.067,
          "transition": "Pre_appendicitis"
        },
        {
          "distribution": 0.933,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Women have an approx lifetime risk of appendicitis of 6.7%. Ref: http://www.ncbi.nlm.nih.gov/pubmed/2239906"
      ]
    },
    "Pre_appendicitis": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.263,
          "transition": "Ages_1_17"
        },
        {
          "distribution": 0.423,
          "transition": "Ages_18_44"
        },
        {
          "distribution": 0.221,
          "transition": "Ages_45_64"
        },
        {
          "distribution": 0.093,
          "transition": "Ages_65_Plus"
        }
      ],
      "remarks": [
        "Age distribution of appendicitis from https://www.ncbi.nlm.nih.gov/books/NBK169006/ , Table 1"
      ]
    },
    "Ages_1_17": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 17,
        "unit": "years"
      },
      "direct_transition": "Appendicitis_Symptom1"
    },
    "Ages_18_44": {
      "type": "Delay",
      "range": {
        "low": 18,
        "high": 44,
        "unit": "years"
      },
      "direct_transition": "Appendicitis_Symptom1"
    },
    "Ages_45_64": {
      "type": "Delay",
      "range": {
        "low": 45,
        "high": 64,
        "unit": "years"
      },
      "direct_transition": "Appendicitis_Symptom1"
    },
    "Ages_65_Plus": {
      "type": "Delay",
      "range": {
        "low": 65,
        "high": 99,
        "unit": "years"
      },
      "direct_transition": "Appendicitis_Symptom1"
    },
    "Appendicitis_Symptom1": {
      "type": "Symptom",
      "symptom": "Abdominal Pain",
      "range": {
        "low": 50,
        "high": 150
      },
      "direct_transition": "Appendicitis_Symptom2"
    },
    "Appendicitis_Symptom2": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Appendicitis_Symptom3"
    },
    "Appendicitis_Symptom3": {
      "type": "Symptom",
      "symptom": "Loss of Appetite",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Appendicitis_Symptom4"
    },
    "Appendicitis_Symptom4": {
      "type": "Symptom",
      "symptom": "Nausea/Vomiting",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Appendicitis_Symptom5"
    },
    "Appendicitis_Symptom5": {
      "type": "Symptom",
      "symptom": "Diarrhea",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Appendicitis_Symptom6"
    },
    "Appendicitis_Symptom6": {
      "type": "Symptom",
      "symptom": "Bloating/Gas",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Appendicitis_Symptom7"
    },
    "Appendicitis_Symptom7": {
      "type": "Symptom",
      "symptom": "Constipation",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Symptom_Period"
    },
    "Symptom_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "days"
      },
      "direct_transition": "Appendicitis"
    },
    "Appendicitis": {
      "type": "ConditionOnset",
      "target_encounter": "Appendicitis_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "74400008",
          "display": "Appendicitis"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.7,
          "transition": "Appendicitis_Encounter"
        },
        {
          "distribution": 0.3,
          "transition": "Rupture"
        }
      ],
      "remarks": [
        "The rate of perforation varies from 16% to 40%, with a higher frequency occurring in younger age groups (40-57%)",
        "and in patients older than 50 years (55-70%), in whom misdiagnosis and delayed diagnosis are common.",
        "(ref: http://emedicine.medscape.com/article/773895-overview#a7 )",
        "From table 1 here: https://www.ncbi.nlm.nih.gov/books/NBK169006/ it's about 30%",
        "For simplicity here I just round to 30% for all age groups."
      ]
    },
    "Rupture": {
      "type": "ConditionOnset",
      "target_encounter": "Appendicitis_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "47693006",
          "display": "Rupture of appendix"
        }
      ],
      "direct_transition": "Appendicitis_Encounter"
    },
    "Appendicitis_Encounter": {
      "type": "Encounter",
      "wellness": false,
      "encounter_class": "emergency",
      "reason": "Appendicitis",
      "remarks": [
        "Currently the GMF does not include Vital Signs, if we decide to add that then there are some lab tests we could add at this Encounter."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "direct_transition": "History_of_Appendectomy"
    },
    "History_of_Appendectomy": {
      "type": "ConditionOnset",
      "target_encounter": "Appendectomy_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "428251008",
          "display": "History of appendectomy"
        }
      ],
      "direct_transition": "Appendectomy_Encounter"
    },
    "Appendectomy_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Appendicitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183452005",
          "display": "Encounter Inpatient"
        }
      ],
      "direct_transition": "Appendectomy"
    },
    "Appendectomy": {
      "type": "Procedure",
      "target_encounter": "Appendectomy_Encounter",
      "reason": "Appendicitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "80146002",
          "display": "Appendectomy"
        }
      ],
      "duration": {
        "low": 40,
        "high": 70,
        "unit": "minutes"
      },
      "remarks": [
        "Avg operative time is ~55 minutes",
        "https://www.ncbi.nlm.nih.gov/pubmed/17658102"
      ],
      "direct_transition": "Appendicitis_Symptom1_Ends"
    },
    "Appendicitis_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Abdominal Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom2_Ends"
    },
    "Appendicitis_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom3_Ends"
    },
    "Appendicitis_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Loss of Appetite",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom4_Ends"
    },
    "Appendicitis_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Nausea/Vomiting",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom5_Ends"
    },
    "Appendicitis_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Diarrhea",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom6_Ends"
    },
    "Appendicitis_Symptom6_Ends": {
      "type": "Symptom",
      "symptom": "Bloating/Gas",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Appendicitis_Symptom7_Ends"
    },
    "Appendicitis_Symptom7_Ends": {
      "type": "Symptom",
      "symptom": "Constipation",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Recovery"
    },
    "Recovery": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 5,
        "unit": "days"
      },
      "remarks": [
        "Traditionally, patients are hospitalized for 24 hours after laparoscopic appendectomy. ",
        "A retrospective review of 119 patients [...] ",
        "Forty-two patients were dismissed on the day of surgery and 77 were admitted for 1 to 5 days postoperatively.",
        "https://www.ncbi.nlm.nih.gov/pubmed/22369831"
      ],
      "direct_transition": "End_Appendectomy_Encounter"
    },
    "End_Appendectomy_Encounter": {
      "type": "EncounterEnd",
      "discharge_disposition": {
        "system": "NUBC",
        "code": "01",
        "display": "Discharged to home care or self care (routine discharge)"
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"asthma":{
  "name": "Asthma",
  "remarks": [
    "This module is mostly based on statistics from the AAAAI and CDC. See:",
    "http://www.aaaai.org/about-aaaai/newsroom/asthma-statistics",
    "http://www.cdc.gov/nchs/fastats/asthma.htm",
    "http://www.cdc.gov/nchs/products/databriefs/db94.htm"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Delay_For_Atopy"
    },
    "Delay_For_Atopy": {
      "type": "Delay",
      "remarks": [
        "The Atopy module must be processed before any of the allergy modules so ",
        "atopy can appropriately influence allergies. Delaying the smallest possible ",
        "time step to ensure this happens."
      ],
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "transition": "Atopic"
        },
        {
          "transition": "Not_Atopic"
        }
      ]
    },
    "Atopic": {
      "type": "Simple",
      "remarks": [
        "45% of all atopic patients develop asthma. See the Atopy model for more info."
      ],
      "distributed_transition": [
        {
          "distribution": 0.45,
          "transition": "Asthma_Incidence"
        },
        {
          "distribution": 0.55,
          "transition": "Terminal"
        }
      ]
    },
    "Not_Atopic": {
      "type": "Simple",
      "remarks": [
        "There is a possibility that non-atopic patients develop asthma. However, ",
        "this asthma is likely more environmental and more likely to develop in ",
        "adulthood. Overall, 8-9% of the population gets asthma. In this model 6.8% ",
        "of those patients are atopic. The remaining 1.2-2% are not."
      ],
      "distributed_transition": [
        {
          "distribution": 0.023,
          "transition": "Asthma_Incidence"
        },
        {
          "distribution": 0.977,
          "transition": "Terminal"
        }
      ]
    },
    "Asthma_Incidence": {
      "type": "Simple",
      "remarks": [
        "8.6% of children have asthma, 7.4% of adults. To model childhood-only, lifetime, and adult-onset",
        "asthma I try to distribute the patients in a reasonable (but slightly arbitrary) manner:",
        "       ,-> 1.6% childhood-only                              ",
        " birth --> 7.0% lifetime             = 8.6% childhood asthma",
        "       `-> 0.4% adult-onset          = 7.4% adult asthma    ",
        "Collectively this sums to 9% of people getting asthma in their lifetime, which is consistent with",
        "my extrapolation based on the AAAAI's estimates: (1/14 had asthma in 2001, 1/12 in 2009, so I extrapolate",
        "1/11 for 2016)."
      ],
      "distributed_transition": [
        {
          "distribution": 0.95,
          "transition": "Delay_For_Childhood_Asthma"
        },
        {
          "distribution": 0.05,
          "transition": "Delay_Until_Adulthood"
        }
      ]
    },
    "Delay_For_Childhood_Asthma": {
      "type": "Delay",
      "remarks": [
        "Typically asthma symptoms don't appear until the child is at least 3."
      ],
      "range": {
        "low": 2,
        "high": 5,
        "unit": "years"
      },
      "direct_transition": "Childhood_Asthma_Begins"
    },
    "Delay_Until_Adulthood": {
      "type": "Delay",
      "range": {
        "low": 18,
        "high": 40,
        "unit": "years"
      },
      "direct_transition": "Adult_Asthma_Begins"
    },
    "Childhood_Asthma_Begins": {
      "type": "ConditionOnset",
      "target_encounter": "Asthma_Diagnosis",
      "assign_to_attribute": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "233678006",
          "display": "Childhood asthma"
        }
      ],
      "direct_transition": "Set_Childhood_Asthma"
    },
    "Set_Childhood_Asthma": {
      "type": "SetAttribute",
      "attribute": "asthma_type",
      "value": "childhood",
      "direct_transition": "Asthma_Diagnosis"
    },
    "Adult_Asthma_Begins": {
      "type": "ConditionOnset",
      "target_encounter": "Asthma_Diagnosis",
      "assign_to_attribute": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "195967001",
          "display": "Asthma"
        }
      ],
      "direct_transition": "Set_Adult_Asthma"
    },
    "Set_Adult_Asthma": {
      "type": "SetAttribute",
      "attribute": "asthma_type",
      "value": "lifelong",
      "direct_transition": "Asthma_Diagnosis"
    },
    "Asthma_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "Asthma_Symptom1"
    },
    "Asthma_Symptom1": {
      "type": "Symptom",
      "symptom": "Wheezing",
      "range": {
        "low": 25,
        "high": 75
      },
      "direct_transition": "Asthma_Symptom2"
    },
    "Asthma_Symptom2": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "range": {
        "low": 25,
        "high": 75
      },
      "direct_transition": "Asthma_Symptom3"
    },
    "Asthma_Symptom3": {
      "type": "Symptom",
      "symptom": "Chest Pressure",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Asthma_Symptom4"
    },
    "Asthma_Symptom4": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Asthma_Symptom5"
    },
    "Asthma_Symptom5": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Asthma_Symptom6"
    },
    "Asthma_Symptom6": {
      "type": "Symptom",
      "symptom": "Mucus Secretion",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Asthma_Screening"
    },
    "Asthma_Screening": {
      "type": "Procedure",
      "target_encounter": "Asthma_Diagnosis",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "171231001",
          "display": "Asthma screening"
        }
      ],
      "direct_transition": "Prescribe_Maintenance_Inhaler"
    },
    "Prescribe_Maintenance_Inhaler": {
      "type": "MedicationOrder",
      "target_encounter": "Asthma_Diagnosis",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "RxNorm",
          "code": "895994",
          "display": "120 ACTUAT Fluticasone propionate 0.044 MG/ACTUAT Metered Dose Inhaler"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "Prescribe_Emergency_Inhaler"
    },
    "Prescribe_Emergency_Inhaler": {
      "type": "MedicationOrder",
      "target_encounter": "Asthma_Diagnosis",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "RxNorm",
          "code": "745679",
          "display": "200 ACTUAT Albuterol 0.09 MG/ACTUAT Metered Dose Inhaler"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "Asthma_CarePlan_Selector"
    },
    "Asthma_CarePlan_Selector": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">=",
                "quantity": 18,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "smoker",
                "operator": "==",
                "value": true
              }
            ]
          },
          "transition": "Smoker_CarePlan"
        },
        {
          "transition": "Nonsmoker_CarePlan"
        }
      ]
    },
    "Smoker_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Asthma_Diagnosis",
      "assign_to_attribute": "asthma_careplan",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "699728000",
          "display": "Asthma self management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "710081004",
          "display": "Smoking cessation therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "710818004",
          "display": "Inhaled steroid therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "708409001",
          "display": "Home nebulizer therapy"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "Nonsmoker_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Asthma_Diagnosis",
      "assign_to_attribute": "asthma_careplan",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "699728000",
          "display": "Asthma self management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "710818004",
          "display": "Inhaled steroid therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "708409001",
          "display": "Home nebulizer therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "229298005",
          "display": "Breathing control"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Maintaining_Asthma"
    },
    "Maintaining_Asthma": {
      "type": "Delay",
      "exact": {
        "quantity": 6,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "remarks": [
              "Childhood-only asthma ends"
            ],
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 18,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "asthma_type",
                "operator": "==",
                "value": "childhood"
              }
            ]
          },
          "transition": "Childhood_Asthma_May_Subside"
        },
        {
          "transition": "Potential_Asthma_Attack"
        }
      ]
    },
    "Childhood_Asthma_May_Subside": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.83,
          "transition": "Childhood_Asthma_Becomes_Lifelong_Asthma"
        },
        {
          "distribution": 0.17,
          "transition": "Next_Wellness_Encounter"
        }
      ],
      "remarks": [
        "After a validation study, 248 children were identified as having asthma; these children were reassessed annually until age 19 years when 205 (83%) remained.",
        "\"Remission and persistence of asthma followed from 7 to 19 years of age.\" Andersson M, Hedman L, Bjerg A, Forsberg B, Lundbäck B, Rönmark E. Pediatrics. 2013 Aug;132(2):e435-42. doi: 10.1542/peds.2013-0741.",
        "https://www.ncbi.nlm.nih.gov/pubmed/23897917"
      ]
    },
    "Childhood_Asthma_Becomes_Lifelong_Asthma": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "asthma_condition",
      "direct_transition": "Lifelong_Asthma"
    },
    "Lifelong_Asthma": {
      "type": "SetAttribute",
      "attribute": "asthma_type",
      "value": "lifelong",
      "direct_transition": "Next_Adult_Welness_Encounter"
    },
    "Next_Adult_Welness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Lifelong_Asthma_Begins"
    },
    "Lifelong_Asthma_Begins": {
      "type": "ConditionOnset",
      "target_encounter": "Next_Adult_Welness_Encounter",
      "assign_to_attribute": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "195967001",
          "display": "Asthma"
        }
      ],
      "direct_transition": "Maintaining_Asthma"
    },
    "Potential_Asthma_Attack": {
      "type": "Simple",
      "remarks": [
        "Once every 6 months we simulate whether or not the patient has an asthma attack",
        "53% have an attack each year (57% children, 51% adults), source: AAAAI.",
        "This means a 26.5% rate of attack per 6 month period."
      ],
      "distributed_transition": [
        {
          "distribution": 0.735,
          "transition": "Maintaining_Asthma",
          "remarks": [
            "No asthma attack occured"
          ]
        },
        {
          "distribution": 0.265,
          "transition": "Asthma_Attack"
        }
      ]
    },
    "Asthma_Attack": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.1885,
          "transition": "Asthma_ED_Visit",
          "remarks": [
            "The CDC documented 10 ED visits per 100 people with asthma each year.",
            "http://www.cdc.gov/nchs/products/databriefs/db94.htm",
            "Assuming hospitalization always comes from an attack, for those that have attacks each 6-month period (26.5%)",
            "5/26.5 people (per 100) --> 18.85% rate of hospitalization from attack."
          ]
        },
        {
          "distribution": 0.8115,
          "transition": "Asthma_Attack_Followup",
          "remarks": [
            "If the attack did not result in an ED visit the patient still visited his/her physician for a followup"
          ]
        }
      ]
    },
    "Asthma_ED_Visit": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183478001",
          "display": "Emergency hospital admission for asthma"
        }
      ],
      "direct_transition": "End_Asthma_ED_Visit"
    },
    "End_Asthma_ED_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Followup"
    },
    "Delay_For_Followup": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "days"
      },
      "direct_transition": "Asthma_Attack_Followup"
    },
    "Asthma_Attack_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "asthma_condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "394701000",
          "display": "Asthma follow-up"
        }
      ],
      "direct_transition": "Followup_End"
    },
    "Followup_End": {
      "type": "EncounterEnd",
      "direct_transition": "Maintaining_Asthma"
    },
    "Next_Wellness_Encounter": {
      "type": "Encounter",
      "wellness": "true",
      "direct_transition": "Maintenance_Medication_End"
    },
    "Maintenance_Medication_End": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Maintenance_Inhaler",
      "direct_transition": "Emergency_Medication_End"
    },
    "Emergency_Medication_End": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Emergency_Inhaler",
      "direct_transition": "Childhood_Asthma_Subsides"
    },
    "Childhood_Asthma_Subsides": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "asthma_condition",
      "direct_transition": "Asthma_Symptom1_Ends"
    },
    "Asthma_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Wheezing",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Asthma_Symptom2_Ends"
    },
    "Asthma_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Asthma_Symptom3_Ends"
    },
    "Asthma_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Chest Pressure",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Asthma_Symptom4_Ends"
    },
    "Asthma_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Cough",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Asthma_Symptom5_Ends"
    },
    "Asthma_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Asthma_Symptom6_Ends"
    },
    "Asthma_Symptom6_Ends": {
      "type": "Symptom",
      "symptom": "Mucus Secretion",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "End_Asthma_CarePlan"
    },
    "End_Asthma_CarePlan": {
      "type": "CarePlanEnd",
      "referenced_by_attribute": "asthma_careplan",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"atopy":{
  "name": "Atopy",
  "remarks": [
    "'Atopy' specifically refers to the genetic tendency to develop allergic diseases.",
    "https://www.aaaai.org/conditions-and-treatments/conditions-dictionary/atopy",
    "Atopy is the most significant factor in the 'atopic triad' of: ",
    "1. Atopic Dermatitis (Eczema) ",
    "2. Asthma ",
    "3. Environmental and Food Allergies ",
    "4. Allergic Rhinitis (Hay Fever) ",
    "Okay... so maybe the atopic triad could be a 'quartet'.",
    "Up to 20% of children display signs of atopy, 50% by age 1 and 95% by age 5.",
    "75% of children with atopic symptoms outgrow them by adolescence or early ",
    "adulthood. However, 25% show symptoms for life. It is of course possible to be ",
    "non-atopic and still develop allergies and asthma.",
    "The prevalence of atopy and allergies has increased substantially in the 20th ",
    "century, especially after the 1960's, typically at a rate of 0.15 - 0.3% per ",
    "year. To model this historical increase in allergy prevalence atopy is the driving ",
    "factor. In this model the incidence of atopy increases at 1.875% per decade, or about ",
    "0.19% per year since 1940.",
    "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4629767/",
    "There is a complex relationship between allergies, asthma, and eczema.",
    "In a word, those with atopy have a significantly increased risk of severe ",
    "and moderate allergies.",
    "The final model: ",
    "   Total                    ,-->  85% Allergic Rhinitis               (12.8% overall)",
    " Population ---> 15% ATOPIC --->  55% Atopic Dermatitis               (8.25% overall)",
    "                           |`-->  45% Asthma                          (6.75% overall)",
    "                           `--->  25% Food & Environmental Allergies  (3.75% overall)",
    "Above, 15% of all people are atopic by 2010."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1940
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1950
          },
          "distributions": [
            {
              "distribution": 0.01875,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.98125,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1960
          },
          "distributions": [
            {
              "distribution": 0.0375,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.9625,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1970
          },
          "distributions": [
            {
              "distribution": 0.05625,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.94375,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1980
          },
          "distributions": [
            {
              "distribution": 0.075,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.925,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1990
          },
          "distributions": [
            {
              "distribution": 0.09375,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.90625,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2000
          },
          "distributions": [
            {
              "distribution": 0.1125,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.8875,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2010
          },
          "distributions": [
            {
              "distribution": 0.13125,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.86875,
              "transition": "Terminal"
            }
          ]
        },
        {
          "remarks": [
            "After 2010, the overall prevalence of atopy settles at 15%."
          ],
          "distributions": [
            {
              "distribution": 0.15,
              "transition": "Is_Atopic"
            },
            {
              "distribution": 0.85,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Is_Atopic": {
      "type": "SetAttribute",
      "attribute": "atopic",
      "value": true,
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"attention_deficit_disorder":{
  "name": "Attention Deficit Disorder",
  "remarks": [
    "The CDC estimates that 11% of children are diagnosed with ADHD. Althought ADHD ",
    "is possible in adults we only model this in children. ",
    "Source: http://www.cdc.gov/ncbddd/adhd/data.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "The CDC found that 13.2% of boys and 5.6% of girls were diagnosed with ADHD."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.132,
              "transition": "Delay_Until_ADHD"
            },
            {
              "distribution": 0.868,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.056,
              "transition": "Delay_Until_ADHD"
            },
            {
              "distribution": 0.944,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Delay_Until_ADHD": {
      "type": "Delay",
      "range": {
        "low": 7,
        "high": 15,
        "unit": "years"
      },
      "direct_transition": "ADHD"
    },
    "ADHD": {
      "type": "ConditionOnset",
      "target_encounter": "ADHD_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "192127007",
          "display": "Child attention deficit disorder"
        }
      ],
      "direct_transition": "ADHD_Diagnosis"
    },
    "ADHD_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "ADHD",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "ADD_Symptom1"
    },
    "ADD_Symptom1": {
      "type": "Symptom",
      "symptom": "Poor Eye Contact",
      "range": {
        "low": 0,
        "high": 30
      },
      "direct_transition": "ADD_Symptom2"
    },
    "ADD_Symptom2": {
      "type": "Symptom",
      "symptom": "Delayed Verbal/Language Skills",
      "range": {
        "low": 0,
        "high": 30
      },
      "direct_transition": "ADD_Symptom3"
    },
    "ADD_Symptom3": {
      "type": "Symptom",
      "symptom": "Hyperactive Behavior",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "ADD_Symptom4"
    },
    "ADD_Symptom4": {
      "type": "Symptom",
      "symptom": "Inability to Focus/Concentrate",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "ADD_Symptom5"
    },
    "ADD_Symptom5": {
      "type": "Symptom",
      "symptom": "Poor Socialization",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "ADHD_CarePlan"
    },
    "ADHD_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "ADHD_Diagnosis",
      "reason": "ADHD",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "386522008",
          "display": "Overactivity/inattention behavior management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "409063005",
          "display": "Counseling"
        },
        {
          "system": "SNOMED-CT",
          "code": "405783006",
          "display": "Psychological assessment"
        }
      ],
      "remarks": [
        "The CDC found that as many as 17.5% of children were not receiving any form of treatment ",
        "for their ADHD. Setting this at a round 15%."
      ],
      "distributed_transition": [
        {
          "distribution": 0.15,
          "transition": "End_Diagnosis_Encounter_without_BT",
          "remarks": [
            "This will just wait until adulthood before ending the ADHD and terminating the module."
          ]
        },
        {
          "distribution": 0.35,
          "transition": "End_Diagnosis_Encounter_with_BT",
          "remarks": [
            "Additionally 50% of those treated with medication will also receive behavioral ",
            "therapy, for about 55% in total."
          ]
        },
        {
          "distribution": 0.5,
          "transition": "ADHD_Medication_Selection"
        }
      ]
    },
    "Behavior_Therapy": {
      "type": "Delay",
      "remarks": [
        "Behavior therapy is favored over medication. We give behavior therapy for ",
        "awhile, until the patient reaches adulthood or the condition subsides."
      ],
      "range": {
        "low": 4,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "Behavior_Treatment_Encounter"
    },
    "Behavior_Treatment_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "ADHD",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Behavior_Treatment_Procedure"
    },
    "Behavior_Treatment_Procedure": {
      "type": "Procedure",
      "target_encounter": "Behavior_Treatment_Encounter",
      "reason": "ADHD",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "228557008",
          "display": "Cognitive and behavioral therapy"
        }
      ],
      "duration": {
        "low": 1,
        "high": 1,
        "unit": "hours"
      },
      "direct_transition": "End_Behavior_Treatment_Encounter"
    },
    "End_Behavior_Treatment_Encounter": {
      "type": "EncounterEnd",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.05,
              "transition": "ADHD_Ends",
              "remarks": [
                "We give the ADHD a chance to subside (meaning the behavioral treatment ",
                "has worked) during childhood. ADHD will eventually subside anyway once ",
                "the patient reaches adulthood. "
              ]
            },
            {
              "distribution": 0.95,
              "transition": "Behavior_Therapy"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "ADHD_Ends"
            }
          ]
        }
      ]
    },
    "ADHD_Medication_Selection": {
      "type": "Simple",
      "remarks": [
        "Ritalin was introduced in 1955. Strattera wasn't approved by the FDA for ",
        "treating ADHD until 2006."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1955
          },
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "End_Diagnosis_Encounter_with_BT",
              "remarks": [
                "If no medication is available we defer additional patients to behavioral therapy. ",
                "The rest get no form of treatment at all."
              ]
            },
            {
              "distribution": 0.6,
              "transition": "End_Diagnosis_Encounter_without_BT"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2006
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Ritalin",
              "remarks": [
                "Even with Ritalin available not all patients are ideal candidates. ADHD medication ",
                "was also prescribed at much lower rates historically. Deferring some of the remaining ",
                "patients to behavioral therapy, the rest to no form of treatment."
              ]
            },
            {
              "distribution": 0.15,
              "transition": "End_Diagnosis_Encounter_with_BT"
            },
            {
              "distribution": 0.25,
              "transition": "End_Diagnosis_Encounter_without_BT"
            }
          ]
        },
        {
          "remarks": [
            "With both Ritalin and Strattera available, and ADHD medication prescribed at the higher ",
            "rates of the 2000's all patients that reach this state are now directed to some form of ",
            "medication."
          ],
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Ritalin"
            },
            {
              "distribution": 0.5,
              "transition": "Strattera"
            }
          ]
        }
      ]
    },
    "Ritalin": {
      "type": "MedicationOrder",
      "target_encounter": "ADHD_Diagnosis",
      "assign_to_attribute": "adhd_medication",
      "reason": "ADHD",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1091166",
          "display": "Methylphenidate Hydrochloride 20 MG [Ritalin]"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.5,
          "transition": "End_Diagnosis_Encounter_with_BT"
        },
        {
          "distribution": 0.5,
          "transition": "End_Diagnosis_Encounter_without_BT"
        }
      ]
    },
    "Strattera": {
      "type": "MedicationOrder",
      "target_encounter": "ADHD_Diagnosis",
      "assign_to_attribute": "adhd_medication",
      "reason": "ADHD",
      "codes": [
        {
          "system": "RxNorm",
          "code": "617944",
          "display": "Atomoxetine 100 MG [Strattera]"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.5,
          "transition": "End_Diagnosis_Encounter_with_BT"
        },
        {
          "distribution": 0.5,
          "transition": "End_Diagnosis_Encounter_without_BT"
        }
      ]
    },
    "End_Diagnosis_Encounter_without_BT": {
      "type": "EncounterEnd",
      "direct_transition": "Age_Guard"
    },
    "End_Diagnosis_Encounter_with_BT": {
      "type": "EncounterEnd",
      "direct_transition": "Behavior_Therapy"
    },
    "Age_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Age",
        "operator": ">=",
        "quantity": 18,
        "unit": "years"
      },
      "direct_transition": "ADHD_Ends"
    },
    "ADHD_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "ADHD",
      "direct_transition": "ADD_Symptom1_Ends"
    },
    "ADD_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Poor Eye Contact",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "ADD_Symptom2_Ends"
    },
    "ADD_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Delayed Verbal/Language Skills",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "ADD_Symptom3_Ends"
    },
    "ADD_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Hyperactive Behavior",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "ADD_Symptom4_Ends"
    },
    "ADD_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Inability to Focus/Concentrate",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "ADD_Symptom5_Ends"
    },
    "ADD_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Poor Socialization",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "ADHD_CarePlan_Ends"
    },
    "ADHD_CarePlan_Ends": {
      "type": "CarePlanEnd",
      "careplan": "ADHD_CarePlan",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "adhd_medication",
            "operator": "is not nil"
          },
          "transition": "End_ADHD_Medication"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "End_ADHD_Medication": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "adhd_medication",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"bronchitis":{
  "name": "Bronchitis",
  "remarks": [
    "For now this covers only acute bronchitis. Chronic bronchitis is one of the conditions included in chronic obstructive pulmonary disease (COPD).",
    "Acute bronchitis is the fifth most common reason why adults see their GP; 5% of the adult population seeks medical advice for bronchitis each year.",
    "Most of the data here comes from the following sources: ",
    "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2278319/",
    "http://www.aafp.org/afp/1998/0315/p1270.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Potential_Infection"
    },
    "Potential_Infection": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.005,
              "transition": "Bronchitis_Infection",
              "remarks": [
                "6% of children get bronchitis each year.",
                "6% / year == ~ .5% per month?"
              ]
            },
            {
              "distribution": 0.995,
              "transition": "Potential_Infection"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.00416,
              "transition": "Bronchitis_Infection",
              "remarks": [
                "5% of the adult population seeks medical advice for bronchitis each year.",
                "5% / year == ~ .42% per month?"
              ]
            },
            {
              "distribution": 0.99584,
              "transition": "Potential_Infection"
            }
          ]
        }
      ]
    },
    "Bronchitis_Infection": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "10509002",
          "display": "Acute bronchitis (disorder)"
        }
      ],
      "direct_transition": "Bronchitis_Symptom1"
    },
    "Bronchitis_Symptom1": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 25,
        "high": 75
      },
      "direct_transition": "Bronchitis_Symptom2"
    },
    "Bronchitis_Symptom2": {
      "type": "Symptom",
      "symptom": "Mucus",
      "range": {
        "low": 25,
        "high": 50
      },
      "direct_transition": "Bronchitis_Symptom3"
    },
    "Bronchitis_Symptom3": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "range": {
        "low": 25,
        "high": 75
      },
      "direct_transition": "Bronchitis_Symptom4"
    },
    "Bronchitis_Symptom4": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "range": {
        "low": 25,
        "high": 50
      },
      "direct_transition": "Bronchitis_Symptom5"
    },
    "Bronchitis_Symptom5": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 25,
        "high": 75
      },
      "direct_transition": "Bronchitis_Symptom6"
    },
    "Bronchitis_Symptom6": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 25,
        "high": 50
      },
      "direct_transition": "Bronchitis_Symptom7"
    },
    "Bronchitis_Symptom7": {
      "type": "Symptom",
      "symptom": "Body Aches",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Bronchitis_Symptom8"
    },
    "Bronchitis_Symptom8": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "range": {
        "low": 25,
        "high": 50
      },
      "direct_transition": "Bronchitis_Symptom9"
    },
    "Bronchitis_Symptom9": {
      "type": "Symptom",
      "symptom": "Nausea/Vomiting",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Bronchitis_Symptom10"
    },
    "Bronchitis_Symptom10": {
      "type": "Symptom",
      "symptom": "Diarrhea",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Symptoms_Dont_improve"
    },
    "Symptoms_Dont_improve": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "days"
      },
      "direct_transition": "Doctor_Visit"
    },
    "Doctor_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Bronchitis_Infection",
      "remarks": [
        "There are no reliable diagnostic signs or laboratory tests, so the diagnosis of acute bronchitis is essentially a clinical one. ",
        "The most important condition to rule out is acute pneumonia. "
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.05,
          "transition": "Chest_Xray"
        },
        {
          "distribution": 0.2,
          "transition": "Sputum_Test"
        },
        {
          "distribution": 0.5,
          "transition": "Lung_Function_Test"
        },
        {
          "distribution": 0.2,
          "transition": "Bronchitis_CarePlan_Selector"
        }
      ]
    },
    "Chest_Xray": {
      "type": "Procedure",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "399208008",
          "display": "Plain chest X-ray (procedure)"
        }
      ],
      "duration": {
        "low": 10,
        "high": 25,
        "unit": "minutes"
      },
      "direct_transition": "Bronchitis_CarePlan_Selector"
    },
    "Sputum_Test": {
      "type": "Procedure",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "269911007",
          "display": "Sputum examination (procedure)"
        }
      ],
      "duration": {
        "low": 3,
        "high": 15,
        "unit": "minutes"
      },
      "direct_transition": "Bronchitis_CarePlan_Selector"
    },
    "Lung_Function_Test": {
      "type": "Procedure",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "23426006",
          "display": "Measurement of respiratory function (procedure)"
        }
      ],
      "duration": {
        "low": 10,
        "high": 25,
        "unit": "minutes"
      },
      "direct_transition": "Bronchitis_CarePlan_Selector"
    },
    "Bronchitis_CarePlan_Selector": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">=",
                "quantity": 18,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "smoker",
                "operator": "==",
                "value": true
              }
            ]
          },
          "transition": "Smoker_CarePlan"
        },
        {
          "transition": "Nonsmoker_CarePlan"
        }
      ]
    },
    "Smoker_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "bronchitis_careplan",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "53950000",
          "display": "Respiratory therapy"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "710081004",
          "display": "Smoking cessation therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "304510005",
          "display": "Recommendation to avoid exercise"
        },
        {
          "system": "SNOMED-CT",
          "code": "371605008",
          "display": "Deep breathing and coughing exercises"
        }
      ],
      "direct_transition": "OTC_Medicine"
    },
    "Nonsmoker_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "bronchitis_careplan",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "53950000",
          "display": "Respiratory therapy"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "304510005",
          "display": "Recommendation to avoid exercise"
        },
        {
          "system": "SNOMED-CT",
          "code": "371605008",
          "display": "Deep breathing and coughing exercises"
        }
      ],
      "direct_transition": "OTC_Medicine"
    },
    "OTC_Medicine": {
      "type": "Simple",
      "remarks": [
        "Up to 95% of bronchitis cases are viral so antibiotics are rarely prescribed",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2278319/"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Symptom",
            "symptom": "Mucus",
            "operator": "<",
            "value": 30
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Cough_suppressant"
            },
            {
              "distribution": 0.2,
              "transition": "Acetaminophen"
            }
          ],
          "remarks": [
            "cough suppressants shouldn't be given if the cough brings up mucus"
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "Cough_suppressant"
            },
            {
              "distribution": 0.9,
              "transition": "Acetaminophen"
            }
          ]
        }
      ]
    },
    "Cough_suppressant": {
      "type": "MedicationOrder",
      "assign_to_attribute": "OTC_Bronchitis_Med",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1020137",
          "display": "Dextromethorphan Hydrobromide 1 MG/ML"
        }
      ],
      "direct_transition": "End_Doctor_Visit"
    },
    "Acetaminophen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "OTC_Bronchitis_Med",
      "reason": "Bronchitis_Infection",
      "codes": [
        {
          "system": "RxNorm",
          "code": "608680",
          "display": "Acetaminophen 160 MG"
        }
      ],
      "direct_transition": "End_Doctor_Visit"
    },
    "End_Doctor_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_for_condition_to_resolve"
    },
    "Wait_for_condition_to_resolve": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Bronchitis_Subsides"
    },
    "Bronchitis_Subsides": {
      "type": "ConditionEnd",
      "condition_onset": "Bronchitis_Infection",
      "direct_transition": "Bronchitis_Symptom1_Subsides"
    },
    "Bronchitis_Symptom1_Subsides": {
      "type": "Symptom",
      "symptom": "Cough",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom2_Subsides"
    },
    "Bronchitis_Symptom2_Subsides": {
      "type": "Symptom",
      "symptom": "Mucus",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom4_Subsides"
    },
    "Bronchitis_Symptom4_Subsides": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom5_Subsides"
    },
    "Bronchitis_Symptom5_Subsides": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom6_Subsides"
    },
    "Bronchitis_Symptom6_Subsides": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom7_Subsides"
    },
    "Bronchitis_Symptom7_Subsides": {
      "type": "Symptom",
      "symptom": "Body Aches",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom8_Subsides"
    },
    "Bronchitis_Symptom8_Subsides": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom9_Subsides"
    },
    "Bronchitis_Symptom9_Subsides": {
      "type": "Symptom",
      "symptom": "Nausea/Vomiting",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom10_Subsides"
    },
    "Bronchitis_Symptom10_Subsides": {
      "type": "Symptom",
      "symptom": "Diarrhea",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Bronchitis_Symptom3_Subsides"
    },
    "Bronchitis_Symptom3_Subsides": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "exact": {
        "quantity": 0
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "OTC_Bronchitis_Med",
            "operator": "is not nil"
          },
          "transition": "End_OTC_Medication"
        },
        {
          "transition": "Next_Well_Visit"
        }
      ]
    },
    "End_OTC_Medication": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "OTC_Bronchitis_Med",
      "direct_transition": "Next_Well_Visit"
    },
    "Next_Well_Visit": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "End_Bronchitis_CarePlan"
    },
    "End_Bronchitis_CarePlan": {
      "type": "CarePlanEnd",
      "referenced_by_attribute": "bronchitis_careplan",
      "direct_transition": "Potential_Infection"
    }
  }
}
,
"colorectal_cancer":{
  "name": "Colorectal Cancer",
  "remarks": [
    "Colorectal cancer typically starts as benign polyps on the lining of the colon ",
    "or rectum that slowly become cancerous over a period of 10-15 years. Annually ",
    "136,000 new cases are diagnosed and 51,300 people die from colorectal cancer in the U.S.",
    "The lifetime risk of developing colorectal cancer is 4.7% for men, 4.4% for women.",
    "source: http://www.cancer.org/cancer/colonandrectumcancer/detailedguide/colorectal-cancer-key-statistics",
    "Some things not modeled in this module: ",
    "1. Colorectal cancer in children. Although possible it's highly unlikely. ",
    "2. Diabetes, obesity, and poor diet as risk factors. I could not find any ",
    "   conclusive statistics or reports linking these to an increased incidence ",
    "   of colorectal cancer. ",
    "3. The progression of cancer from one stage to another. Whatever stage the patient ",
    "   is initially diagnosed at they remain at."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Delay_For_Smoking_History"
    },
    "Delay_For_Smoking_History": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        "About 1/3 of people over age 50 still do not get regular colonoscopies. ",
        "These people develop more advanced colorectal cancer before it's detected.",
        "Smoking increases your risk of colorectal cancer by 1.5x.",
        "Wait for smoking history (possibly none) to accumulate."
      ],
      "exact": {
        "quantity": 30,
        "unit": "years"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          },
          "distributions": [
            {
              "distribution": 0.7,
              "transition": "Routine_Colonoscopy_Guard"
            },
            {
              "distribution": 0.285,
              "transition": "Terminal"
            },
            {
              "distribution": 0.015,
              "transition": "Delay_Until_Symptoms_Start"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.7,
              "transition": "Routine_Colonoscopy_Guard"
            },
            {
              "distribution": 0.29,
              "transition": "Terminal"
            },
            {
              "distribution": 0.01,
              "transition": "Delay_Until_Symptoms_Start"
            }
          ]
        }
      ]
    },
    "Delay_Until_Symptoms_Start": {
      "type": "Delay",
      "remarks": [
        "These patients do not get regular colonscopies or get colorectal cancer ",
        "before they reach age 50. The median age for early-onset colorectal cancer ",
        "is 44. See the 'Colorectal Cancer Symptoms' section."
      ],
      "range": {
        "low": 5,
        "high": 40,
        "unit": "years"
      },
      "direct_transition": "Colorectal_Cancer_Symptom_1"
    },
    "Routine_Colonoscopy_Guard": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " ROUTINE COLONOSCOPY                                                  ",
        "======================================================================"
      ],
      "allow": {
        "condition_type": "Age",
        "operator": ">=",
        "quantity": 50,
        "unit": "years"
      },
      "direct_transition": "Routine_Colonoscopy_Encounter"
    },
    "Routine_Colonoscopy_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "Routine_Colonoscopy_Procedure"
    },
    "Routine_Colonoscopy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Routine_Colonoscopy_Encounter",
      "remarks": [
        "NIH study on the epidemiology of colorectal adenomas (polyps): ",
        "https://www.ncbi.nlm.nih.gov/pubmed/15666099 ",
        "10-20% of sigmoidoscopy and colonoscopy patients are found to have adenomas.",
        "To make this more realistic I slowly increase the rate that adenomas are found ",
        "as patients age. Colonoscopies are generally not recommended for those over 75-80."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "73761001",
          "display": "Colonoscopy"
        }
      ],
      "duration": {
        "low": 25,
        "high": 45,
        "unit": "minutes"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 60,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.9,
              "transition": "End_Routine_Colonoscopy_Encounter"
            },
            {
              "distribution": 0.1,
              "transition": "Detect_Adenoma"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 70,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.85,
              "transition": "End_Routine_Colonoscopy_Encounter"
            },
            {
              "distribution": 0.15,
              "transition": "Detect_Adenoma"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 80,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "End_Routine_Colonoscopy_Encounter"
            },
            {
              "distribution": 0.2,
              "transition": "Detect_Adenoma"
            }
          ]
        }
      ]
    },
    "End_Routine_Colonoscopy_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Next_Routine_Colonoscopy"
    },
    "Wait_For_Next_Routine_Colonoscopy": {
      "type": "Delay",
      "remarks": [
        "If no anomalies are detected at age 50 colonoscopies are scheduled at ",
        "5-year intervals from here on out. Based on these CDC guidelines: ",
        "http://www.cdc.gov/cancer/colorectal/basic_info/screening/guidelines.htm"
      ],
      "exact": {
        "quantity": 5,
        "unit": "years"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 80,
            "unit": "years"
          },
          "transition": "Terminal"
        },
        {
          "transition": "Routine_Colonoscopy_Encounter"
        }
      ]
    },
    "Detect_Adenoma": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " COLORECTAL ADENOMA DIAGNOSIS                                         ",
        "======================================================================",
        "Although the incidence of colorectal polyps is 10-20% only about 10% of these polyps become cancerous. Source: ",
        "http://www.hopkinscoloncancercenter.org/CMS/CMS_Page.aspx?CurrentUDV=59&CMS_Page_ID=0B34E9BE-5DE6-4CB4-B387-4158CC924084"
      ],
      "target_encounter": "Routine_Colonoscopy_Encounter",
      "assign_to_attribute": "colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "68496003",
          "display": "Polyp of colon"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.9,
          "transition": "Benign_Adenoma"
        },
        {
          "distribution": 0.1,
          "transition": "Malignant_Adenoma"
        }
      ]
    },
    "Benign_Adenoma": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 2,
        "high": 7
      },
      "unit": "mm",
      "codes": [
        {
          "system": "LOINC",
          "code": "33756-8",
          "display": "Polyp size greatest dimension by CAP cancer protocols"
        }
      ],
      "direct_transition": "Fecal_Test"
    },
    "Malignant_Adenoma": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 10,
        "high": 25
      },
      "unit": "mm",
      "codes": [
        {
          "system": "LOINC",
          "code": "33756-8",
          "display": "Polyp size greatest dimension by CAP cancer protocols"
        }
      ],
      "direct_transition": "Fecal_Test"
    },
    "Fecal_Test": {
      "type": "Procedure",
      "remarks": [
        "======================================================================",
        " FECAL IMMUNOCHEMICAL TEST                                            ",
        "======================================================================",
        "This test is used to detect trace amounts of blood in the stool that ",
        "is indicative of colorectal cancer. The estimated cutoff level for this ",
        "test is 100 ng/mL. Source: http://cebp.aacrjournals.org/content/20/2/272",
        "Interestingly, if the patient previously had a positive test result (from ",
        "a malignant adenoma) the 'Malignant_Adenoma' PriorState will remain true. ",
        "If the patient is then later diagnosed with a benign adenoma the fecal test ",
        "will still return postive. This aligns with the likelihood of recurrent ",
        "adenomas being cancerous."
      ],
      "target_encounter": "Routine_Colonoscopy_Encounter",
      "reason": "colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1015401000000102",
          "display": "Fecal occult blood test"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Malignant_Adenoma"
          },
          "transition": "Fecal_Test_Positive_Result"
        },
        {
          "transition": "Fecal_Test_Negative_Result"
        }
      ]
    },
    "Fecal_Test_Positive_Result": {
      "type": "Observation",
      "category": "laboratory",
      "range": {
        "low": 150,
        "high": 500
      },
      "unit": "ng/mL",
      "codes": [
        {
          "system": "LOINC",
          "code": "57905-2",
          "display": "Hemoglobin.gastrointestinal [Presence] in Stool by Immunologic method"
        }
      ],
      "direct_transition": "Adenoma_Removal"
    },
    "Fecal_Test_Negative_Result": {
      "type": "Observation",
      "category": "laboratory",
      "range": {
        "low": 0,
        "high": 25
      },
      "unit": "ng/mL",
      "codes": [
        {
          "system": "LOINC",
          "code": "57905-2",
          "display": "Hemoglobin.gastrointestinal [Presence] in Stool by Immunologic method"
        }
      ],
      "direct_transition": "Adenoma_Removal"
    },
    "Adenoma_Removal": {
      "type": "Procedure",
      "remarks": [
        "======================================================================",
        " COLORECTAL ADENOMA TREATMENT                                         ",
        "======================================================================",
        "When found these polyps are almost always removed. If the polyps are ",
        "large and potentially cancerous a biopsy is then performed. For simplicity ",
        "all large colorectal adenomas found in this module are also cancerous."
      ],
      "target_encounter": "Routine_Colonoscopy_Encounter",
      "reason": "colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274031008",
          "display": "Rectal polypectomy"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Malignant_Adenoma"
          },
          "transition": "Adenoma_Biopsy"
        },
        {
          "transition": "End_Routine_Colonoscopy_with_Benign_Adenoma"
        }
      ]
    },
    "End_Routine_Colonoscopy_with_Benign_Adenoma": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Followup_Colonoscopy"
    },
    "Adenoma_Biopsy": {
      "type": "Procedure",
      "target_encounter": "Routine_Colonoscopy_Encounter",
      "reason": "colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "76164006",
          "display": "Biopsy of colon"
        }
      ],
      "direct_transition": "End_Routine_Colonoscopy_with_Malignant_Adenoma"
    },
    "End_Routine_Colonoscopy_with_Malignant_Adenoma": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Biopsy_Followup"
    },
    "Wait_For_Biopsy_Followup": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Biopsy_Followup"
    },
    "Biopsy_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "End_Biopsy_Followup"
    },
    "End_Biopsy_Followup": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.4,
          "transition": "Colorectal_Cancer_Diagnose_Stage_I"
        },
        {
          "distribution": 0.2,
          "transition": "Colorectal_Cancer_Diagnose_Stage_II"
        },
        {
          "distribution": 0.4,
          "transition": "Wait_For_Followup_Colonoscopy"
        }
      ]
    },
    "Wait_For_Followup_Colonoscopy": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " FOLLOWUP COLONOSCOPY                                                 ",
        "======================================================================",
        "If colorectal adenomas are found a followup colonoscopy is scheduled ",
        "for one year later. If the adenomas recur there's a good chance the ",
        "patient will get cancer."
      ],
      "range": {
        "low": 12,
        "high": 18,
        "unit": "months"
      },
      "direct_transition": "Followup_Colonoscopy_Encounter"
    },
    "Followup_Colonoscopy_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "Followup_Colonoscopy_Procedure"
    },
    "Followup_Colonoscopy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Followup_Colonoscopy_Encounter",
      "remarks": [
        "Colorectal polyps recur at about 20-30% over a lifetime.",
        "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2780113/"
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "73761001",
          "display": "Colonoscopy"
        }
      ],
      "duration": {
        "low": 25,
        "high": 45,
        "unit": "minutes"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "713197008",
                "display": "Recurrent rectal polyp"
              }
            ],
            "remarks": [
              "For variety, if the patient was referred to a followup and not ",
              "immediately diagnosed with colorectal cancer that means his/her ",
              "recurrent adenomas were on the fence. We give these patients a ",
              "break and return them back to the general pool."
            ]
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "End_Recurrent_Adenoma"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "End_Colorectal_Adenoma"
            },
            {
              "distribution": 0.25,
              "transition": "Recurrent_Colorectal_Adenoma"
            }
          ]
        }
      ]
    },
    "End_Colorectal_Adenoma": {
      "type": "ConditionEnd",
      "remarks": [
        "If the patient's colorectal adenoma does not return after a year ",
        "we return them to the regular 5-year pattern. However, they will ",
        "still have the option for their adenoma to recur later in the future."
      ],
      "referenced_by_attribute": "colorectal_adenoma",
      "direct_transition": "End_Followup_Encounter_Clean"
    },
    "End_Followup_Encounter_Clean": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Next_Routine_Colonoscopy"
    },
    "Recurrent_Colorectal_Adenoma": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " RECURRENT COLORECTAL ADENOMA                                         ",
        "======================================================================",
        "Survival after recurrent colorectal adenoma is much lower, anywhere ",
        "in the range of 15-40%. If we detect recurent colorectal adenoma ",
        "we move the patient along to stage III cancer. ",
        "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2780113/"
      ],
      "target_encounter": "Followup_Colonoscopy_Encounter",
      "assign_to_attribute": "recurrent_colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "713197008",
          "display": "Recurrent rectal polyp"
        }
      ],
      "direct_transition": "Recurrent_Adenoma_Removal"
    },
    "Recurrent_Adenoma_Removal": {
      "type": "Procedure",
      "target_encounter": "Followup_Colonoscopy_Encounter",
      "reason": "recurrent_colorectal_adenoma",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274031008",
          "display": "Rectal polypectomy"
        }
      ],
      "direct_transition": "End_Followup_Encounter_After_Adenoma_Removal"
    },
    "End_Followup_Encounter_After_Adenoma_Removal": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.3,
          "transition": "Colorectal_Cancer_Diagnose_Stage_II"
        },
        {
          "distribution": 0.3,
          "transition": "Colorectal_Cancer_Diagnose_Stage_III"
        },
        {
          "distribution": 0.4,
          "transition": "Wait_For_Followup_Colonoscopy"
        }
      ]
    },
    "End_Recurrent_Adenoma": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "recurrent_colorectal_adenoma",
      "direct_transition": "End_Colorectal_Adenoma"
    },
    "Colorectal_Cancer_Symptom_1": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " COLORECTAL CANCER SYMPTOMS                                           ",
        "======================================================================",
        "If the patient begins experiencing the symptoms of colorectal cancer ",
        "before ever having a colonoscopy usually the cancer is further along."
      ],
      "target_encounter": "Symptom_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "236077008",
          "display": "Protracted diarrhea"
        }
      ],
      "direct_transition": "Colorectal_Cancer_Symptom_2"
    },
    "Colorectal_Cancer_Symptom_2": {
      "type": "ConditionOnset",
      "target_encounter": "Symptom_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "6072007",
          "display": "Bleeding from anus"
        }
      ],
      "direct_transition": "Symptom_Encounter"
    },
    "Symptom_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Colorectal_Cancer_Symptom_2",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "End_Symptom_Encounter"
    },
    "End_Symptom_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Colorectal_Cancer_Symptom_3"
    },
    "Colorectal_Cancer_Symptom_3": {
      "type": "Symptom",
      "symptom": "Constipation",
      "range": {
        "low": 50,
        "high": 150
      },
      "direct_transition": "Colorectal_Cancer_Symptom_4"
    },
    "Colorectal_Cancer_Symptom_4": {
      "type": "Symptom",
      "symptom": "Cramping",
      "range": {
        "low": 50,
        "high": 150
      },
      "direct_transition": "Colorectal_Cancer_Symptom_5"
    },
    "Colorectal_Cancer_Symptom_5": {
      "type": "Symptom",
      "symptom": "Abdominal Pain",
      "range": {
        "low": 50,
        "high": 150
      },
      "direct_transition": "Colorectal_Cancer_Symptom_6"
    },
    "Colorectal_Cancer_Symptom_6": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Colorectal_Cancer_Symptom_7"
    },
    "Colorectal_Cancer_Symptom_7": {
      "type": "Symptom",
      "symptom": "Weight Loss",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Wait_For_Diagnostic_Colonoscopy"
    },
    "Wait_For_Diagnostic_Colonoscopy": {
      "type": "Delay",
      "remarks": [
        "The patient needs to wait for a couple of days for his/her colon ",
        "to clear out before the colonoscopy can be performed."
      ],
      "range": {
        "low": 3,
        "high": 5,
        "unit": "days"
      },
      "direct_transition": "Diagnostic_Colonoscopy_Encounter"
    },
    "Diagnostic_Colonoscopy_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "Diagnostic_Colonoscopy_Procedure"
    },
    "Diagnostic_Colonoscopy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Diagnostic_Colonoscopy_Encounter",
      "remarks": [
        "The patient is showing all signs of advanced colorectal cancer. ",
        "The prognosis will not be good."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "73761001",
          "display": "Colonoscopy"
        }
      ],
      "duration": {
        "low": 25,
        "high": 45,
        "unit": "minutes"
      },
      "direct_transition": "End_Diagnostic_Colonoscopy_Encounter"
    },
    "End_Diagnostic_Colonoscopy_Encounter": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.5,
          "transition": "Colorectal_Cancer_Diagnose_Stage_III"
        },
        {
          "distribution": 0.5,
          "transition": "Colorectal_Cancer_Diagnose_Stage_IV"
        }
      ]
    },
    "Colorectal_Cancer_Diagnose_Stage_I": {
      "type": "SetAttribute",
      "attribute": "colorectal_cancer_stage",
      "value": 1,
      "direct_transition": "Colorectal_Cancer"
    },
    "Colorectal_Cancer_Diagnose_Stage_II": {
      "type": "SetAttribute",
      "attribute": "colorectal_cancer_stage",
      "value": 2,
      "direct_transition": "Colorectal_Cancer"
    },
    "Colorectal_Cancer_Diagnose_Stage_III": {
      "type": "SetAttribute",
      "attribute": "colorectal_cancer_stage",
      "value": 3,
      "direct_transition": "Colorectal_Cancer"
    },
    "Colorectal_Cancer_Diagnose_Stage_IV": {
      "type": "SetAttribute",
      "attribute": "colorectal_cancer_stage",
      "value": 4,
      "direct_transition": "Colorectal_Cancer"
    },
    "Colorectal_Cancer": {
      "type": "Simple",
      "remarks": [
        "This state mainly exists to isolate the colonoscopy and diagnosis ",
        "portion of the module from the portion devoted to cancer treatment.",
        "======================================================================",
        " COLORECTAL CANCER                                                    ",
        "======================================================================",
        "| Stage | Survival Rate | Treatments                                 |",
        "----------------------------------------------------------------------",
        "|    I  |      92%      | Polypectomy, Parial colectomy              |",
        "|   II  |      75%      | Partial colectomy, colectomy, chemo        |",
        "|  III  |      65%      | Colectomy, chemo                           |",
        "|   IV  |      11%      | Chemo, radiotherapy                        |",
        "----------------------------------------------------------------------"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 1
          },
          "transition": "Colorectal_Cancer_Stage_I"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 2
          },
          "transition": "Colorectal_Cancer_Stage_II"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 3
          },
          "transition": "Colorectal_Cancer_Stage_III"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 4
          },
          "transition": "Colorectal_Cancer_Stage_IV"
        }
      ]
    },
    "Colorectal_Cancer_Stage_I": {
      "type": "ConditionOnset",
      "target_encounter": "Oncologist_Encounter",
      "assign_to_attribute": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "93761005",
          "display": "Primary malignant neoplasm of colon"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.08,
          "transition": "Eventual_Death"
        },
        {
          "distribution": 0.92,
          "transition": "Wait_For_Oncologist_Encounter"
        }
      ]
    },
    "Colorectal_Cancer_Stage_II": {
      "type": "ConditionOnset",
      "target_encounter": "Oncologist_Encounter",
      "assign_to_attribute": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "109838007",
          "display": "Overlapping malignant neoplasm of colon"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.25,
          "transition": "Eventual_Death"
        },
        {
          "distribution": 0.75,
          "transition": "Wait_For_Oncologist_Encounter"
        }
      ]
    },
    "Colorectal_Cancer_Stage_III": {
      "type": "ConditionOnset",
      "target_encounter": "Oncologist_Encounter",
      "assign_to_attribute": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "363406005",
          "display": "Malignant tumor of colon"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.35,
          "transition": "Eventual_Death"
        },
        {
          "distribution": 0.65,
          "transition": "Wait_For_Oncologist_Encounter"
        }
      ]
    },
    "Colorectal_Cancer_Stage_IV": {
      "type": "ConditionOnset",
      "target_encounter": "Oncologist_Encounter",
      "assign_to_attribute": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "94260004",
          "display": "Secondary malignant neoplasm of colon"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.89,
          "transition": "Eventual_Death"
        },
        {
          "distribution": 0.11,
          "transition": "Wait_For_Oncologist_Encounter"
        }
      ]
    },
    "Eventual_Death": {
      "type": "Death",
      "referenced_by_attribute": "colorectal_cancer",
      "remarks": [
        "These patients will eventually die from their colorectal cancer."
      ],
      "range": {
        "low": 2,
        "high": 5,
        "unit": "years"
      },
      "direct_transition": "Wait_For_Oncologist_Encounter"
    },
    "Wait_For_Oncologist_Encounter": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Oncologist_Encounter"
    },
    "Oncologist_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "colorectal_cancer",
      "remarks": [
        "Annual incidence of progression: ",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2095643/"
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Colorectal_Cancer_CarePlan"
    },
    "Colorectal_Cancer_CarePlan": {
      "type": "CarePlanStart",
      "remarks": [
        "======================================================================",
        " COLORECTAL CANCER TREATMENTS                                         ",
        "======================================================================",
        "Caring for colorectal cancer differs by stage. Source for all treatment information: ",
        "http://www.cancer.org/cancer/colonandrectumcancer/detailedguide/colorectal-cancer-treating-by-stage-colon"
      ],
      "target_encounter": "Oncologist_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "395082007",
          "display": "Cancer care plan"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "226234005",
          "display": "Healthy diet"
        },
        {
          "system": "SNOMED-CT",
          "code": "703993001",
          "display": "Colonoscopy planned"
        },
        {
          "system": "SNOMED-CT",
          "code": "243072006",
          "display": "Cancer education"
        }
      ],
      "direct_transition": "End_Oncologist_Encounter"
    },
    "End_Oncologist_Encounter": {
      "type": "EncounterEnd",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 1
          },
          "remarks": [
            "The treatment for stage 1 typically requires only a polypectomy (already performed ",
            "as part of the last colonoscopy) or occasionally a partial colectomy of the affected ",
            "portion of the colon."
          ],
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Wait_For_Partial_Colectomy"
            },
            {
              "distribution": 0.7,
              "transition": "Remission_Period"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 2
          },
          "remarks": [
            "The treatment for stage 2 typically requires a partial colectomy. Additional ",
            "chemotherapy treatment is sometimes used post-surgery if the cancer is likely ",
            "to recur."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Wait_For_Partial_Colectomy"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 3
          },
          "remarks": [
            "The treatment for stage 3 is a partial colectomy followed by chemo. Additional ",
            "radiation therapy is sometimes used, especially for patients that are not healthy ",
            "enough for surgery."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Wait_For_Partial_Colectomy"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 4
          },
          "remarks": [
            "The treatment for stage 4 is chemo an occasionally surgery. However, surgery is ",
            "only recommended to relieve symptoms or in rare cases where chemo has shrunk the ",
            "tumors enough to make surgery viable. Survival from stage 4 is unlikely."
          ],
          "distributions": [
            {
              "distribution": 0.15,
              "transition": "Wait_For_Diverting_Colostomy"
            },
            {
              "distribution": 0.85,
              "transition": "Wait_For_Initial_Chemotherapy_Treatment"
            }
          ]
        }
      ]
    },
    "Wait_For_Partial_Colectomy": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " PARTIAL COLECTOMY                                                    ",
        "======================================================================",
        "Surgical removal of the affected portion of the colon."
      ],
      "range": {
        "low": 1,
        "high": 2,
        "unit": "weeks"
      },
      "direct_transition": "Partial_Colectomy_Encounter"
    },
    "Partial_Colectomy_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Partial_Colectomy_Procedure"
    },
    "Partial_Colectomy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Partial_Colectomy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "43075005",
          "display": "Partial resection of colon"
        }
      ],
      "direct_transition": "Partial_Colectomy_CarePlan"
    },
    "Partial_Colectomy_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Partial_Colectomy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "781831000000109",
          "display": "Major surgery care management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "10888001",
          "display": "Liquid diet"
        },
        {
          "system": "SNOMED-CT",
          "code": "103744005",
          "display": "Administration of intravenous fluids"
        }
      ],
      "direct_transition": "End_Partial_Colectomy_Encounter"
    },
    "End_Partial_Colectomy_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Partial_Colectomy_Recovery"
    },
    "Delay_For_Partial_Colectomy_Recovery": {
      "type": "Delay",
      "range": {
        "low": 7,
        "high": 21,
        "unit": "days"
      },
      "direct_transition": "End_Partial_Colectomy_CarePlan"
    },
    "End_Partial_Colectomy_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "Partial_Colectomy_CarePlan",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 2
          },
          "distributions": [
            {
              "distribution": 0.33,
              "transition": "Wait_For_Initial_Chemotherapy_Treatment"
            },
            {
              "distribution": 0.67,
              "transition": "Remission_Period"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "colorectal_cancer_stage",
            "operator": "==",
            "value": 3
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Wait_For_Initial_Chemotherapy_Treatment"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Remission_Period"
            }
          ]
        }
      ]
    },
    "Wait_For_Diverting_Colostomy": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " DIVERTING COLECTOMY                                                  ",
        "======================================================================",
        "Used to treat advanced colorectal cancer. Bypasses blockage of the colon ",
        "to an external bag that collects waste. This is mainly a treatment of ",
        "symptoms rather than a treatment of the cancer itself."
      ],
      "range": {
        "low": 1,
        "high": 2,
        "unit": "weeks"
      },
      "direct_transition": "Diverting_Colostomy_Encounter"
    },
    "Diverting_Colostomy_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Diverting_Colostomy_Procedure"
    },
    "Diverting_Colostomy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Diverting_Colostomy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "387607004",
          "display": "Construction of diverting colostomy"
        }
      ],
      "direct_transition": "Diverting_Colostomy_CarePlan"
    },
    "Diverting_Colostomy_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Diverting_Colostomy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "781831000000109",
          "display": "Major surgery care management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "10888001",
          "display": "Liquid diet"
        },
        {
          "system": "SNOMED-CT",
          "code": "103744005",
          "display": "Administration of intravenous fluids"
        }
      ],
      "direct_transition": "End_Diverting_Colostomy_Encounter"
    },
    "End_Diverting_Colostomy_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Diverting_Colostomy_Recovery"
    },
    "Delay_For_Diverting_Colostomy_Recovery": {
      "type": "Delay",
      "range": {
        "low": 7,
        "high": 21,
        "unit": "days"
      },
      "direct_transition": "End_Diverting_Colostomy_CarePlan"
    },
    "End_Diverting_Colostomy_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "Diverting_Colostomy_CarePlan",
      "remarks": [
        "TODO: Chemo for stage II"
      ],
      "direct_transition": "Wait_For_Initial_Chemotherapy_Treatment"
    },
    "Wait_For_Initial_Chemotherapy_Treatment": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 2,
        "unit": "weeks"
      },
      "direct_transition": "Initialize_Chemo_Counter"
    },
    "Initialize_Chemo_Counter": {
      "type": "SetAttribute",
      "attribute": "cr_chemo_count",
      "value": 0,
      "direct_transition": "Chemotherapy_Treatment_Path"
    },
    "Chemotherapy_Treatment_Path": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " CHEMOTHERAPY                                                         ",
        "======================================================================",
        "Chemotherapy of the affected areas using one of: ",
        "FOLFOX: leucovorin, 5-FU, and oxaliplatin (Eloxatin) ",
        "FOLFIRI: leucovorin, 5-FU, and irinotecan (Camptosar) ",
        "CapeOX: capecitabine (Xeloda) and oxaliplatin",
        "Chemotherapy treatment is typically given for about 6 months. This ",
        "equates to 6 chemo treatments."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "cr_chemo_count",
            "operator": ">=",
            "value": 6
          },
          "transition": "Remission_Period"
        },
        {
          "transition": "Chemotherapy_Encounter"
        }
      ]
    },
    "Chemotherapy_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Chemotherapy_Drugs_I"
    },
    "Chemotherapy_Drugs_I": {
      "type": "MedicationOrder",
      "target_encounter": "Chemotherapy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1803932",
          "display": "Leucovorin 100 MG Injection"
        }
      ],
      "direct_transition": "Chemotherapy_Drugs_II"
    },
    "Chemotherapy_Drugs_II": {
      "type": "MedicationOrder",
      "target_encounter": "Chemotherapy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "RxNorm",
          "code": "575971",
          "display": "oxaliplatin 5 MG/ML [Eloxatin]"
        }
      ],
      "direct_transition": "Chemotherapy_Procedure"
    },
    "Chemotherapy_Procedure": {
      "type": "Procedure",
      "target_encounter": "Chemotherapy_Encounter",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "703423002",
          "display": "Combined chemotherapy and radiation therapy (procedure)"
        }
      ],
      "direct_transition": "End_Chemotherapy_Encounter"
    },
    "End_Chemotherapy_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Count_A_Chemo_Treatment"
    },
    "Count_A_Chemo_Treatment": {
      "type": "Counter",
      "action": "increment",
      "attribute": "cr_chemo_count",
      "direct_transition": "Chemotherapy_Treatment_Delay"
    },
    "Chemotherapy_Treatment_Delay": {
      "type": "Delay",
      "range": {
        "low": 28,
        "high": 35,
        "unit": "days"
      },
      "direct_transition": "Chemotherapy_Treatment_Path"
    },
    "Remission_Period": {
      "type": "Delay",
      "remarks": [
        "If the patient isn't going to die at a later date we give them some time to ",
        "go into remission following treatment. For those that achieve remission they ",
        "are returned back to the general pool of candidates for colorectal cancer."
      ],
      "range": {
        "low": 12,
        "high": 24,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Eventual_Death"
          },
          "transition": "Terminal"
        },
        {
          "transition": "Remission_Encounter"
        }
      ]
    },
    "Remission_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "colorectal_cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Colorectal_Cancer_CarePlan"
    },
    "End_Colorectal_Cancer_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "Colorectal_Cancer_CarePlan",
      "direct_transition": "End_Colorectal_Cancer"
    },
    "End_Colorectal_Cancer": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "colorectal_cancer",
      "direct_transition": "End_Remission_Encounter"
    },
    "End_Remission_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Colorectal_Cancer_Symptom3_Ends"
    },
    "Colorectal_Cancer_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Constipation",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Colorectal_Cancer_Symptom4_Ends"
    },
    "Colorectal_Cancer_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Cramping",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Colorectal_Cancer_Symptom5_Ends"
    },
    "Colorectal_Cancer_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Abdominal Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Colorectal_Cancer_Symptom6_Ends"
    },
    "Colorectal_Cancer_Symptom6_Ends": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Colorectal_Cancer_Symptom7_Ends"
    },
    "Colorectal_Cancer_Symptom7_Ends": {
      "type": "Symptom",
      "symptom": "Weight Loss",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptive_maintenance":{
  "name": "Contraceptive Maintenance",
  "remarks": [
    "Three types of contraceptives require periodic renewal to be effective: ",
    "1. 'iud' - requires replacement every 5-10 years ",
    "2. 'implant' - requires replacement every 3-4 years ",
    "3. 'injectable' - requires another injection every 3 months ",
    "Each of these contraceptives is initially implanted/injected by the prescribing ",
    "submodule. Subsequent renewal or removal of these contraceptives is handled ",
    "by this maintenance module.",
    "Contraceptive maintenance automatically cancelled if either: ",
    "1. 'pregnant' == true ",
    "2. 'contraceptive_type' == nil "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "transition": "Contraceptive_Type_Guard"
        }
      ]
    },
    "Clear_Contraceptive": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/clear_contraceptive",
      "direct_transition": "Contraceptive_Type_Guard"
    },
    "Contraceptive_Type_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Or",
        "conditions": [
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "iud"
          },
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "implant"
          },
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "injectable"
          }
        ]
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "iud"
          },
          "transition": "IUD_Maintenance"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "implant"
          },
          "transition": "Implant_Maintenance"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "injectable"
          },
          "transition": "Injectable_Maintenance"
        }
      ]
    },
    "IUD_Maintenance": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " IUD CONTRACEPTIVE MAINTENANCE                                        ",
        "======================================================================",
        "Allow module progression if the IUD's lifetime is up (~4 years) ",
        "or if the patient becomes pregnant."
      ],
      "allow": {
        "condition_type": "Or",
        "conditions": [
          {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "is nil"
          },
          {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Contraceptive_Type_Guard",
                  "within": {
                    "quantity": 5,
                    "unit": "years"
                  }
                }
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "IUD_Replacement",
                  "within": {
                    "quantity": 5,
                    "unit": "years"
                  }
                }
              }
            ]
          }
        ]
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "pregnant",
                "operator": "==",
                "value": true
              },
              {
                "condition_type": "Attribute",
                "attribute": "contraceptive_type",
                "operator": "is nil"
              }
            ]
          },
          "transition": "Remove_IUD_Encounter"
        },
        {
          "transition": "Renew_IUD_Encounter"
        }
      ]
    },
    "Renew_IUD_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "IUD_Replacement"
    },
    "IUD_Replacement": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46706006",
          "display": "Replacement of contraceptive intrauterine device"
        }
      ],
      "duration": {
        "low": 40,
        "high": 70,
        "unit": "minutes"
      },
      "direct_transition": "End_IUD_Replacement_Encounter"
    },
    "End_IUD_Replacement_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "IUD_Maintenance"
    },
    "Remove_IUD_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "IUD_Removal"
    },
    "IUD_Removal": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "68254000",
          "display": "Removal of intrauterine device"
        }
      ],
      "duration": {
        "low": 40,
        "high": 70,
        "unit": "minutes"
      },
      "direct_transition": "End_IUD_Removal_Encounter"
    },
    "End_IUD_Removal_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Clear_Contraceptive"
    },
    "Implant_Maintenance": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " IMPLANT CONTRACEPTIVE MAINTENANCE                                    ",
        "======================================================================",
        "Every 3-4 years the implant must be removed or replaced."
      ],
      "allow": {
        "condition_type": "Or",
        "conditions": [
          {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "is nil"
          },
          {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Contraceptive_Type_Guard",
                  "within": {
                    "quantity": 4,
                    "unit": "years"
                  }
                }
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Renew_Contraceptive_Implant",
                  "within": {
                    "quantity": 4,
                    "unit": "years"
                  }
                }
              }
            ]
          }
        ]
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "pregnant",
                "operator": "==",
                "value": true
              },
              {
                "condition_type": "Attribute",
                "attribute": "contraceptive_type",
                "operator": "is nil"
              }
            ]
          },
          "transition": "Remove_Implant_Encounter"
        },
        {
          "transition": "Renew_Implant_Encounter"
        }
      ]
    },
    "Renew_Implant_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "Renew_Contraceptive_Implant"
    },
    "Renew_Contraceptive_Implant": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "755621000000101",
          "display": "Replacement of subcutaneous contraceptive"
        }
      ],
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "direct_transition": "End_Renew_Implant_Encounter"
    },
    "End_Renew_Implant_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Implant_Maintenance"
    },
    "Remove_Implant_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "Remove_Implant"
    },
    "Remove_Implant": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "301807007",
          "display": "Removal of subcutaneous contraceptive"
        }
      ],
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "direct_transition": "End_Remove_Implant_Encounter"
    },
    "End_Remove_Implant_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Clear_Contraceptive"
    },
    "Injectable_Maintenance": {
      "type": "Guard",
      "remarks": [
        "======================================================================",
        " INJECTABLE CONTRACEPTIVE MAINTENANCE                                 ",
        "======================================================================",
        "Every 3 months an additional dose is given. If the age limit for the current ",
        "age bracket is reached, no more additional doses are given."
      ],
      "allow": {
        "condition_type": "Or",
        "conditions": [
          {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "is nil"
          },
          {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Contraceptive_Type_Guard",
                  "within": {
                    "quantity": 3,
                    "unit": "months"
                  }
                }
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Regular_Injection_Encounter",
                  "within": {
                    "quantity": 3,
                    "unit": "months"
                  }
                }
              }
            ]
          }
        ]
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "pregnant",
                "operator": "==",
                "value": true
              },
              {
                "condition_type": "Attribute",
                "attribute": "contraceptive_type",
                "operator": "is nil"
              }
            ]
          },
          "transition": "Clear_Contraceptive"
        },
        {
          "transition": "Regular_Injection_Encounter"
        }
      ]
    },
    "Regular_Injection_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "Regular_Contraceptive_Injection"
    },
    "Regular_Contraceptive_Injection": {
      "type": "Procedure",
      "duration": {
        "low": 10,
        "high": 20,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "76601001",
          "display": "Intramuscular injection"
        }
      ],
      "direct_transition": "End_Regular_Injection_Encounter"
    },
    "End_Regular_Injection_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Injectable_Maintenance"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/clear_contraceptive":{
  "name": "Clear Contraceptive",
  "remarks": [
    "This submodule ends any active contraceptive medication assigned to the ",
    "'contraceptive' attribute and clears the 'contraceptive_type' attribute ",
    "for reassignment."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Clear_Contraceptive_Med"
    },
    "Clear_Contraceptive_Med": {
      "type": "Simple",
      "remarks": [
        "If the 'contraceptive' attribute is currently set, the medication it ",
        "references will be active."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive",
            "operator": "is not nil"
          },
          "transition": "End_Contraceptive_Med"
        },
        {
          "transition": "Clear_Contraceptive_Type"
        }
      ]
    },
    "End_Contraceptive_Med": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "contraceptive",
      "direct_transition": "Clear_Contraceptive"
    },
    "Clear_Contraceptive": {
      "type": "SetAttribute",
      "attribute": "contraceptive",
      "direct_transition": "Clear_Contraceptive_Type"
    },
    "Clear_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/female_sterilization":{
  "name": "Female Sterilization",
  "remarks": [
    "This submodule performs a female sterilization procedure. This procedure ",
    "is not reversible."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Set_Contraceptive_Type"
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "sterilization",
      "direct_transition": "Consultation_Encounter"
    },
    "Consultation_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "End_Consultation"
    },
    "End_Consultation": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Procedure"
    },
    "Delay_For_Procedure": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Tubal_Ligation_Surgery_Encounter"
    },
    "Tubal_Ligation_Surgery_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305408004",
          "display": "Admission to surgical department"
        }
      ],
      "direct_transition": "Tubal_Ligation_Procedure"
    },
    "Tubal_Ligation_Procedure": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "287664005",
          "display": "Bilateral tubal ligation"
        }
      ],
      "duration": {
        "low": 2,
        "high": 3,
        "unit": "hours"
      },
      "direct_transition": "Become_Infertile"
    },
    "Become_Infertile": {
      "type": "SetAttribute",
      "attribute": "infertile",
      "value": true,
      "direct_transition": "Post_Surgery_Care"
    },
    "Post_Surgery_Care": {
      "type": "CarePlanStart",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "787301000000101",
          "display": "Surgery care management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183051005",
          "display": "Recommendation to rest"
        },
        {
          "system": "SNOMED-CT",
          "code": "243077000",
          "display": "Recommendation to limit sexual activity"
        }
      ],
      "direct_transition": "End_Surgery_Encounter"
    },
    "End_Surgery_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Recovery_Period"
    },
    "Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "End_Post_Surgery_Care"
    },
    "End_Post_Surgery_Care": {
      "type": "CarePlanEnd",
      "careplan": "Post_Surgery_Care",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/implant_contraceptive":{
  "name": "Implant Contraceptive",
  "remarks": [
    "This submodule prescribes a long-acting, implanted contraceptive if one is ",
    "available for the current year of the simulation. The first implanted ",
    "contraceptive was available in 1990, marketed as Norplant. Norplant was ",
    "discontinued in 2002 in favor of newer alternatives, but implants remain ",
    "available today.",
    "Implants must be readministered once every 3-4 years. The Contraceptive ",
    "Maintenance module handles that.",
    "Sources for historical availability: ",
    "http://www.ourbodiesourselves.org/health-info/a-brief-history-of-birth-control/",
    "http://www.pbs.org/wnet/need-to-know/health/a-brief-history-of-the-birth-control-pill/480/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 1991 ",
        "do not get implant contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1991
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "implant",
      "direct_transition": "Implant_Contraceptive_Encounter"
    },
    "Implant_Contraceptive_Encounter": {
      "type": "Encounter",
      "remarks": [
        "======================================================================",
        " NEW IMPLANT PRESCRIPTION                                             ",
        "======================================================================"
      ],
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Prescribe_Implant_Contraceptive"
    },
    "Prescribe_Implant_Contraceptive": {
      "type": "Simple",
      "remarks": [
        "Norplant was available in January 1991. The original production ended ",
        "in 2002, with supplies available until 2004-ish. Implanon became available ",
        "in 2006 and an improvement, Nexplanon, in 2011. Implanon was taken off the ",
        "market in 2012, so Nexplanon remains the only currently available implant ",
        "in the United States.",
        "While not *technically* historically accurate, the use of Norplant is stretched ",
        "until 2006 to maintain continuity."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2006
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Norplant"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2011
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Implanon"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2012
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Prescribe_Nexplanon"
            },
            {
              "distribution": 0.8,
              "transition": "Prescribe_Implanon"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Nexplanon"
            }
          ]
        }
      ]
    },
    "Prescribe_Norplant": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1366342",
          "display": "Levonorgestrel 0.00354 MG/HR [Norplant]"
        }
      ],
      "direct_transition": "Initial_Implant"
    },
    "Prescribe_Implanon": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "646250",
          "display": "Implanon 68 MG Drug Implant"
        }
      ],
      "direct_transition": "Initial_Implant"
    },
    "Prescribe_Nexplanon": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1111011",
          "display": "Nexplanon 68 MG Drug Implant"
        }
      ],
      "direct_transition": "Initial_Implant"
    },
    "Initial_Implant": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "169553002",
          "display": "Insertion of subcutaneous contraceptive"
        }
      ],
      "duration": {
        "low": 20,
        "high": 40,
        "unit": "minutes"
      },
      "direct_transition": "End_Initial_Encounter"
    },
    "End_Initial_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/injectable_contraceptive":{
  "name": "Injectable Contraceptive",
  "remarks": [
    "This submodule prescribes a long-acting, injectable contraceptive if one is ",
    "available for the current year of the simulation. The first injectable ",
    "contraceptive was available in 1992, marketed as Depo-Provera. Depo remains ",
    "the only available injectable option in the U.S.",
    "Injectables must be readministered once every 3 months. The Contraceptive ",
    "Maintenance module handles that.",
    "Sources for historical availability: ",
    "http://www.ourbodiesourselves.org/health-info/a-brief-history-of-birth-control/",
    "http://www.pbs.org/wnet/need-to-know/health/a-brief-history-of-the-birth-control-pill/480/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 1992 ",
        "do not get injectable contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1992
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "injectable",
      "direct_transition": "Injectable_Contraceptive_Encounter"
    },
    "Injectable_Contraceptive_Encounter": {
      "type": "Encounter",
      "remarks": [
        "======================================================================",
        " NEW PRESCRIPTION                                                     ",
        "======================================================================"
      ],
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Prescribe_Injectable_Contraceptive"
    },
    "Prescribe_Injectable_Contraceptive": {
      "type": "Simple",
      "remarks": [
        "Depo-Provera (150 mg/mL MPA) became available in 1992. A lower-dose, ",
        "subcutaneous version became available in Dec. 2004 as Depo-SubQ Provera ",
        "(104 mg/0.65 mL MPA)."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2005
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Depo_Provera"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.7,
              "transition": "Prescribe_Depo_Provera"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Depo_SubQ"
            }
          ]
        }
      ]
    },
    "Prescribe_Depo_Provera": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1000128",
          "display": "1 ML Depo-Provera 150 MG/ML Injection"
        }
      ],
      "direct_transition": "Initial_Injection_By_Physician"
    },
    "Prescribe_Depo_SubQ": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1000158",
          "display": "0.65 ML depo-subQ provera 160 MG/ML Prefilled Syringe"
        }
      ],
      "direct_transition": "Initial_Injection_By_Physician"
    },
    "Initial_Injection_By_Physician": {
      "type": "Procedure",
      "duration": {
        "low": 10,
        "high": 20,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "76601001",
          "display": "Intramuscular injection"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "End_Consultation_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/intrauterine_device":{
  "name": "Intrauterine Device",
  "remarks": [
    "This submodule prescribes an intrauterine device (IUD) for contraception.",
    "FDA approval of IUDs in the U.S. was in 1968. Early designs were flexible ",
    "thermoplastic. Copper IUDs were introduced in the 1970's. One IUD in particular ",
    "was problematic - the Dalkon Shield caused infections in 200k women and 10 ",
    "deaths. It was discontinued in 1974. This caused widespread abandonment and ",
    "distrust of IUDs in the 1980's.",
    "Modern IUDs are again becoming popular. They are copper or combine low-dose ",
    "hormones with plastic.",
    "IUDs must be removed or replaced every 5-10 years. This is handled by the ",
    "Contraceptive Maintenance module.",
    "Sources for availability: ",
    "https://www.wired.com/2011/07/ff_iud/",
    "http://kff.org/womens-health-policy/fact-sheet/intrauterine-devices-iuds-access-for-women-in-the-u-s/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 1968 ",
        "do not get IUDs."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1968
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "iud",
      "direct_transition": "IUD_Consultation_Encounter"
    },
    "IUD_Consultation_Encounter": {
      "type": "Encounter",
      "remarks": [
        "======================================================================",
        " NEW PRESCRIPTION                                                     ",
        "======================================================================"
      ],
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Prescribe_IUD"
    },
    "Prescribe_IUD": {
      "type": "Simple",
      "remarks": [
        "Unfortunately, RxNorm codes are not available for: ",
        "Lippes Lopp, Safe-T-Coil, Copper 7, Dalkon Shield, or Paragard ",
        "However, the contraceptive_type attribute remains set and the ",
        "incidence of pregnancy will reflect that the woman is using an IUD."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1971
          },
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Prescribe_Lippes_Loop"
            },
            {
              "distribution": 0.5,
              "transition": "Prescribe_Safe_T_Coil"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1975
          },
          "distributions": [
            {
              "distribution": 0.34,
              "transition": "Prescribe_Lippes_Loop"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Safe_T_Coil"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Dalkon_Shield"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1986
          },
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Prescribe_Lippes_Loop"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Safe_T_Coil"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Copper_7"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2001
          },
          "remarks": [
            "Because of the Dalkon Shield scare, all IUDs but one (Paragard) ",
            "were taken off the market by 1986."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Paragard"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2015
          },
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Prescribe_Paragard"
            },
            {
              "distribution": 0.6,
              "transition": "Prescribe_Mirena"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2016
          },
          "remarks": [
            "Hormonal, plastic IUDs were introduced in 2001."
          ],
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Prescribe_Paragard"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Mirena"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Liletta"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.25,
              "transition": "Prescribe_Paragard"
            },
            {
              "distribution": 0.25,
              "transition": "Prescribe_Mirena"
            },
            {
              "distribution": 0.25,
              "transition": "Prescribe_Liletta"
            },
            {
              "distribution": 0.25,
              "transition": "Prescribe_Kyleena"
            }
          ]
        }
      ]
    },
    "Prescribe_Lippes_Loop": {
      "type": "Simple",
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Safe_T_Coil": {
      "type": "Simple",
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Dalkon_Shield": {
      "type": "Simple",
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Copper_7": {
      "type": "Simple",
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Paragard": {
      "type": "Simple",
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Mirena": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "807283",
          "display": "Mirena 52 MG Intrauterine System"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Liletta": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1605257",
          "display": "Liletta 52 MG Intrauterine System"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "Prescribe_Kyleena": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1856546",
          "display": "Kyleena 19.5 MG Intrauterine System"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "End_Consultation_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_IUD_Insertion"
    },
    "Delay_For_IUD_Insertion": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 5,
        "unit": "days"
      },
      "direct_transition": "Initial_IUD_Insertion_Encounter"
    },
    "Initial_IUD_Insertion_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "IUD_Insertion"
    },
    "IUD_Insertion": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "65200003",
          "display": "Insertion of intrauterine contraceptive device"
        }
      ],
      "duration": {
        "low": 40,
        "high": 70,
        "unit": "minutes"
      },
      "direct_transition": "End_IUD_Insertion_Encounter"
    },
    "End_IUD_Insertion_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/male_sterilization":{
  "name": "Male Sterilization",
  "remarks": [
    "This submodule performs a male sterilization (vasectomy) procedure."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Consultation_Encounter"
    },
    "Consultation_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "End_Consultation"
    },
    "End_Consultation": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Procedure"
    },
    "Delay_For_Procedure": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Vasectomy_Encounter"
    },
    "Vasectomy_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "remarks": [
        "Male vasectomies are typically performed right in the doctor's office. ",
        "Unlike female sterilization, male sterilization is a relatively simple ",
        "procedure."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "308335008",
          "display": "Patient encounter procedure"
        }
      ],
      "direct_transition": "Vasectomy"
    },
    "Vasectomy": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "22523008",
          "display": "Vasectomy"
        }
      ],
      "duration": {
        "low": 1,
        "high": 2,
        "unit": "hours"
      },
      "direct_transition": "Become_Infertile"
    },
    "Become_Infertile": {
      "type": "SetAttribute",
      "attribute": "infertile",
      "value": true,
      "direct_transition": "Post_Procedure_Care"
    },
    "Post_Procedure_Care": {
      "type": "CarePlanStart",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "787301000000101",
          "display": "Surgery care management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183051005",
          "display": "Recommendation to rest"
        },
        {
          "system": "SNOMED-CT",
          "code": "243077000",
          "display": "Recommendation to limit sexual activity"
        }
      ],
      "direct_transition": "End_Vasectomy_Encounter"
    },
    "End_Vasectomy_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Recovery"
    },
    "Delay_For_Recovery": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 2,
        "unit": "weeks"
      },
      "direct_transition": "End_Vasectomy_Care"
    },
    "End_Vasectomy_Care": {
      "type": "CarePlanEnd",
      "careplan": "Post_Procedure_Care",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/oral_contraceptive":{
  "name": "Oral Contraceptive",
  "remarks": [
    "This module prescribes an oral, hormonal contraceptive if one is available ",
    "for the current year of the simulation. There are 2 classes of oral contraceptives: ",
    "1. Combination (estrogen, progestin), either monophasic and triphasic ",
    "2. Minipill (progestin-only)",
    "Combination pills may be either monophasic (same dosage, all month long) or triphasic ",
    "(dosage increases progressively throughout the month). Potential side-effects of oral ",
    "contraceptives include nausea, breast tenderness, mood swings, headaches, weight gain, ",
    "spotting, and decreased libido. None of these side-effects are currently modeled.",
    "Smoking, especially over the age of 35, significantly increases the risk of: ",
    "1. Blood clots (1.6x with minipill, 2x with estrogen) ",
    "2. Myocardial Infarction (1.6x) ",
    "3. Ischemic Stroke (1.7x) ",
    "Source: https://www.ncbi.nlm.nih.gov/pubmedhealth/PMH0079002/",
    "No changes were made to the cardiovascular disease module.",
    "Minipill (progestin-only) contraceptives are safe for smokers, those at risk of ",
    "heart disease, and new mothers who are breastfeeding. They carry a slightly elevated ",
    "risk of ectopic pregnancy, are less effective than combination pills (91 - 99% effective), ",
    "and must be taken very consistently to be effective. Source: ",
    "http://www.feministcenter.org/en/health-wellness-services/comprehensive-gyn/birth-control-options/birth-control-information/101-mini-pills",
    "The majority of women taking oral contraceptives take the combination pill.",
    "Sources for historical availability: ",
    "http://www.ourbodiesourselves.org/health-info/a-brief-history-of-birth-control/",
    "http://www.pbs.org/wnet/need-to-know/health/a-brief-history-of-the-birth-control-pill/480/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 1960 ",
        "do not get oral contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1960
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "pill",
      "direct_transition": "Encounter_For_Oral_Contraceptive"
    },
    "Encounter_For_Oral_Contraceptive": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Combination_Or_Minipill"
    },
    "Combination_Or_Minipill": {
      "type": "Simple",
      "remarks": [
        "If the patient has a high BMI (>30), was recently pregnant (w/in 6 months), smokes, ",
        "or has high blood pressure (systolic > 130) the minipill is prescribed. Otherwise, a ",
        "combination pill is prescribed.",
        "TODO: Check if the patient was recently pregnant. We need a 'Prior Condition', or ",
        "'Prior Event' condition to check for this. If the mother is breastfeeding, the ",
        "combination pill should not be used."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "smoker",
                "operator": "==",
                "value": true
              },
              {
                "condition_type": "Vital Sign",
                "vital_sign": "BMI",
                "operator": ">",
                "value": 30
              },
              {
                "condition_type": "Vital Sign",
                "vital_sign": "Systolic Blood Pressure",
                "operator": ">",
                "value": 130
              }
            ]
          },
          "transition": "Prescribe_Minipill"
        },
        {
          "transition": "Prescribe_Combination_Pill"
        }
      ]
    },
    "Prescribe_Minipill": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MINIPILL                                                             ",
        "======================================================================",
        "What type of pill is prescribed (if any) depends on the current year ",
        "of the simulation."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2002
          },
          "remarks": [
            "If before 2002, the patient instead gets prescribed a combination pill.",
            "This will have averse affects on that patient's health if they meet one ",
            "of the conditions above."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Combination_Pill"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2003
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Camila"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Prescribe_Camila"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Errin"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Jolivette"
            }
          ]
        }
      ]
    },
    "Prescribe_Camila": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "748962",
          "display": "Camila 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Errin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "831533",
          "display": "Errin 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Jolivette": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "757594",
          "display": "Jolivette 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Combination_Pill": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " COMBINATION PILL                                                     ",
        "======================================================================",
        "What type of pill is prescribed (if any) depends on the current year ",
        "of the simulation."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1974
          },
          "remarks": [
            "Enovid got FDA approval in May, 1960 for contraceptive use.",
            "10mg mestranol/noretynodrel, high-dose hormone pill."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Enovid"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1988
          },
          "remarks": [
            "Use of the high dose 10mg mestranol/noretynodrel (Enovid) steadily grew. ",
            "The first documented case of blood clots (likely in a smoker), were in ",
            "1961. Norinyl (norethindrone-ethinyl estradiol) was introduced in 1974."
          ],
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Prescribe_Enovid"
            },
            {
              "distribution": 0.5,
              "transition": "Prescribe_Norinyl"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1989
          },
          "remarks": [
            "Enovid was taken off the market in 1988 in favor of low-dose alternatives."
          ],
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Norinyl"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1998
          },
          "remarks": [
            "Ortho-Tri Cyclen was introduced in 1989."
          ],
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Prescribe_Norinyl"
            },
            {
              "distribution": 0.6,
              "transition": "Prescribe_Ortho_Tri_Cyclen"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2003
          },
          "remarks": [
            "Estrostep introduced in 1997, Ortho-Novum 1998 (same composition as Norinyl)."
          ],
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Prescribe_Norinyl"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Ortho_Tri_Cyclen"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Estrostep"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2010
          },
          "remarks": [
            "Trinessa and Seasonique (2003), Yaz (2006)."
          ],
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Ortho_Tri_Cyclen"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Estrostep"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Trinessa"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Seasonique"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Yaz"
            }
          ]
        },
        {
          "remarks": [
            "Natazia (2010), Levora (2016)."
          ],
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Trinessa"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Seasonique"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Yaz"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Natazia"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Levora"
            }
          ]
        }
      ]
    },
    "Prescribe_Enovid": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "235389",
          "display": "Mestranol / Norethynodrel [Enovid]"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Norinyl": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "749882",
          "display": "Norinyl 1+50 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Estrostep": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1359133",
          "display": "Estrostep Fe 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Ortho_Tri_Cyclen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "749785",
          "display": "Ortho Tri-Cyclen 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Trinessa": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "751905",
          "display": "Trinessa 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Seasonique": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "remarks": [
        "These are long-term, low-dose hormones that cause only 4 menstruations per year."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "749762",
          "display": "Seasonique 91 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Yaz": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "748856",
          "display": "Yaz 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Natazia": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "978950",
          "display": "Natazia 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Levora": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "748879",
          "display": "Levora 0.15/30 28 Day Pack"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/patch_contraceptive":{
  "name": "Patch Contraceptive",
  "remarks": [
    "This module prescribes a hormonal patch if one is available ",
    "for the current year of the simulation.",
    "Sources for historical availability: ",
    "http://www.ourbodiesourselves.org/health-info/a-brief-history-of-birth-control/",
    "http://www.pbs.org/wnet/need-to-know/health/a-brief-history-of-the-birth-control-pill/480/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 2002 ",
        "do not get patch contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2002
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "patch",
      "direct_transition": "Patch_Contraceptive_Consultation"
    },
    "Patch_Contraceptive_Consultation": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Prescribe_Xulane"
    },
    "Prescribe_Xulane": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1536586",
          "display": "Xulane 150/35 MCG/Day Weekly Transdermal System"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "End_Consultation_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives/ring_contraceptive":{
  "name": "Vaginal Ring Contraceptive",
  "remarks": [
    "This submodule prescribes a hormonal contraceptive ring if one ",
    "is available for the current year of the simulation. The ring is ",
    "inserted into the vagina and may be removed at will, or for short ",
    "periods of time during sexual intercourse."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Males, pregnant females, and those arriving here before the year 2001 ",
        "do not get ring contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2001
          },
          "transition": "Terminal"
        },
        {
          "transition": "Set_Contraceptive_Type"
        }
      ]
    },
    "Set_Contraceptive_Type": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "ring",
      "direct_transition": "Ring_Contraceptive_Consultation"
    },
    "Ring_Contraceptive_Consultation": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698314001",
          "display": "Consultation for treatment"
        }
      ],
      "direct_transition": "Prescribe_Nuvaring"
    },
    "Prescribe_Nuvaring": {
      "type": "MedicationOrder",
      "assign_to_attribute": "contraceptive",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1367439",
          "display": "NuvaRing 0.12/0.015 MG per 24HR 21 Day Vaginal Ring"
        }
      ],
      "direct_transition": "End_Consultation_Encounter"
    },
    "End_Consultation_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"contraceptives":{
  "name": "Contraceptives",
  "remarks": [
    "This module prescribes many types of contraceptives to all potentially reproductive ",
    "age groups. The availablility of different medicines and methods is historically ",
    "accurate by year, based on these articles: ",
    "http://www.ourbodiesourselves.org/health-info/a-brief-history-of-birth-control/",
    "http://www.pbs.org/wnet/need-to-know/health/a-brief-history-of-the-birth-control-pill/480/",
    "Hormonal contraceptives cause a slightly elevated risk of blood clots, heart attack, and ",
    "stroke (1.6x) in females, especially in heavy smokers over the age of 35. No change was ",
    "made to the existing cardiovascular disease module.",
    "While male sterilization is used as a contraceptive method (8%), it's not modeled here. ",
    "Instead, the 8% is folded into the female sterilization incidence. However, 6% of males ",
    "age 30 - 55 are selected for sterilization to create accurate male patient records.",
    "The use of a diaphragm and emergency contraceptives (e.g. Plan B) is not modeled here. ",
    "Diaphragms are not modeled due to a lack of usage data and popularity, and emergency ",
    "contraceptives are out-of-scope."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Delay_Until_Reproductive_Age"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Select_For_Male_Sterilization"
        }
      ]
    },
    "Delay_Until_Reproductive_Age": {
      "type": "Delay",
      "exact": {
        "quantity": 14,
        "unit": "years"
      },
      "direct_transition": "Female_Contraceptive_Use"
    },
    "Select_For_Male_Sterilization": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MALE STERLIZATION                                                    ",
        "======================================================================",
        "Male sterilization accounts for 8% of all contraceptive use, predominantly ",
        "in older males. However, this does not mean 8% of all males are sterilized. ",
        "According to the NIH, 6% of males have had a vasectomy. Source: ",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2784091/",
        "The percentage of males seeking vasectomies has remained approximately the ",
        "same for the last 40 years. Vasectomies were first used as a form of ",
        "contraceptive starting around WWII."
      ],
      "distributed_transition": [
        {
          "distribution": 0.06,
          "transition": "Delay_For_Male_Sterilization"
        },
        {
          "distribution": 0.94,
          "transition": "Terminal"
        }
      ]
    },
    "Delay_For_Male_Sterilization": {
      "type": "Delay",
      "range": {
        "low": 30,
        "high": 55,
        "unit": "years"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 1945
          },
          "transition": "Male_Sterilization_Procedure"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Male_Sterilization_Procedure": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/male_sterilization",
      "direct_transition": "Terminal"
    },
    "Female_Contraceptive_Use": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " FEMALE CONTRACEPTIVE USE                                             ",
        "======================================================================",
        "Female use of contraceptives is recomputed 3 times in a patient's life, ",
        "once for each major reproductive age bracket: ",
        "1. Young (teen/20's) contraceptive users, age 14 - 24 ",
        "2. Mid-age contraceptive users, age 25 - 34 ",
        "3. Mature contraceptive users, age 35+ (limited by menopause at age 50) ",
        "Combined with sexual_activity, this yields a full range of contraceptive ",
        "users and outcomes, from those who never use contraceptives (and who likely ",
        "have several children as a result), to lifetime contraceptive users with ",
        "no children.",
        "Whenever a woman becomes pregnancy her current contraceptive method is stopped. ",
        "After the pregnancy terminates, she is re-routed here to re-up her contraceptive ",
        "(or not)."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 25,
            "unit": "years"
          },
          "transition": "Young_Contraceptive_Use"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 35,
            "unit": "years"
          },
          "transition": "Mid_Contraceptive_Use"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 50,
            "unit": "years"
          },
          "transition": "Mature_Contraceptive_Use"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Young_Contraceptive_Use": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " TEEN/20'S CONTRACEPTIVE USE                                          ",
        "======================================================================",
        "18% of teens do not use any contraceptive method. The majority use a ",
        "short-term solution such as withdrawal, condoms, or the pill. A select ",
        "few use an IUD or long-acting contraceptive like an implant. A statistically ",
        "insignificant number use sterilization, so it's omitted for this age group. ",
        "Source: https://www.guttmacher.org/fact-sheet/contraceptive-use-united-states",
        "There is significant overlap between those using a condom and those ",
        "using a hormonal method (e.g. pill, patch, ring). The incidence of ",
        "condom use below therefore represents those using ONLY a condom."
      ],
      "distributed_transition": [
        {
          "distribution": 0.35,
          "transition": "Using_Oral_Contraceptive"
        },
        {
          "distribution": 0.2,
          "transition": "Using_Withdrawal"
        },
        {
          "distribution": 0.18,
          "transition": "Using_No_Contraceptive"
        },
        {
          "distribution": 0.18,
          "transition": "Using_Condom_Only"
        },
        {
          "distribution": 0.03,
          "transition": "Using_Injectable"
        },
        {
          "distribution": 0.02,
          "transition": "Using_Ring"
        },
        {
          "distribution": 0.02,
          "transition": "Using_IUD"
        },
        {
          "distribution": 0.01,
          "transition": "Using_Implant"
        },
        {
          "distribution": 0.01,
          "transition": "Using_Patch"
        }
      ]
    },
    "Mid_Contraceptive_Use": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MID-LIFE CONTRACEPTIVE USE                                           ",
        "======================================================================",
        "In the 25 - 35 age bracket, more women are intentionally trying to get ",
        "pregnant as they start families. For those not trying to become pregnant, ",
        "long-acting contraceptives or sterilization are favored. Source: ",
        "https://www.cdc.gov/nchs/data/databriefs/db173.pdf"
      ],
      "distributed_transition": [
        {
          "distribution": 0.283,
          "transition": "Using_No_Contraceptive"
        },
        {
          "distribution": 0.169,
          "transition": "Using_Oral_Contraceptive"
        },
        {
          "distribution": 0.146,
          "transition": "Using_Sterilization"
        },
        {
          "distribution": 0.115,
          "transition": "Using_Condom_Only"
        },
        {
          "distribution": 0.099,
          "transition": "Using_Withdrawal"
        },
        {
          "distribution": 0.07,
          "transition": "Using_IUD"
        },
        {
          "distribution": 0.047,
          "transition": "Using_Implant"
        },
        {
          "distribution": 0.045,
          "transition": "Using_Injectable"
        },
        {
          "distribution": 0.016,
          "transition": "Using_Ring"
        },
        {
          "distribution": 0.01,
          "transition": "Using_Patch"
        }
      ]
    },
    "Mature_Contraceptive_Use": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " MATURE CONTRACEPTIVE USE                                             ",
        "======================================================================",
        "Most women in this age bracket are done having children and are seeking ",
        "a long-term or permanent solution. The highest percentage of sterilization ",
        "is in this category. (Again, note that 8% of the sterilization incidence ",
        "in this category is male sterilization folded into female)."
      ],
      "distributed_transition": [
        {
          "distribution": 0.39,
          "transition": "Using_Sterilization"
        },
        {
          "distribution": 0.209,
          "transition": "Using_Oral_Contraceptive"
        },
        {
          "distribution": 0.113,
          "transition": "Using_Condom_Only"
        },
        {
          "distribution": 0.052,
          "transition": "Using_No_Contraceptive"
        },
        {
          "distribution": 0.048,
          "transition": "Using_Withdrawal"
        },
        {
          "distribution": 0.07,
          "transition": "Using_IUD"
        },
        {
          "distribution": 0.047,
          "transition": "Using_Implant"
        },
        {
          "distribution": 0.045,
          "transition": "Using_Injectable"
        },
        {
          "distribution": 0.016,
          "transition": "Using_Ring"
        },
        {
          "distribution": 0.01,
          "transition": "Using_Patch"
        }
      ]
    },
    "Using_No_Contraceptive": {
      "type": "SetAttribute",
      "remarks": [
        "======================================================================",
        " CONTRACEPTIVE PRESCRIPTIONS                                          ",
        "======================================================================",
        "These contraceptive prescriptions do not require maintenance. Fire and forget."
      ],
      "attribute": "contraceptive_type",
      "value": "none",
      "direct_transition": "Route_To_Guard"
    },
    "Using_Withdrawal": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "withdrawal",
      "direct_transition": "Route_To_Guard"
    },
    "Using_Condom_Only": {
      "type": "SetAttribute",
      "attribute": "contraceptive_type",
      "value": "condom",
      "direct_transition": "Route_To_Guard"
    },
    "Using_Oral_Contraceptive": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/oral_contraceptive",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Using_Sterilization": {
      "type": "Simple",
      "remarks": [
        "This is the combination male-female sterilization incidence.",
        "While only female patients are routed to this state, a portion ",
        "are identified as using sterilization as a contraceptive method ",
        "even though they are not given the sterilization procedure.",
        "The ratio of female:male sterilization is 3:1.",
        "NOTE: Only do this if age is at a transition year to avoid resampling after pregnancy.",
        "  Otherwise, go back to Female_Contraceptive_Use and sample again."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": "==",
                "quantity": 25,
                "unit": "years"
              },
              {
                "condition_type": "Age",
                "operator": "==",
                "quantity": 35,
                "unit": "years"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.75,
              "transition": "Using_Female_Sterilization"
            },
            {
              "distribution": 0.25,
              "transition": "Using_Male_Sterilization"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Female_Contraceptive_Use"
            }
          ]
        }
      ]
    },
    "Using_Male_Sterilization": {
      "type": "SetAttribute",
      "remarks": [
        "No female sterilization procedure is performed in this case."
      ],
      "attribute": "contraceptive_type",
      "value": "sterilization",
      "direct_transition": "Route_To_Guard"
    },
    "Using_Female_Sterilization": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/female_sterilization",
      "direct_transition": "Terminal"
    },
    "Using_Ring": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/ring_contraceptive",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Using_Patch": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/patch_contraceptive",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Using_IUD": {
      "type": "CallSubmodule",
      "remarks": [
        "======================================================================",
        " CONTRACEPTIVES REQUIRING MAINTENANCE                                 ",
        "======================================================================",
        "IUDs, implants, and injectables require periodic maintenance during a ",
        "given age bracket. IUDs must be replaced every 5-10 years, implants every ",
        "3 years, and injectables every 3 months. Maintenance is handled internally ",
        "within the submodules.",
        "These submodules are also 'self guarded', meaning they do not need the ",
        "regular age guards to ensure the correct timing for the next age bracket ",
        "(since they do so internally)."
      ],
      "submodule": "contraceptives/intrauterine_device",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Using_Implant": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/implant_contraceptive",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Using_Injectable": {
      "type": "CallSubmodule",
      "submodule": "contraceptives/injectable_contraceptive",
      "direct_transition": "Contraceptive_Prescribed?"
    },
    "Contraceptive_Prescribed?": {
      "type": "Simple",
      "remarks": [
        "If a contraceptive wasn't prescribed by the submodule (for example, because ",
        "none was available for the current year of the simulation) both contraceptive ",
        "attributes will be nill. ",
        "Since no contraceptive was prescribed, default to the historically avaialable ",
        "set of contraceptives."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "contraceptive",
                "operator": "is nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "contraceptive_type",
                "operator": "is nil"
              }
            ]
          },
          "transition": "Historical_Contraceptive_Use"
        },
        {
          "transition": "Route_To_Guard"
        }
      ]
    },
    "Historical_Contraceptive_Use": {
      "type": "Simple",
      "remarks": [
        "These were available methods prior to the 1960's."
      ],
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Using_No_Contraceptive"
        },
        {
          "distribution": 0.4,
          "transition": "Using_Withdrawal"
        },
        {
          "distribution": 0.4,
          "transition": "Using_Condom_Only"
        }
      ]
    },
    "Route_To_Guard": {
      "exact": {
        "quantity": 12,
        "unit": "months"
      },
      "type": "Delay",
      "direct_transition": "Reset_Contraceptive_Use",
      "remarks": [
        "Using an annual delay causes resampling of contraception more frequently",
        "and distributes the babies more evenly across the female population"
      ]
    },
    "Reset_Contraceptive_Use": {
      "type": "CallSubmodule",
      "remarks": [
        "Prior to setting a new contraceptive, the previous contraceptive ",
        "method is cleared."
      ],
      "submodule": "contraceptives/clear_contraceptive",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Pregnant_Guard"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 50,
            "unit": "years"
          },
          "transition": "Menopause_Reached"
        },
        {
          "transition": "Female_Contraceptive_Use"
        }
      ]
    },
    "Pregnant_Guard": {
      "type": "Guard",
      "remarks": [
        "Once a female is no longer pregnant, she will re-select a contraceptive type."
      ],
      "allow": {
        "condition_type": "Attribute",
        "attribute": "pregnant",
        "operator": "==",
        "value": false
      },
      "direct_transition": "Female_Contraceptive_Use"
    },
    "Menopause_Reached": {
      "type": "Simple",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"copd":{
  "name": "COPD",
  "remarks": [
    "COPD stands for Chronic Obstructive Pulmonary Disease",
    "COPD is a blanket term for 2 types of lung diseases: ",
    "Chronic Bronchitis (inflammation of bronchi) and Emphysema (damage to alveoli)",
    "2011 prevalence stats: http://www.cdc.gov/mmwr/preview/mmwrhtml/mm6146a2.htm?s_cid=mm6146a2_w",
    "Some #s that stand out: MA overall % = 5.4%,",
    "By age (US overall) 18-44 = 3.2%, 45-54 = 6.6%, 55-64 = 9.2%, 65-74 = 12.1%, 75+ = 11.6%",
    "By education (US) some HS or less = 9.5%, HS = 6.8%, some college or more = 4.6%",
    "By income (US) <25k = 9.9%, <50k = 5.7%, <75k = 4.2%, >75k = 2.8%",
    "By whether they ever had asthma: Yes = 20.3%, No = 3.8%",
    "The National Health Interview Survey reports the prevalence of emphysema",
    "at 18 cases per 1000 persons and chronic bronchitis at 34 cases per 1000 persons",
    "The term COPD was first used in the 1960s https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2706597/ ",
    "the terms bronchitis and emphysema have been around longer"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Age_Guard"
    },
    "Age_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Age",
        "operator": ">=",
        "quantity": 18,
        "unit": "years"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          },
          "transition": "Potential_COPD_Smoker"
        },
        {
          "transition": "Potential_COPD_Nonsmoker"
        }
      ]
    },
    "Potential_COPD_Nonsmoker": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "remarks": [
        "the key cause of both variants of COPD is smoking; prevalence of COPD among nonsmokers is not well-defined",
        "per https://www.ncbi.nlm.nih.gov/pubmed/22498109 we use 3.5% prevalence (lifetime) among non-smokers",
        "assuming a 60 yr lifespan (starting at age 18), we take the yearly incidence to be .05% split between emphysema and bronchitis"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          },
          "transition": "Potential_COPD_Smoker"
        },
        {
          "distributions": [
            {
              "distribution": 0.0003,
              "transition": "Emphysema"
            },
            {
              "distribution": 0.0002,
              "transition": "Chronic_Bronchitis"
            },
            {
              "distribution": 0.9995,
              "transition": "Potential_COPD_Nonsmoker"
            }
          ]
        }
      ]
    },
    "Potential_COPD_Smoker": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "remarks": [
        "the key cause of both variants of COPD is smoking. ",
        "15-20% of 1pack/day smokers develop COPD, 25% of 2 pack/day",
        "http://emedicine.medscape.com/article/298283-overview",
        "we assume that roughly 20% of smokers will get COPD in their lifetime",
        "we break this down further by Socioeconomic status"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "Low"
          },
          "distributions": [
            {
              "distribution": 0.008,
              "transition": "Emphysema"
            },
            {
              "distribution": 0.004,
              "transition": "Chronic_Bronchitis"
            },
            {
              "distribution": 0.987,
              "transition": "Potential_COPD_Smoker"
            }
          ],
          "remarks": [
            "people of low SES are the most likely to get COPD",
            "by education or income, ~10% of all people of low SES get COPD",
            "this is ~2x the rate of the general population, so we assume that ~40% of low SES smokers will get COPD",
            "assuming a reduced 40 yr lifespan (starting at age 18), we take the yearly incidence to be 1.2%",
            "leaning toward emphysema because emphysema can be worsened by poor air quality (occupational hazards)"
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "Middle"
          },
          "distributions": [
            {
              "distribution": 0.004,
              "transition": "Emphysema"
            },
            {
              "distribution": 0.004,
              "transition": "Chronic_Bronchitis"
            },
            {
              "distribution": 0.992,
              "transition": "Potential_COPD_Smoker"
            }
          ],
          "remarks": [
            "people of middle SES are representative of the population as a whole",
            "~5.5% of people overall get COPD, so we assume 20% of middle SES smokers will get COPD",
            "assuming a reduced 40 yr lifespan (starting at age 18), we take the yearly incidence to be .8%"
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "High"
          },
          "distributions": [
            {
              "distribution": 0.0018,
              "transition": "Emphysema"
            },
            {
              "distribution": 0.0022,
              "transition": "Chronic_Bronchitis"
            },
            {
              "distribution": 0.996,
              "transition": "Potential_COPD_Smoker"
            }
          ],
          "remarks": [
            "people of high SES are the least likely to get COPD",
            "by income, < 3% of people of high SES get COPD, which is about 1/2 the rate of the general pop",
            "we assume that 10% of high SES smokers will get COPD",
            "assuming a reduced 40 yr lifespan (starting at age 18), we take the yearly incidence to be .4%",
            "leaning toward bronchitis (to offset the high emphysema of low SES)"
          ]
        }
      ]
    },
    "Emphysema": {
      "type": "ConditionOnset",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "87433001",
          "display": "Pulmonary emphysema (disorder)"
        }
      ],
      "direct_transition": "Emphysema_Symptom1"
    },
    "Chronic_Bronchitis": {
      "type": "ConditionOnset",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185086009",
          "display": "Chronic obstructive bronchitis (disorder)"
        }
      ],
      "direct_transition": "Bronchitis_Symptom1"
    },
    "Emphysema_Symptom1": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "range": {
        "low": 50,
        "high": 550
      },
      "direct_transition": "Emphysema_Symptom2"
    },
    "Emphysema_Symptom2": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 150
      },
      "direct_transition": "Common_Symptom1"
    },
    "Bronchitis_Symptom1": {
      "type": "Symptom",
      "symptom": "Shortness of Breath",
      "range": {
        "low": 0,
        "high": 250
      },
      "direct_transition": "Bronchitis_Symptom2"
    },
    "Bronchitis_Symptom2": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 150,
        "high": 250
      },
      "direct_transition": "Common_Symptom1"
    },
    "Common_Symptom1": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 70,
        "high": 100
      },
      "direct_transition": "Common_Symptom2"
    },
    "Common_Symptom2": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 70,
        "high": 100
      },
      "direct_transition": "Common_Symptom3"
    },
    "Common_Symptom3": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 70,
        "high": 100
      },
      "direct_transition": "DiagnosisEncounter"
    },
    "DiagnosisEncounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Initial_FEV_Test"
    },
    "Initial_FEV_Test": {
      "type": "Procedure",
      "target_encounter": "DiagnosisEncounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "127783003",
          "display": "Spirometry (procedure)"
        }
      ],
      "direct_transition": "Initial_FEV_Result"
    },
    "Initial_FEV_Result": {
      "type": "Observation",
      "category": "procedure",
      "codes": [
        {
          "system": "LOINC",
          "code": "19926-5",
          "display": "FEV1/​FVC"
        }
      ],
      "range": {
        "low": 45,
        "high": 81
      },
      "remarks": [
        "early diagnosis for COPD is the exception not the rule. assume that most people will be stage 2 at diagnosis"
      ],
      "unit": "%",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          },
          "transition": "Smoker_CarePlan"
        },
        {
          "transition": "Nonsmoker_CarePlan"
        }
      ]
    },
    "Nonsmoker_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "DiagnosisEncounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "412776001",
          "display": "Chronic obstructive pulmonary disease clinical management plan"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "229065009",
          "display": "Exercise therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "15081005",
          "display": "Pulmonary rehabilitation (regime/therapy)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "Smoker_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "DiagnosisEncounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "412776001",
          "display": "Chronic obstructive pulmonary disease clinical management plan"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "710081004",
          "display": "Smoking cessation therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "426990007",
          "display": "Home oxygen therapy (procedure)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Living_with_COPD"
    },
    "Living_with_COPD": {
      "type": "Simple",
      "remarks": [
        "Stopping smoking, even after a COPD diagnosis, will increase expected lifespan",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2672796/",
        "note that these states do not use a delay and instead use the inherent delay of wellness encounters"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          },
          "transition": "Living_with_COPD_Active_Smoker"
        },
        {
          "transition": "Living_with_COPD_Nonsmoker"
        }
      ]
    },
    "Living_with_COPD_Active_Smoker": {
      "type": "Simple",
      "remarks": [
        "transition %s are based on data from https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2672796/",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2672796/table/t4-copd-4-137/"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 80
          },
          "remarks": [
            "people with an FEV1 of >= 80% are in the 'Mild' or 'At Risk' stage of COPD",
            "Life expectancy of someone with stage 1 copd can be as high as 18 years",
            "we'll assume that people will transition to later stages before dying"
          ],
          "transition": "COPD_Followup_Encounter"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 50
          },
          "distributions": [
            {
              "distribution": 0.9576,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.0424,
              "transition": "Death"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 30
          },
          "remarks": [
            "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2672796/table/t4-copd-4-137/ doesn't distinguish between stages 3 + 4",
            "assume stage 3 has lower mortality and stage 4 has higher"
          ],
          "distributions": [
            {
              "distribution": 0.94,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.06,
              "transition": "Death"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": "<",
            "value": 30
          },
          "distributions": [
            {
              "distribution": 0.92,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.08,
              "transition": "Death"
            }
          ]
        }
      ]
    },
    "Living_with_COPD_Nonsmoker": {
      "type": "Simple",
      "remarks": [
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2672796/table/t4-copd-4-137/",
        "using the #s for never smokers"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 80
          },
          "transition": "COPD_Followup_Encounter"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 50
          },
          "distributions": [
            {
              "distribution": 0.99,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.01,
              "transition": "Death"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 30
          },
          "distributions": [
            {
              "distribution": 0.98,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.02,
              "transition": "Death"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": "<",
            "value": 30
          },
          "distributions": [
            {
              "distribution": 0.98,
              "transition": "COPD_Followup_Encounter"
            },
            {
              "distribution": 0.02,
              "transition": "Death"
            }
          ]
        }
      ]
    },
    "COPD_Followup_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Followup_FEV_Test"
    },
    "Followup_FEV_Test": {
      "type": "Procedure",
      "target_encounter": "COPD_Followup_Encounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "127783003",
          "display": "Spirometry (procedure)"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 80
          },
          "remarks": [
            "people with an FEV1 of >= 80% are in the 'Mild' or 'At Risk' stage of COPD"
          ],
          "transition": "Stage1_FEV_Result"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 50
          },
          "remarks": [
            "people with 80% > FEV1 >= 50% are in the 'Moderate' stage of COPD"
          ],
          "transition": "Stage2_FEV_Result"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">=",
            "value": 30
          },
          "remarks": [
            "people with 50% > FEV1 >= 30% are in the 'Severe' stage of COPD"
          ],
          "transition": "Stage3_FEV_Result"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": "<",
            "value": 30
          },
          "remarks": [
            "people with an FEV1 of < 80% are in the 'Very Severe' or end stage of COPD"
          ],
          "transition": "Stage4_FEV_Result"
        }
      ]
    },
    "Stage1_FEV_Result": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 75,
        "high": 90
      },
      "remarks": [
        "currently in stage 1 so they can stay in 1 or drop to 2"
      ],
      "unit": "%",
      "codes": [
        {
          "system": "LOINC",
          "code": "19926-5",
          "display": "FEV1/​FVC"
        }
      ],
      "direct_transition": "Loop_back_to_Living_with_COPD"
    },
    "Stage2_FEV_Result": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 48,
        "high": 79
      },
      "remarks": [
        "currently in stage 2 so they can stay in 2 or drop to 3"
      ],
      "unit": "%",
      "codes": [
        {
          "system": "LOINC",
          "code": "19926-5",
          "display": "FEV1/​FVC"
        }
      ],
      "direct_transition": "Check_Medication"
    },
    "Stage3_FEV_Result": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 26,
        "high": 49
      },
      "remarks": [
        "currently in stage 3 so they can stay in 3 or drop to 4"
      ],
      "unit": "%",
      "codes": [
        {
          "system": "LOINC",
          "code": "19926-5",
          "display": "FEV1/​FVC"
        }
      ],
      "direct_transition": "Check_Medication"
    },
    "Stage4_FEV_Result": {
      "type": "Observation",
      "category": "procedure",
      "range": {
        "low": 10,
        "high": 29
      },
      "unit": "%",
      "codes": [
        {
          "system": "LOINC",
          "code": "19926-5",
          "display": "FEV1/​FVC"
        }
      ],
      "direct_transition": "Pulmonary_Rehab"
    },
    "Check_Medication": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "896188",
                "display": "Fluticasone propionate 0.25 MG/ACTUAT / salmeterol 0.05 MG/ACTUAT [Advair]"
              }
            ]
          },
          "transition": "Consider_Surgery"
        },
        {
          "transition": "Prescribe_Medication"
        }
      ]
    },
    "Prescribe_Medication": {
      "type": "MedicationOrder",
      "target_encounter": "COPD_Followup_Encounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "RxNorm",
          "code": "896188",
          "display": "Fluticasone propionate 0.25 MG/ACTUAT / salmeterol 0.05 MG/ACTUAT [Advair]"
        }
      ],
      "direct_transition": "Consider_Surgery"
    },
    "Consider_Surgery": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Surgery_Encounter",
                "remarks": [
                  "only allow people to have surgery once"
                ]
              },
              {
                "condition_type": "Observation",
                "codes": [
                  {
                    "system": "LOINC",
                    "code": "19926-5",
                    "display": "FEV1/​FVC"
                  }
                ],
                "operator": ">",
                "value": 30,
                "remarks": [
                  "surgery is only considered for severe COPD - https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4608618/"
                ]
              },
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 65,
                "unit": "years",
                "remarks": [
                  "surgery in older patients is not recommended due to the risk to the patient"
                ]
              },
              {
                "condition_type": "Attribute",
                "attribute": "smoker",
                "operator": "==",
                "value": true,
                "remarks": [
                  "patients must quit smoking to be considered"
                ]
              }
            ]
          },
          "transition": "Loop_back_to_Living_with_COPD"
        },
        {
          "distributions": [
            {
              "distribution": 0.15,
              "transition": "Wait_for_Surgery"
            },
            {
              "distribution": 0.85,
              "transition": "Loop_back_to_Living_with_COPD"
            }
          ],
          "remarks": [
            "there is little data about what % of eligible patients actually have surgery - these #s are guesses"
          ]
        }
      ]
    },
    "Wait_for_Surgery": {
      "type": "Delay",
      "range": {
        "low": 6,
        "high": 12,
        "unit": "weeks"
      },
      "direct_transition": "Surgery_Encounter"
    },
    "Surgery_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305411003",
          "display": "Admission to thoracic surgery department"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "19926-5",
                "display": "FEV1/​FVC"
              }
            ],
            "operator": ">",
            "value": 20,
            "remarks": [
              "LVRS is more common for patients with FEV1 > 20% - http://www.medscape.com/viewarticle/502203_7"
            ]
          },
          "transition": "Lung_Volume_Reduction"
        },
        {
          "transition": "Lung_Transplant"
        }
      ]
    },
    "Lung_Transplant": {
      "type": "Procedure",
      "target_encounter": "Surgery_Encounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "88039007",
          "display": "Transplant of lung (procedure)"
        }
      ],
      "duration": {
        "low": 5,
        "high": 7,
        "unit": "hours"
      },
      "direct_transition": "End_Surgery_Encounter"
    },
    "Lung_Volume_Reduction": {
      "type": "Procedure",
      "target_encounter": "Surgery_Encounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "429609002",
          "display": "Lung volume reduction surgery (procedure)"
        }
      ],
      "direct_transition": "End_Surgery_Encounter"
    },
    "End_Surgery_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Loop_back_to_Living_with_COPD"
    },
    "Pulmonary_Rehab": {
      "type": "Procedure",
      "target_encounter": "COPD_Followup_Encounter",
      "reason": "copd_variant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "15081005",
          "display": "Pulmonary rehabilitation (regime/therapy)"
        }
      ],
      "direct_transition": "Check_Medication"
    },
    "Loop_back_to_Living_with_COPD": {
      "type": "Simple",
      "remarks": [
        "this state only exists to make the graphviz look cleaner"
      ],
      "direct_transition": "Living_with_COPD"
    },
    "Death": {
      "type": "Death",
      "referenced_by_attribute": "copd_variant",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"cystic_fibrosis":{
  "name": "Cystic Fibrosis",
  "remarks": [
    "Cystic Fibrosis, or mucoviscidosis, is an autosomal recessive genetic disorder which is named after that scarring (fibrosis) and cyst formation in the pancreas.  It is characterized by thick, viscous secretions such as thickening of mucus which causes many respiratory problems.  Statistics and information were gathered from the pages and information available at:\nhttps://www.cff.org\n\nSome data and statistic came from:\nhttps://www.sciencedirect.com/science/article/pii/S1569199315002106?viewFullText=true#f0015\n\n\n\n\n\n"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Potential_Onset"
    },
    "Terminal": {
      "type": "Terminal"
    },
    "Potential_Onset": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Race",
            "race": "white"
          },
          "distributions": [
            {
              "transition": "Cystic_Fibrosis",
              "distribution": 0.0003333333
            },
            {
              "transition": "Terminal",
              "distribution": 0.9996666667
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Race",
            "race": "black"
          },
          "distributions": [
            {
              "transition": "Cystic_Fibrosis",
              "distribution": 0.000066225
            },
            {
              "transition": "Terminal",
              "distribution": 0.999933775
            }
          ]
        },
        {
          "distributions": [
            {
              "transition": "Cystic_Fibrosis",
              "distribution": 0.000028571
            },
            {
              "transition": "Terminal",
              "distribution": 0.999971429
            }
          ],
          "condition": {
            "condition_type": "Race",
            "race": "asian"
          }
        }
      ],
      "remarks": [
        "https://ghr.nlm.nih.gov/condition/cystic-fibrosis#statistics",
        "",
        "The frequency dropdown shows statistics about fibrosis prevalence by race."
      ]
    },
    "Cystic_Fibrosis": {
      "type": "ConditionOnset",
      "target_encounter": "Fibrosis_Screening",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 190905008,
          "display": "Cystic Fibrosis"
        }
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "transition": "Male_Infertility",
              "distribution": 0.98
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "transition": "Female_Infertility",
              "distribution": 0.5
            }
          ]
        },
        {
          "distributions": [],
          "transition": "chronic_cough"
        }
      ]
    },
    "Age <1": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "transition": "symptoms_dont_improve",
          "distribution": 0.82
        },
        {
          "transition": "Meconium Ileus",
          "distribution": 0.18
        }
      ]
    },
    "Age 1": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "direct_transition": "symptoms_dont_improve"
    },
    "Ages_2_15": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 15,
        "unit": "years"
      },
      "direct_transition": "symptoms_dont_improve"
    },
    "16_plus": {
      "type": "Delay",
      "range": {
        "low": 16,
        "high": 50,
        "unit": "years"
      },
      "direct_transition": "symptoms_dont_improve"
    },
    "Fibrosis_Screening": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 67799006,
          "display": "Diagnosis of cystic fibrosis using sweat test and gene test"
        }
      ],
      "conditional_transition": [
        {
          "transition": "Neonatal_screening",
          "condition": {
            "condition_type": "PriorState",
            "name": "Age <1"
          }
        },
        {
          "transition": "Sweat_Test"
        }
      ],
      "remarks": [
        "https://www.cff.org/What-is-CF/Testing/"
      ]
    },
    "Sweat_Test": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 86964003,
          "display": "Sweat Test"
        }
      ],
      "duration": {
        "low": 1,
        "high": 2,
        "unit": "hours"
      },
      "direct_transition": "Gene_mutation_test",
      "remarks": [
        "Salty sweat indicates CF",
        "https://www.cff.org/What-is-CF/Testing/Sweat-Test/"
      ]
    },
    "Gene_mutation_test": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 444260001,
          "display": "20 Gene mutation test"
        }
      ],
      "duration": {
        "low": 0.5,
        "high": 1,
        "unit": "hours"
      },
      "distributed_transition": [
        {
          "transition": "Prescribe_Mucus_Thinner",
          "distribution": 0.96
        },
        {
          "transition": "Set_Gene_Mutation",
          "distribution": 0.04
        }
      ],
      "remarks": [
        "CF is a genetic disease",
        "https://www.cff.org/What-is-CF/Testing/",
        ""
      ]
    },
    "End_Screening": {
      "type": "EncounterEnd",
      "direct_transition": "Life_With_Cystic_Fibrosis"
    },
    "Set_Gene_Mutation": {
      "type": "SetAttribute",
      "attribute": "G155D Mutation",
      "direct_transition": "Prescribe_Ivacaftor",
      "value": true,
      "remarks": [
        "Around 4% of CF patients have a gene mutation that causes the disease but can be treated with a different drug."
      ]
    },
    "chronic_cough": {
      "type": "Symptom",
      "symptom": "Chronic Cough",
      "cause": "",
      "direct_transition": "Salty_Skin",
      "range": {
        "low": 50,
        "high": 100
      }
    },
    "Meconium Ileus": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Fibrosis_Screening",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 206523001,
          "display": "Meconium Ileus"
        }
      ],
      "direct_transition": "Fibrosis_Screening",
      "remarks": [
        "http://www.hopkinscf.org/what-is-cf/diagnosis/presentations/meconium-illeus/"
      ]
    },
    "Enema": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 385186005,
          "display": "Enema"
        }
      ],
      "duration": {
        "low": 1,
        "high": 2,
        "unit": "hours"
      },
      "direct_transition": "Meconium_Ileus_Resolved",
      "remarks": [
        "http://www.seattlechildrens.org/medical-conditions/digestive-gastrointestinal-conditions/meconium-ileus/"
      ]
    },
    "Male_Infertility": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Fibrosis_Screening",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 427089005,
          "display": "Male Infertility"
        }
      ],
      "direct_transition": "chronic_cough"
    },
    "Female_Infertility": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Fibrosis_Screening",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 707577004,
          "display": "Female Infertility"
        }
      ],
      "direct_transition": "chronic_cough",
      "remarks": [
        "https://thorax.bmj.com/content/56/8/649"
      ]
    },
    "Neonatal_screening": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 60151004,
          "display": "Neonatal Screening"
        }
      ],
      "duration": {
        "low": 12,
        "high": 24,
        "unit": "hours"
      },
      "conditional_transition": [
        {
          "transition": "Enema",
          "condition": {
            "condition_type": "PriorState",
            "name": "Meconium Ileus"
          }
        },
        {
          "transition": "Sweat_Test"
        }
      ],
      "remarks": [
        "https://www.cff.org/What-is-CF/Testing/Newborn-Screening-for-CF/"
      ]
    },
    "symptoms_dont_improve": {
      "type": "Delay",
      "direct_transition": "Fibrosis_Screening",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      }
    },
    "Meconium_Ileus_Resolved": {
      "type": "ConditionEnd",
      "direct_transition": "Sweat_Test",
      "condition_onset": "Meconium_Ileus"
    },
    "CF_CarePlan": {
      "type": "CarePlanStart",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 734163000,
          "display": "Care Plan"
        }
      ],
      "direct_transition": "End_Screening",
      "reason": "Cystic_Fibrosis",
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": 710971000,
          "display": "Airway Clearance"
        },
        {
          "system": "SNOMED-CT",
          "code": 56251003,
          "display": "Nebulizer Therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": 392020005,
          "display": "PICC care"
        },
        {
          "system": "SNOMED-CT",
          "code": 226029000,
          "display": "Exercise Therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": 386373004,
          "display": "Nutrition Plan"
        }
      ],
      "remarks": [
        "A CF careplan is characterized here:",
        "",
        "https://www.cff.org/Life-With-CF/Treatments-and-Therapies/Treatment-Plan/Managing-Your-Treatment-Plan/"
      ]
    },
    "Pancreatin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 210856,
          "display": "Pancreatin 4X 600 MG Oral Tablet"
        }
      ],
      "direct_transition": "CF_CarePlan",
      "reason": "Cystic_Fibrosis",
      "remarks": [
        "https://www.cff.org/Life-With-CF/Daily-Life/Fitness-and-Nutrition/Nutrition/Taking-Care-of-Your-Digestive-System/Enzymes/",
        "",
        "\"Between 85 and 90% of CF patients have pancreatic insufficiency."
      ]
    },
    "Life_With_Cystic_Fibrosis": {
      "type": "Delay",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes",
                "operator": "==",
                "value": true
              },
              {
                "condition_type": "Age",
                "operator": "<=",
                "quantity": 30,
                "unit": "years",
                "value": 0
              }
            ]
          },
          "distributions": [
            {
              "transition": "startDiseaseChain",
              "distribution": 0.982
            },
            {
              "transition": "patient_dies",
              "distribution": 0.013
            },
            {
              "transition": "patient_lives",
              "distribution": 0.005
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 30,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "diabetes",
                "operator": "==",
                "value": true
              }
            ]
          },
          "distributions": [
            {
              "transition": "patient_dies",
              "distribution": 0.035
            },
            {
              "transition": "startDiseaseChain",
              "distribution": 0.935
            },
            {
              "transition": "patient_lives",
              "distribution": 0.03
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "lung_transplant",
            "operator": "==",
            "value": "denied"
          },
          "distributions": [
            {
              "distribution": 0.049,
              "transition": "patient_dies"
            },
            {
              "distribution": 0.931,
              "transition": "startDiseaseChain"
            },
            {
              "distribution": 0.02,
              "transition": "patient_lives"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "lung_transplant",
            "operator": "==",
            "value": "accepted"
          },
          "distributions": [
            {
              "distribution": 0.0204,
              "transition": "patient_dies"
            },
            {
              "distribution": 0.9696,
              "transition": "startDiseaseChain"
            },
            {
              "distribution": 0.01,
              "transition": "patient_lives"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 20,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.021,
              "transition": "patient_dies"
            },
            {
              "distribution": 0.969,
              "transition": "startDiseaseChain"
            },
            {
              "distribution": 0.01,
              "transition": "patient_lives"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<=",
            "quantity": 20,
            "unit": "years",
            "value": 0
          },
          "distributions": [
            {
              "distribution": 0.996,
              "transition": "startDiseaseChain"
            },
            {
              "distribution": 0.002,
              "transition": "patient_dies"
            },
            {
              "distribution": 0.002,
              "transition": "patient_lives"
            }
          ]
        }
      ],
      "range": {
        "low": 12,
        "high": 14,
        "unit": "weeks"
      }
    },
    "Getting_Diagnosed": {
      "type": "Simple",
      "distributed_transition": [
        {
          "transition": "Age <1",
          "distribution": 0.657
        },
        {
          "transition": "Age 1",
          "distribution": 0.066
        },
        {
          "transition": "Ages_2_15",
          "distribution": 0.208
        },
        {
          "transition": "16_plus",
          "distribution": 0.068
        }
      ],
      "remarks": [
        "https://www.cff.org/uploadedImages/Content/What_is_CF/age-at-diagnosis.jpg"
      ]
    },
    "Prescribe_Ivacaftor": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 1655927,
          "display": "Ivacaftor"
        }
      ],
      "direct_transition": "Prescribe_Mucus_Thinner",
      "reason": "Cystic Fibrosis",
      "remarks": [
        "https://www.cff.org/About-Us/Media-Center/Press-Releases/The-Cystic-Fibrosis-Foundation-Applauds-FDA-Approval-of-Kalydeco/"
      ]
    },
    "Prescribe_Mucus_Thinner": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 205532,
          "display": "Pulmozyme (Dornase Alfa)"
        }
      ],
      "reason": "Cystic_Fibrosis",
      "distributed_transition": [
        {
          "transition": "Pancreatin",
          "distribution": 0.9
        },
        {
          "transition": "CF_CarePlan",
          "distribution": 0.1
        }
      ]
    },
    "Salty_Skin": {
      "type": "Symptom",
      "symptom": "Salty_Skin",
      "cause": "",
      "exact": {
        "quantity": 1
      },
      "direct_transition": "Getting_Diagnosed"
    },
    "Quarterly_Checkup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 185349003,
          "display": "Encounter for check up"
        }
      ],
      "conditional_transition": [
        {
          "transition": "GlucoseTest",
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "And",
                "conditions": [
                  {
                    "condition_type": "Not",
                    "condition": {
                      "condition_type": "PriorState",
                      "name": "GlucoseTest",
                      "within": {
                        "quantity": 1,
                        "unit": "years"
                      }
                    }
                  },
                  {
                    "condition_type": "Age",
                    "operator": ">=",
                    "quantity": 10,
                    "unit": "years"
                  }
                ]
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "DiabetesCarePlan"
                }
              }
            ]
          }
        },
        {
          "transition": "Chest_XRay",
          "condition": {
            "condition_type": "Not",
            "condition": {
              "condition_type": "PriorState",
              "name": "Chest_XRay",
              "within": {
                "quantity": 2,
                "unit": "years"
              }
            }
          }
        },
        {
          "transition": "Oropharyngeal_Culture"
        }
      ],
      "remarks": [
        "http://pediatrics.aappublications.org/content/early/2016/03/22/peds.2015-1784",
        "",
        "Overview of the standard of care per quarter"
      ]
    },
    "Chest_XRay": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 399208008,
          "display": "Chest X-ray"
        }
      ],
      "duration": {
        "low": 1,
        "high": 2,
        "unit": "hours"
      },
      "conditional_transition": [
        {
          "transition": "GlucoseTest",
          "condition": {
            "condition_type": "Not",
            "condition": {
              "condition_type": "PriorState",
              "name": "DiabetesCarePlan"
            }
          }
        }
      ],
      "remarks": [
        "Chest X-rays should be done at least every other year, as shown in the link at \"Quarterly Checkup\""
      ]
    },
    "Oropharyngeal_Culture": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 104173009,
          "display": "Sputum Culture"
        }
      ],
      "duration": {
        "low": 5,
        "high": 15,
        "unit": "minutes"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_1"
          },
          "distributions": [
            {
              "transition": "Prescribe_Ciprofloxacin",
              "distribution": 0.25
            },
            {
              "transition": "Pulmonary_Function_Test",
              "distribution": 0.75
            }
          ]
        },
        {
          "distributions": [
            {
              "transition": "Prescribe_Vancomycin",
              "distribution": 0.25
            },
            {
              "transition": "Pulmonary_Function_Test",
              "distribution": 0.75
            }
          ],
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_2"
          }
        },
        {
          "distributions": [
            {
              "transition": "Pulmonary_Function_Test",
              "distribution": 1
            }
          ]
        }
      ]
    },
    "Develop_Diabetes": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Quarterly_Checkup",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 427089005,
          "display": "Diabetes from Cystic Fibrosis"
        }
      ],
      "direct_transition": "diatbetesState",
      "remarks": [
        "Development of diabetes with cystic fibrosis is relatively common.  ",
        "",
        "https://www.ncbi.nlm.nih.gov/pubmed/19542209",
        ""
      ]
    },
    "GlucoseTest": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 113076002,
          "display": "Oral Glucose Tolerance Test"
        }
      ],
      "duration": {
        "low": 120,
        "high": 150,
        "unit": "minutes"
      },
      "conditional_transition": [
        {
          "transition": "DiabetesCarePlan",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetes",
            "operator": "==",
            "value": true
          }
        },
        {
          "transition": "Oropharyngeal_Culture"
        }
      ],
      "remarks": [
        "https://www.cff.org/Life-With-CF/Daily-Life/Cystic-Fibrosis-related-Diabetes/Managing-CFRD.pdf",
        "\"The glucose test is recommended to be done at least annually\""
      ]
    },
    "diatbetesState": {
      "type": "SetAttribute",
      "attribute": "diabetes",
      "direct_transition": "diseaseSupplier",
      "value": true
    },
    "DiabetesCarePlan": {
      "type": "CarePlanStart",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 703040004,
          "display": "Agreeing on diabetes care plan"
        }
      ],
      "direct_transition": "Oropharyngeal_Culture",
      "reason": "Develop_Diabetes",
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": 308113006,
          "display": "Self Monitoring of Blood Glucose"
        },
        {
          "system": "SNOMED-CT",
          "code": 225302006,
          "display": "Insulin Therapy"
        }
      ]
    },
    "EndCheckup": {
      "type": "EncounterEnd",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Not",
            "condition": {
              "condition_type": "PriorState",
              "name": "Lung_Transplant"
            }
          },
          "distributions": [
            {
              "transition": "Lung_Transplant_Considered",
              "distribution": 0.007
            },
            {
              "transition": "Life_With_Cystic_Fibrosis",
              "distribution": 0.993
            }
          ]
        },
        {
          "distributions": [
            {
              "transition": "Life_With_Cystic_Fibrosis",
              "distribution": 1
            }
          ]
        }
      ]
    },
    "Lung_Transplant_Considered": {
      "type": "Simple",
      "distributed_transition": [
        {
          "transition": "Lung_Transplant_Wait",
          "distribution": 0.69
        },
        {
          "transition": "Lung_Transplant_Denied",
          "distribution": 0.31
        }
      ],
      "remarks": [
        "https://www.sciencedirect.com/science/article/pii/S1569199315002106?viewFullText=true#f0015",
        "Values for percent denied/accepted and disease related to lung transplant were taken from the link above.  The statistics are from the French registry so it might be a bit off from US stats"
      ]
    },
    "Lung_Transplant_Denied": {
      "type": "SetAttribute",
      "attribute": "lung_transplant",
      "direct_transition": "Life_With_Cystic_Fibrosis",
      "value": "denied"
    },
    "Lung_Transplant": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 232657004,
          "display": "Lung Transplant"
        }
      ],
      "duration": {
        "low": 2,
        "high": 5,
        "unit": "days"
      },
      "direct_transition": "Lung_Transplant_End",
      "reason": "Cystic_Fibrosis"
    },
    "setTransplant": {
      "type": "SetAttribute",
      "attribute": "lung_transplant",
      "direct_transition": "Life_With_Cystic_Fibrosis",
      "value": "accepted"
    },
    "Take_Blood_Sample": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 82078001,
          "display": "Take blood sample"
        }
      ],
      "duration": {
        "low": 10,
        "high": 30,
        "unit": "minutes"
      },
      "direct_transition": "EndCheckup"
    },
    "Pulmonary_Function_Test": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 23426006,
          "display": "Pulmonary Function Test"
        }
      ],
      "duration": {
        "low": 5,
        "high": 15,
        "unit": "minutes"
      },
      "direct_transition": "Take_Blood_Sample"
    },
    "startDiseaseChain": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 0,
                "unit": "years"
              },
              {
                "condition_type": "Age",
                "operator": "<=",
                "quantity": 8,
                "unit": "years",
                "value": 0
              }
            ]
          },
          "distributions": [
            {
              "transition": "Diabetes_Guard",
              "distribution": 0.005
            },
            {
              "transition": "diseaseSupplier",
              "distribution": 0.995
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 8,
                "unit": "years"
              },
              {
                "condition_type": "Age",
                "operator": "<=",
                "quantity": 18,
                "unit": "years",
                "value": 0
              }
            ]
          },
          "distributions": [
            {
              "transition": "Diabetes_Guard",
              "distribution": 0.052
            },
            {
              "transition": "diseaseSupplier",
              "distribution": 0.948
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "transition": "Diabetes_Guard",
              "distribution": 0.067
            },
            {
              "transition": "diseaseSupplier",
              "distribution": 0.933
            }
          ]
        }
      ]
    },
    "diseaseSupplier": {
      "type": "Simple",
      "distributed_transition": [
        {
          "transition": "no_double_infection",
          "distribution": 0.0058
        },
        {
          "transition": "no_double_infection_2",
          "distribution": 0.0032
        },
        {
          "transition": "Quarterly_Checkup",
          "distribution": 0.991
        }
      ],
      "remarks": [
        "https://www.cff.org/Research/Researcher-Resources/Patient-Registry/2017-Cystic-Fibrosis-Foundation-Patient-Registry-Highlights.pdf",
        "Statistics for infections are taken from the 2017 registry",
        ""
      ]
    },
    "Develop_Infection_1": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Quarterly_Checkup",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 11218009,
          "display": "Infection caused by Pseudomonas aeruginosa"
        }
      ],
      "direct_transition": "Quarterly_Checkup"
    },
    "Develop_Infection_2": {
      "type": "ConditionOnset",
      "assign_to_attribute": "",
      "target_encounter": "Quarterly_Checkup",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 406602003,
          "display": "Infection caused by Staphylococcus aureus"
        }
      ],
      "direct_transition": "Quarterly_Checkup"
    },
    "Prescribe_Ciprofloxacin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 998755,
          "display": "Ciprofloxacin 10MG/ML"
        }
      ],
      "direct_transition": "Pulmonary_Function_Test",
      "reason": "Develop_Infection_1",
      "remarks": [
        "https://www.ncbi.nlm.nih.gov/pubmed/2941289"
      ]
    },
    "Prescribe_Vancomycin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 1160499,
          "display": "IV antibiotic Vancomycin"
        }
      ],
      "direct_transition": "Pulmonary_Function_Test",
      "remarks": [
        "https://www.mayoclinic.org/diseases-conditions/staph-infections/diagnosis-treatment/drc-20356227"
      ],
      "reason": "Develop_Infection_2"
    },
    "patient_dies": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Develop_Infection_1"
              },
              {
                "condition_type": "PriorState",
                "name": "Prescribe_Ciprofloxacin",
                "since": "Develop_Infection_1",
                "within": {
                  "quantity": 6,
                  "unit": "months"
                }
              }
            ]
          },
          "distributions": [
            {
              "transition": "Sepsis_Of_Paeruginosa",
              "distribution": 0.4
            },
            {
              "transition": "patient_lives",
              "distribution": 0.6
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Develop_Infection_2"
              },
              {
                "condition_type": "PriorState",
                "name": "Prescribe_Vancomycin",
                "since": "Develop_Infection_2",
                "within": {
                  "quantity": 6,
                  "unit": "months"
                }
              }
            ]
          },
          "distributions": [
            {
              "transition": "Sepsis_of_Staphylococcus_aureus",
              "distribution": 0.4
            },
            {
              "transition": "patient_lives",
              "distribution": 0.6
            }
          ]
        },
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_1"
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Sepsis_Of_Paeruginosa"
            },
            {
              "transition": "pulmonary_exacerbation",
              "distribution": 0.2
            }
          ]
        },
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_2"
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Sepsis_of_Staphylococcus_aureus"
            },
            {
              "transition": "pulmonary_exacerbation",
              "distribution": 0.2
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "pulmonary_exacerbation"
            }
          ]
        }
      ],
      "remarks": [
        "https://www.sciencedirect.com/science/article/pii/S1569199315002106?viewFullText=true#f0015"
      ]
    },
    "Sepsis_Of_Paeruginosa": {
      "type": "ConditionOnset",
      "assign_to_attribute": "CF_Complication",
      "target_encounter": "Emergency_Room",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 448813005,
          "display": "Sepsis caused by Pseudomonas (disorder)"
        }
      ],
      "direct_transition": "low_blood_pressure"
    },
    "Emergency_Room": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 50849002,
          "display": "Emergency room admission"
        }
      ],
      "conditional_transition": [
        {
          "transition": "Antibiotic_Therapy",
          "condition": {
            "condition_type": "PriorState",
            "name": "Sepsis_Of_Paeruginosa",
            "within": {
              "quantity": 1,
              "unit": "days"
            }
          }
        },
        {
          "transition": "Antibiotic_Therapy",
          "condition": {
            "condition_type": "PriorState",
            "name": "Sepsis_of_Staphylococcus_aureus",
            "within": {
              "quantity": 1,
              "unit": "days"
            }
          }
        },
        {
          "transition": "Tracheostomy",
          "condition": {
            "condition_type": "PriorState",
            "name": "pulmonary_infective_exacerbation",
            "within": {
              "quantity": 1,
              "unit": "days"
            }
          }
        }
      ],
      "reason": "CF_Complication",
      "remarks": [
        "For Sepsis",
        "https://www.mayoclinic.org/diseases-conditions/sepsis/diagnosis-treatment/drc-20351219",
        "For Respiratory Failure",
        "https://emedicine.medscape.com/article/167981-treatment"
      ]
    },
    "Intravenous_Infusion": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 14152002,
          "display": "Intravenous infusion (procedure)"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "conditional_transition": [
        {
          "transition": "death",
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "patient_dies"
              },
              {
                "condition_type": "PriorState",
                "name": "Sepsis_Of_Paeruginosa"
              }
            ]
          }
        },
        {
          "transition": "death_2",
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "patient_dies"
              },
              {
                "condition_type": "PriorState",
                "name": "Sepsis_of_Staphylococcus_aureus"
              }
            ]
          }
        },
        {
          "transition": "Release_From_Hospital"
        }
      ]
    },
    "Antibiotic_Therapy": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 281790008,
          "display": "Intravenous antibiotic therapy"
        }
      ],
      "duration": {
        "low": 30,
        "high": 90,
        "unit": "minutes"
      },
      "direct_transition": "Intravenous_Infusion"
    },
    "death": {
      "type": "Death",
      "direct_transition": "Terminal",
      "condition_onset": "Sepsis_Of_Paeruginosa",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 448813005,
          "display": "Sepsis of Pseudomonas"
        }
      ],
      "range": {
        "low": 1,
        "high": 2,
        "unit": "days"
      }
    },
    "Sepsis_of_Staphylococcus_aureus": {
      "type": "ConditionOnset",
      "assign_to_attribute": "CF_Complication",
      "target_encounter": "Emergency_Room",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 448417001,
          "display": "Sepsis caused by Staphylococcus aureus"
        }
      ],
      "direct_transition": "low_blood_pressure"
    },
    "fever": {
      "type": "Symptom",
      "symptom": "fever",
      "cause": "Sepsis_Of_Paeruginosa",
      "direct_transition": "Emergency_Room",
      "range": {
        "low": 70,
        "high": 100
      }
    },
    "difficulty_breathing": {
      "type": "Symptom",
      "symptom": "difficulty breathing",
      "cause": "Sepsis_of_Paeruginosa",
      "direct_transition": "fever",
      "range": {
        "low": 60,
        "high": 90
      }
    },
    "low_blood_pressure": {
      "type": "Symptom",
      "symptom": "low blood pressure",
      "cause": "",
      "direct_transition": "difficulty_breathing",
      "range": {
        "low": 40,
        "high": 80
      }
    },
    "death_2": {
      "type": "Death",
      "direct_transition": "Terminal",
      "condition_onset": "Sepsis_of_Staphylococcus_aureus",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 448813005,
          "display": "Sepsis caused by Staphylococcus aureus"
        }
      ]
    },
    "Tracheostomy": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 48387007,
          "display": "Incision of trachea (procedure)"
        }
      ],
      "duration": {
        "low": 30,
        "high": 60,
        "unit": "minutes"
      },
      "direct_transition": "Oxygen_Therapy"
    },
    "wheezing": {
      "type": "Symptom",
      "symptom": "wheezing",
      "cause": "",
      "direct_transition": "Emergency_Room",
      "range": {
        "low": 70,
        "high": 100
      }
    },
    "death_3": {
      "type": "Death",
      "direct_transition": "Terminal",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 65710008,
          "display": "Death due to acute respiratory failure"
        }
      ],
      "range": {
        "low": 1,
        "high": 2,
        "unit": "days"
      }
    },
    "Oxygen_Therapy": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 65710008,
          "display": "Oxygen Therapy"
        }
      ],
      "duration": {
        "low": 30,
        "high": 60,
        "unit": "minutes"
      },
      "conditional_transition": [
        {
          "transition": "death_3",
          "condition": {
            "condition_type": "PriorState",
            "name": "patient_dies"
          }
        },
        {
          "transition": "Release_From_Hospital"
        }
      ]
    },
    "Release_From_Hospital": {
      "type": "EncounterEnd",
      "direct_transition": "Recovery"
    },
    "patient_lives": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Sepsis_Of_Paeruginosa",
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_1"
          }
        },
        {
          "transition": "Sepsis_of_Staphylococcus_aureus",
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_2"
          }
        },
        {
          "transition": "pulmonary_exacerbation"
        }
      ]
    },
    "pulmonary_exacerbation": {
      "type": "ConditionOnset",
      "assign_to_attribute": "CF_Complication",
      "target_encounter": "Emergency_Room",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 65710008,
          "display": "Acute respiratory failure (disorder)"
        }
      ],
      "direct_transition": "wheezing"
    },
    "Diabetes_Guard": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "diseaseSupplier",
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Diabetes"
          }
        },
        {
          "transition": "Develop_Diabetes"
        }
      ]
    },
    "no_double_infection": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Quarterly_Checkup",
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_1"
          }
        },
        {
          "transition": "Develop_Infection_1"
        }
      ]
    },
    "no_double_infection_2": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Quarterly_Checkup",
          "condition": {
            "condition_type": "PriorState",
            "name": "Develop_Infection_2"
          }
        },
        {
          "transition": "Develop_Infection_2"
        }
      ]
    },
    "Lung_Transplant_Wait": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 16602611000119108,
          "display": "Awaiting transplantation of lung (situation)"
        }
      ],
      "direct_transition": "Lung_Transplant"
    },
    "Lung_Transplant_End": {
      "type": "EncounterEnd",
      "direct_transition": "setTransplant"
    },
    "Recovery": {
      "type": "Delay",
      "direct_transition": "startDiseaseChain",
      "range": {
        "low": 6,
        "high": 14,
        "unit": "weeks"
      }
    }
  }
}
,
"dementia":{
  "name": "Dementia",
  "remarks": [
    "right now this is just Alzheimer's but there are other dementias that could be adapted into this model"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "distributed_transition": [
        {
          "distribution": 0.4,
          "transition": "AlzheimersGene"
        },
        {
          "distribution": 0.6,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Alzheimer's has been shown to be significantly based on genetics, and there are specific genes to point to for early-onset:",
        "https://www.nia.nih.gov/alzheimers/publication/alzheimers-disease-genetics-fact-sheet",
        "Since Synthea does not currently model at the level of individual genes",
        "we'll use a simple probability to differentiate the population into who will and won't get alzheimers.",
        "The 40% chance does seem high, but the key factor here is the delay in when it appears.",
        "38% of people over age 85 have alzheimer's. ( http://www.alzheimers.net/resources/alzheimers-statistics/ )"
      ]
    },
    "AlzheimersGene": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.95,
          "transition": "PreAlzheimers"
        },
        {
          "distribution": 0.05,
          "transition": "PreEarlyOnsetAlzheimers"
        }
      ],
      "remarks": [
        "Early onset Alzheimers affects roughly 5% of people with Alzheimer's. http://www.mayoclinic.org/diseases-conditions/alzheimers-disease/in-depth/alzheimers/art-20048356"
      ]
    },
    "PreAlzheimers": {
      "type": "Delay",
      "range": {
        "low": 64,
        "high": 80,
        "unit": "years"
      },
      "remarks": [
        "There is evidence that higher education leads to a delay in the onset of alzheimers."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "High"
          },
          "transition": "EducationDelay"
        },
        {
          "transition": "AlzheimersOnset"
        }
      ]
    },
    "EducationDelay": {
      "type": "Delay",
      "range": {
        "low": 5,
        "high": 10,
        "unit": "years"
      },
      "direct_transition": "AlzheimersOnset"
    },
    "AlzheimersOnset": {
      "type": "ConditionOnset",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "26929004",
          "display": "Alzheimer's disease (disorder)"
        }
      ],
      "direct_transition": "NoImpairment"
    },
    "PreEarlyOnsetAlzheimers": {
      "type": "Delay",
      "range": {
        "low": 40,
        "high": 64,
        "unit": "years"
      },
      "direct_transition": "EarlyOnsetAlzheimersOnset"
    },
    "EarlyOnsetAlzheimersOnset": {
      "type": "ConditionOnset",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "230265002",
          "display": "Familial Alzheimer's disease of early onset (disorder)"
        }
      ],
      "direct_transition": "NoImpairment"
    },
    "NoImpairment": {
      "type": "Delay",
      "range": {
        "low": 12,
        "high": 36,
        "unit": "months"
      },
      "remarks": [
        "1. Normal"
      ],
      "direct_transition": "VeryMildDecline"
    },
    "VeryMildDecline": {
      "type": "Delay",
      "range": {
        "low": 12,
        "high": 36,
        "unit": "months"
      },
      "remarks": [
        "2. Very mild decline, also considered normal aged forgetfulness"
      ],
      "direct_transition": "DecreasedCommunication"
    },
    "DecreasedCommunication": {
      "type": "Symptom",
      "symptom": "Decreased Communication",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "DecreasedAttentiveness"
    },
    "DecreasedAttentiveness": {
      "type": "Symptom",
      "symptom": "Decreased Attentiveness",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "DecreasedJudgment"
    },
    "DecreasedJudgment": {
      "type": "Symptom",
      "symptom": "Decreased in Judgement",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "DecreasedVisualPerception"
    },
    "DecreasedVisualPerception": {
      "type": "Symptom",
      "symptom": "Decreased Visual Perception",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Confusion"
    },
    "Confusion": {
      "type": "Symptom",
      "symptom": "Confusion",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "MildMemoryLoss"
    },
    "MildMemoryLoss": {
      "type": "Symptom",
      "symptom": "Memory Loss",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "MildDecline"
    },
    "MildDecline": {
      "type": "Delay",
      "range": {
        "low": 6,
        "high": 12,
        "unit": "months"
      },
      "remarks": [
        "3. Mild decline, aka mild cognitive impairment (MCI) progresses to the next stage in generally 2-4 years",
        "Persons at this stage display subtle deficits which are noted by others close to the subject",
        "https://www.alzinfo.org/understand-alzheimers/clinical-stages-of-alzheimers/"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Symptom",
            "symptom": "Memory Loss",
            "operator": ">",
            "value": 40
          },
          "transition": "DiagnosisEncounter",
          "remarks": [
            "if the symptom is sufficiently noticeable enough people can be diagnosed in this stage, if not they will be diagnosed in the next stage"
          ]
        },
        {
          "condition": {
            "condition_type": "Symptom",
            "symptom": "Memory Loss",
            "operator": ">",
            "value": 30
          },
          "transition": "ModerateDecline"
        },
        {
          "transition": "MildMemoryLoss"
        }
      ]
    },
    "DiagnosisEncounter": {
      "type": "Encounter",
      "wellness": true,
      "remarks": [
        "This is the enounter where alzheimer's is diagnosed. ",
        "Typical life expectancy after an Alzheimer’s diagnosis is 4-to-8 years. (Alzheimer’s Association)"
      ],
      "direct_transition": "Diagnosis_MMSE_Score"
    },
    "Diagnosis_MMSE_Score": {
      "type": "Observation",
      "category": "survey",
      "range": {
        "low": 18,
        "high": 25
      },
      "remarks": [
        "The maximum MMSE score is 30 points. A score of 20 to 24 suggests mild dementia, ",
        "13 to 20 suggests moderate dementia, and less than 12 indicates severe dementia",
        "http://www.alz.org/alzheimers_disease_steps_to_diagnosis.asp",
        "also available is the Clinical Dementia Rating (CDR)",
        "http://alzheimer.wustl.edu/cdr/cdr.htm"
      ],
      "unit": "(score)",
      "codes": [
        {
          "system": "LOINC",
          "code": "72106-8",
          "display": "Total score [MMSE]"
        }
      ],
      "direct_transition": "Dementia_CarePlan"
    },
    "Dementia_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "DiagnosisEncounter",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "386257007",
          "display": "Demential management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "850261000000100",
          "display": "Education about dementia"
        },
        {
          "system": "SNOMED-CT",
          "code": "710125008",
          "display": "Promotion of use of memory skills"
        },
        {
          "system": "SNOMED-CT",
          "code": "315043002",
          "display": "Long term social support"
        }
      ],
      "direct_transition": "FirstPrescription"
    },
    "FirstPrescription": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 2001
          },
          "transition": "FirstPrescription1",
          "remarks": [
            "galantamine(razadyne) fda approved in 2001"
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 1996
          },
          "transition": "FirstPrescription2",
          "remarks": [
            "donepezil(aricept) fda approved in 1996"
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 1993
          },
          "transition": "FirstPrescription3",
          "remarks": [
            "tarine first available in 1993"
          ]
        },
        {
          "transition": "ModerateDecline",
          "remarks": [
            "before 1993 there were no specific drugs approved for Alzheimer’s by the fda"
          ]
        }
      ]
    },
    "FirstPrescription1": {
      "type": "MedicationOrder",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "Alzheimer's Medication",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "602735",
          "display": "Galantamine 4 MG [Razadyne]"
        }
      ],
      "direct_transition": "ModerateDecline"
    },
    "FirstPrescription2": {
      "type": "MedicationOrder",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "Alzheimer's Medication",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "997221",
          "display": "Donepezil hydrochloride 10 MG [Aricept]"
        }
      ],
      "direct_transition": "ModerateDecline"
    },
    "FirstPrescription3": {
      "type": "MedicationOrder",
      "target_encounter": "DiagnosisEncounter",
      "assign_to_attribute": "Alzheimer's Medication",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "313185",
          "display": "Tacrine 10 MG Oral Capsule"
        }
      ],
      "direct_transition": "ModerateDecline"
    },
    "ModerateDecline": {
      "type": "Delay",
      "range": {
        "low": 5,
        "high": 7,
        "unit": "months"
      },
      "remarks": [
        "4. Moderate decline, or mild alzheimer's has a mean duration of 2 years.",
        "The diagnosis of alzheimer's can be made with considerable accuracy in this stage",
        "https://www.alzinfo.org/understand-alzheimers/clinical-stages-of-alzheimers/"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Not",
            "condition": {
              "condition_type": "PriorState",
              "name": "DiagnosisEncounter"
            }
          },
          "transition": "DiagnosisEncounter"
        },
        {
          "condition": {
            "condition_type": "Symptom",
            "symptom": "Memory Loss",
            "operator": ">",
            "value": 70
          },
          "transition": "ModeratelySevere_Encounter"
        },
        {
          "transition": "ModerateMemoryLoss"
        }
      ]
    },
    "ModerateMemoryLoss": {
      "type": "Symptom",
      "symptom": "Memory Loss",
      "range": {
        "low": 50,
        "high": 100
      },
      "remarks": [
        "These numbers do not map to any real data, they are just picked mathematically to get the %s right"
      ],
      "direct_transition": "ModerateDecline"
    },
    "ModeratelySevere_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "316744009",
          "display": "Office Visit"
        }
      ],
      "direct_transition": "ModeratelySevere_MMSE_Score"
    },
    "ModeratelySevere_MMSE_Score": {
      "type": "Observation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "72106-8",
          "display": "Total score [MMSE]"
        }
      ],
      "range": {
        "low": 12,
        "high": 18
      },
      "remarks": [
        "The maximum MMSE score is 30 points. A score of 20 to 24 suggests mild dementia, ",
        "13 to 20 suggests moderate dementia, and less than 12 indicates severe dementia",
        "http://www.alz.org/alzheimers_disease_steps_to_diagnosis.asp"
      ],
      "unit": "(score)",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Alzheimer’s Medication",
            "operator": "is not nil"
          },
          "transition": "EndFirstPrescription"
        },
        {
          "transition": "SecondPrescription"
        }
      ]
    },
    "EndFirstPrescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "Alzheimer's Medication",
      "direct_transition": "SecondPrescription"
    },
    "SecondPrescription": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 2014
          },
          "transition": "SecondPrescription1",
          "remarks": [
            "memantine+donepezil(namzaric) fda approved in 2014"
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 2003
          },
          "transition": "SecondPrescription2",
          "remarks": [
            "memantine(namenda) fda approved in 2003"
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">",
            "year": 1996
          },
          "transition": "SecondPrescription3",
          "remarks": [
            "donepezil(aricept) fda approved in 1996"
          ]
        },
        {
          "transition": "End_ModeratelySevere_Encounter"
        }
      ]
    },
    "SecondPrescription1": {
      "type": "MedicationOrder",
      "target_encounter": "ModeratelySevere_Encounter",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1602593",
          "display": "Donepezil hydrochloride 10 MG / Memantine hydrochloride 28 MG [Namzaric]"
        }
      ],
      "direct_transition": "End_ModeratelySevere_Encounter"
    },
    "SecondPrescription2": {
      "type": "MedicationOrder",
      "target_encounter": "ModeratelySevere_Encounter",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "996741",
          "display": "Memantine hydrochloride 2 MG/ML [Namenda]"
        }
      ],
      "direct_transition": "End_ModeratelySevere_Encounter"
    },
    "SecondPrescription3": {
      "type": "MedicationOrder",
      "target_encounter": "ModeratelySevere_Encounter",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "RxNorm",
          "code": "998582",
          "display": "Donepezil hydrochloride 23 MG [Aricept]"
        }
      ],
      "direct_transition": "End_ModeratelySevere_Encounter"
    },
    "End_ModeratelySevere_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "ModeratelySevereDecline"
    },
    "ModeratelySevereDecline": {
      "type": "Delay",
      "range": {
        "low": 12,
        "high": 24,
        "unit": "months"
      },
      "remarks": [
        "5. Moderately severe decline, aka mid-stage or moderate alzheimer's has a mean duration about 1.5 yrs",
        "https://www.alzinfo.org/understand-alzheimers/clinical-stages-of-alzheimers/"
      ],
      "direct_transition": "Severe_Encounter"
    },
    "Severe_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "316744009",
          "display": "Office Visit"
        }
      ],
      "direct_transition": "Severe_MMSE_Score"
    },
    "Severe_MMSE_Score": {
      "type": "Observation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "72106-8",
          "display": "Total score [MMSE]"
        }
      ],
      "range": {
        "low": 6,
        "high": 12
      },
      "remarks": [
        "The maximum MMSE score is 30 points. A score of 20 to 24 suggests mild dementia, ",
        "13 to 20 suggests moderate dementia, and less than 12 indicates severe dementia",
        "http://www.alz.org/alzheimers_disease_steps_to_diagnosis.asp"
      ],
      "unit": "(score)",
      "direct_transition": "End_Severe_Encounter"
    },
    "End_Severe_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "SevereDecline"
    },
    "SevereDecline": {
      "type": "Delay",
      "range": {
        "low": 20,
        "high": 40,
        "unit": "months"
      },
      "remarks": [
        "6. Severe decline, or moderately severe Alzheimer's contains 5 defined substages, the total duration approximately 2.5 yrs"
      ],
      "direct_transition": "VerySevere_Encounter"
    },
    "VerySevere_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Type of Alzheimer's",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "316744009",
          "display": "Office Visit"
        }
      ],
      "direct_transition": "VerySevere_MMSE_Score"
    },
    "VerySevere_MMSE_Score": {
      "type": "Observation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "72106-8",
          "display": "Total score [MMSE]"
        }
      ],
      "range": {
        "low": 0,
        "high": 6
      },
      "remarks": [
        "The maximum MMSE score is 30 points. A score of 20 to 24 suggests mild dementia, ",
        "13 to 20 suggests moderate dementia, and less than 12 indicates severe dementia",
        "http://www.alz.org/alzheimers_disease_steps_to_diagnosis.asp"
      ],
      "unit": "(score)",
      "direct_transition": "End_VerySevere_Encounter"
    },
    "End_VerySevere_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "VerySevereDecline"
    },
    "VerySevereDecline": {
      "type": "Delay",
      "range": {
        "low": 6,
        "high": 12,
        "unit": "months"
      },
      "remarks": [
        "7. Very severe decline, aka late-stage or severe alzheimer's contains 6 functional substages, each with a mean duration ~1 yr",
        "https://www.alzinfo.org/understand-alzheimers/clinical-stages-of-alzheimers/"
      ],
      "distributed_transition": [
        {
          "distribution": 0.16,
          "transition": "Pneumonia"
        },
        {
          "distribution": 0.16,
          "transition": "Death"
        },
        {
          "distribution": 0.68,
          "transition": "VerySevereDecline"
        }
      ]
    },
    "Pneumonia": {
      "type": "ConditionOnset",
      "target_encounter": "PneumoniaEncounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "233604007",
          "display": "Pneumonia"
        }
      ],
      "remarks": [
        "Pneumonia is one of the most common causes of death among Alzheimer’s patients"
      ],
      "direct_transition": "PneumoniaEncounter"
    },
    "PneumoniaEncounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Pneumonia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "32485007",
          "display": "Hospital admission"
        }
      ],
      "direct_transition": "PneumoniaDeath"
    },
    "PneumoniaDeath": {
      "type": "Death",
      "range": {
        "low": 4,
        "high": 14,
        "unit": "days"
      },
      "condition_onset": "Pneumonia",
      "direct_transition": "Terminal"
    },
    "Death": {
      "type": "Death",
      "referenced_by_attribute": "Type of Alzheimer's",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/early_moderate_eczema_obs":{
  "name": "Early Childhood Moderate Eczema Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be mild/moderate and confined to the face and limbs, as is ",
    "commonly seen in young children. See: ",
    "http://onlinelibrary.wiley.com/doi/10.1111/j.1365-2230.2012.04336.x/full"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "range": {
        "low": 10,
        "high": 40
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "range": {
        "low": 0,
        "high": 10
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 10
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 10
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/early_severe_eczema_obs":{
  "name": "Early Childhood Severe Eczema Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be severe but confined to the face and limbs, as is ",
    "commonly seen in young children. See: ",
    "http://onlinelibrary.wiley.com/doi/10.1111/j.1365-2230.2012.04336.x/full"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "range": {
        "low": 40,
        "high": 60
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/mid_moderate_eczema_obs":{
  "name": "Mid Childhood Moderate Eczema Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be mild/moderate and primarilly in the joint flexures, ",
    "as is commonly seen in older children. See: ",
    "http://onlinelibrary.wiley.com/doi/10.1111/j.1365-2230.2012.04336.x/full"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "range": {
        "low": 0,
        "high": 15
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "range": {
        "low": 0,
        "high": 10
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/mid_severe_eczema_obs":{
  "name": "Mid Childhood Severe Eczema Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be severe and primarilly in the joint flexures, ",
    "as is commonly seen in older children. See: ",
    "http://onlinelibrary.wiley.com/doi/10.1111/j.1365-2230.2012.04336.x/full"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "range": {
        "low": 0,
        "high": 15
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "range": {
        "low": 0,
        "high": 20
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 40
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 40
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/moderate_cd_obs":{
  "name": "Moderate Contact Dermatitis Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be moderate and confined to the extremities as is commonly ",
    "seen with contact dermatitis."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "exact": {
        "quantity": 0
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "exact": {
        "quantity": 0
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 10,
        "high": 40
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 15
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis/severe_cd_obs":{
  "name": "Severe Contact Dermatitis Observations",
  "remarks": [
    "A series of observations regarding the prevalence of eczema ",
    "on different portions of the body. In this case the eczema is ",
    "found to be severe and confined to the extremities as is commonly ",
    "seen with contact dermatitis."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Eczema_Obs_Head_And_Neck"
    },
    "Eczema_Obs_Head_And_Neck": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66519-0",
          "display": "Percentage area affected by eczema Head and Neck"
        }
      ],
      "exact": {
        "quantity": 0
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Trunk"
    },
    "Eczema_Obs_Trunk": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66529-9",
          "display": "Percentage area affected by eczema Trunk"
        }
      ],
      "exact": {
        "quantity": 0
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Upper_Extremities"
    },
    "Eczema_Obs_Upper_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66524-0",
          "display": "Percentage area affected by eczema Upper extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 30,
        "high": 75
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Lower_Extremities"
    },
    "Eczema_Obs_Lower_Extremities": {
      "type": "Observation",
      "category": "exam",
      "codes": [
        {
          "system": "LOINC",
          "code": "66534-9",
          "display": "Percentage area affected by eczema Lower extremitiy - bilateral"
        }
      ],
      "range": {
        "low": 0,
        "high": 35
      },
      "unit": "%",
      "direct_transition": "Eczema_Obs_Terminal"
    },
    "Eczema_Obs_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"dermatitis":{
  "name": "Dermatitis",
  "remarks": [
    "Source: https://nationaleczema.org/research/eczema-prevalence/",
    "Known colloquially as Eczema. About 10.7% of children develop dermatitis ",
    "and dermatitis is found in about 10.2% of adults. 31.6M adults overall ",
    "have eczema. 17.8M have moderate to severe cases, usually atopic dermatitis (AD).",
    "Atopic dermatitis usually appears in childhood. 1/3 of all children with AD ",
    "have severe cases. Up to 3% of adults are also living with severe AD, suggesting ",
    "that AD is typically a lifelong condition.",
    "The remaining patients with dermatitis typically have contact dermatitis (CD), ",
    "aggravated by specific substances such as nickel, latex, and chromium. ",
    "2x as many females develop CD as males."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================"
      ],
      "direct_transition": "Delay_For_Atopy"
    },
    "Delay_For_Atopy": {
      "type": "Delay",
      "remarks": [
        "The Atopy module must be processed before any of the allergy modules so ",
        "atopy can appropriately influence allergies. Delaying the smallest possible ",
        "time step to ensure this happens."
      ],
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "transition": "Atopic"
        },
        {
          "transition": "Not_Atopic"
        }
      ]
    },
    "Atopic": {
      "type": "Simple",
      "remarks": [
        "35% of all atopic patients develop AD. See the Atopy model for more info."
      ],
      "distributed_transition": [
        {
          "distribution": 0.35,
          "transition": "Atopic_Dermatitis_Incidence"
        },
        {
          "distribution": 0.65,
          "transition": "Terminal"
        }
      ]
    },
    "Not_Atopic": {
      "type": "Simple",
      "remarks": [
        "There is a small possibility that non-atopic patients still develop AD.",
        "More commonly however, non-atopic patients instead develop contact ",
        "dermatitis sometime during adulthood, often from a person's occupation.",
        "For example, occupational contact dermatitis is common in: ",
        "Metalworkers, Hair Dressers, Healthcare Professionals, Cleaners, ",
        "Construction Workers, Painters, and those in Food Manufacturing."
      ],
      "distributed_transition": [
        {
          "distribution": 0.003125,
          "transition": "Atopic_Dermatitis_Incidence"
        },
        {
          "distribution": 0.043125,
          "transition": "Delay_Until_Adulthood"
        },
        {
          "distribution": 0.95375,
          "transition": "Terminal"
        }
      ]
    },
    "Atopic_Dermatitis_Incidence": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.5,
          "transition": "Early_Childhood_AD"
        },
        {
          "distribution": 0.45,
          "transition": "Mid_Childhood_AD"
        },
        {
          "distribution": 0.05,
          "transition": "Late_Childhood_AD"
        }
      ]
    },
    "Early_Childhood_AD": {
      "type": "Delay",
      "remarks": [
        "Children <1 year old. Early childhood AD is widspread and found ",
        "mainly on the face and extremities."
      ],
      "range": {
        "low": 0,
        "high": 11,
        "unit": "months"
      },
      "direct_transition": "Childhood_Atopic_Dermatitis"
    },
    "Mid_Childhood_AD": {
      "type": "Delay",
      "remarks": [
        "Children <5 years old. AD found in older children (not infants) is ",
        "typically found at the limb flexures, such as the elbow and knee."
      ],
      "range": {
        "low": 12,
        "high": 59,
        "unit": "months"
      },
      "direct_transition": "Childhood_Atopic_Dermatitis"
    },
    "Late_Childhood_AD": {
      "type": "Delay",
      "remarks": [
        "Children <10 years old. AD found in older children (not infants) is ",
        "typically found at the limb flexures, such as the elbow and knee."
      ],
      "range": {
        "low": 60,
        "high": 120,
        "unit": "months"
      },
      "direct_transition": "Childhood_Atopic_Dermatitis"
    },
    "Delay_Until_Adulthood": {
      "type": "Delay",
      "range": {
        "low": 18,
        "high": 35,
        "unit": "years"
      },
      "direct_transition": "Adult_Contact_Dermatitis"
    },
    "Childhood_Atopic_Dermatitis": {
      "type": "ConditionOnset",
      "target_encounter": "PCP_Encounter",
      "assign_to_attribute": "dermatitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "24079001",
          "display": "Atopic dermatitis"
        }
      ],
      "direct_transition": "PCP_Encounter"
    },
    "Adult_Contact_Dermatitis": {
      "type": "ConditionOnset",
      "target_encounter": "PCP_Encounter",
      "assign_to_attribute": "dermatitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "40275004",
          "display": "Contact dermatitis"
        }
      ],
      "direct_transition": "PCP_Encounter"
    },
    "PCP_Encounter": {
      "type": "Encounter",
      "remarks": [
        "The rashes and sensitivity caused by dermatitis are bad enough to drive ",
        "any sensible parents to bring their child to the doctor. The PCP will then ",
        "refer the child to an allergist and/or dermatologist. 1/3 of all AD cases ",
        "are considered 'severe'. Moderate and severe cases are first referred to ",
        "a dermatologist, followed by an allergist."
      ],
      "encounter_class": "ambulatory",
      "reason": "dermatitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Dermatitis_Symptom1"
    },
    "Dermatitis_Symptom1": {
      "type": "Symptom",
      "symptom": "Itchiness",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Dermatitis_Symptom2"
    },
    "Dermatitis_Symptom2": {
      "type": "Symptom",
      "symptom": "Red Skin",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Dermatitis_Symptom3"
    },
    "Dermatitis_Symptom3": {
      "type": "Symptom",
      "symptom": "Rash",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Dermatitis_Careplan"
    },
    "Dermatitis_Careplan": {
      "type": "CarePlanStart",
      "remarks": [
        "Treatment of eczema is all about self care. Typically all a patient can ",
        "do is treat the symptoms and avoid allergens and irritants. Allergy ",
        "tests and specialized treatment by an allergist really didn't exist ",
        "before 1975 - 1980."
      ],
      "reason": "dermatitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "711282006",
          "display": "Skin condition care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "225130001",
          "display": "Application of moisturizer to skin"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.33,
          "remarks": [
            "The mild cases of eczema receive no further treatment unless they get worse."
          ],
          "transition": "Living_With_Dermatitis"
        },
        {
          "distribution": 0.67,
          "transition": "Delay_For_Dermatologist"
        }
      ]
    },
    "Delay_For_Dermatologist": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Dermatologist_Visit"
    },
    "Dermatologist_Visit": {
      "type": "Encounter",
      "remarks": [
        "1/3 of all eczema cases are severe. 0.5 * 0.67 ~= 0.33"
      ],
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Early_Childhood_AD"
          },
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Early_Childhood_AD_Moderate_Observations"
            },
            {
              "distribution": 0.5,
              "transition": "Early_Childhood_AD_Severe_Observations"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Mid_Childhood_AD"
          },
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Mid_Childhood_AD_Moderate_Observations"
            },
            {
              "distribution": 0.5,
              "transition": "Mid_Childhood_AD_Severe_Observations"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Adult_Contact_Dermatitis"
          },
          "distributions": [
            {
              "distribution": 0.67,
              "transition": "Moderate_Contact_Dermatitis_Observations"
            },
            {
              "distribution": 0.33,
              "transition": "Severe_Contact_Dermatitis_Observations"
            }
          ]
        }
      ]
    },
    "Early_Childhood_AD_Moderate_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/early_moderate_eczema_obs",
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Early_Childhood_AD_Severe_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/early_severe_eczema_obs",
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Mid_Childhood_AD_Moderate_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/mid_moderate_eczema_obs",
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Mid_Childhood_AD_Severe_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/mid_severe_eczema_obs",
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Moderate_Contact_Dermatitis_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/moderate_cd_obs",
      "direct_transition": "Prescribe_Corticosteroid"
    },
    "Severe_Contact_Dermatitis_Observations": {
      "type": "CallSubmodule",
      "submodule": "dermatitis/severe_cd_obs",
      "direct_transition": "Prescribe_Corticosteroid"
    },
    "Prescribe_Corticosteroid": {
      "type": "MedicationOrder",
      "remarks": [
        "These are only prescribed to adults or older children."
      ],
      "reason": "dermatitis",
      "codes": [
        {
          "system": "RxNorm",
          "code": "106258",
          "display": "Hydrocortisone 10 MG/ML Topical Cream"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Advise_To_Visit_Allergist": {
      "type": "SetAttribute",
      "attribute": "visit_allergist",
      "value": true,
      "direct_transition": "End_Dermatologist_Visit"
    },
    "End_Dermatologist_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Living_With_Dermatitis"
    },
    "Living_With_Dermatitis": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " LIVING WITH DERMATITS                                                ",
        "======================================================================"
      ],
      "range": {
        "low": 8,
        "high": 16,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Adult_Contact_Dermatitis"
          },
          "transition": "Potential_CD_Resolves"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Childhood_Atopic_Dermatitis"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "PriorState",
                  "name": "Potentially_Outgrow_AD"
                }
              },
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 16,
                "unit": "years"
              }
            ]
          },
          "transition": "Potentially_Outgrow_AD"
        },
        {
          "transition": "Potential_AD_Flare_Up"
        }
      ]
    },
    "Potentially_Outgrow_AD": {
      "type": "Simple",
      "remarks": [
        "About 75% of children with Atopic Dermatitis outgrow it by adolescence."
      ],
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "Dermatitis_Resolves"
        },
        {
          "distribution": 0.25,
          "transition": "Potential_AD_Flare_Up"
        }
      ]
    },
    "Potential_AD_Flare_Up": {
      "type": "Simple",
      "remarks": [
        "A 'flare-up' is a heightening of the symptoms from Atopic Dermatitis, including ",
        "very itchy skin, spreading rashes, and sensitivity. For older children (>12) and ",
        "adults an immunosuppressant and topical corticosteroid are prescribed to control ",
        "the symptoms. ",
        "Only patients with moderate to severe AD paid a visit to the Dermatologist."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Dermatologist_Visit"
          },
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "AD_Flare_Up"
            },
            {
              "distribution": 0.9,
              "transition": "Living_With_Dermatitis"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Living_With_Dermatitis"
            }
          ]
        }
      ]
    },
    "AD_Flare_Up": {
      "type": "Delay",
      "remarks": [
        "A flare-up is bad enough to seek treatment. Usually another visit to the dermatologist ",
        "will suffice."
      ],
      "range": {
        "low": 1,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Dermatologist_Visit_For_Flare_Up"
    },
    "Dermatologist_Visit_For_Flare_Up": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "dermatitis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 16,
                "unit": "years"
              },
              {
                "condition_type": "Date",
                "operator": ">=",
                "year": 1983
              }
            ]
          },
          "transition": "Prescribe_Immunosuppressant"
        },
        {
          "transition": "Prescribe_Corticosteroid_For_Flare_Up"
        }
      ]
    },
    "Prescribe_Immunosuppressant": {
      "type": "MedicationOrder",
      "reason": "dermatitis",
      "remarks": [
        "Immunosuppressants like cyclosporine were invented in the late 1970's ",
        "and came to market in the early 1980s. Cyclosporine was available starting ",
        "in 1983."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "835900",
          "display": "cycloSPORINE 50 MG Oral Capsule"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Prescribe_Corticosteroid_For_Flare_Up"
    },
    "Prescribe_Corticosteroid_For_Flare_Up": {
      "type": "MedicationOrder",
      "reason": "dermatitis",
      "codes": [
        {
          "system": "RxNorm",
          "code": "106258",
          "display": "Hydrocortisone 10 MG/ML Topical Cream"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "Treating_Flare_Up"
    },
    "Treating_Flare_Up": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "835900",
                "display": "cycloSPORINE 50 MG Oral Capsule"
              }
            ]
          },
          "transition": "End_Immunosuppressant"
        },
        {
          "transition": "End_Corticosteroid"
        }
      ]
    },
    "End_Immunosuppressant": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Immunosuppressant",
      "direct_transition": "End_Corticosteroid"
    },
    "End_Corticosteroid": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Corticosteroid_For_Flare_Up",
      "direct_transition": "Living_With_Dermatitis"
    },
    "Potential_CD_Resolves": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "Dermatitis_Resolves"
        },
        {
          "distribution": 0.25,
          "transition": "Living_With_Dermatitis"
        }
      ]
    },
    "Dermatitis_Resolves": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "dermatitis",
      "direct_transition": "End_Dermatitis_CarePlan"
    },
    "End_Dermatitis_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "Dermatitis_Careplan",
      "direct_transition": "Dermatitis_Symptom1_Ends"
    },
    "Dermatitis_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Itchiness",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Dermatitis_Symptom2_Ends"
    },
    "Dermatitis_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Red Skin",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Dermatitis_Symptom3_Ends"
    },
    "Dermatitis_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Rash",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"ear_infections":{
  "name": "Ear Infections",
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "No_Infection"
    },
    "No_Infection": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 3,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.02010556,
              "transition": "Gets_Ear_Infection",
              "remarks": [
                "72.38% of children < 3 get an ear infection. This gives an incidence of .7238 / (3 * 12) = 0.020105556 per month",
                "Source: https://www.nidcd.nih.gov/health/statistics/ambulatory-care-visits-diagnosis-otitis-media"
              ]
            },
            {
              "distribution": 0.97989444,
              "transition": "No_Infection"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 6,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.0131625,
              "transition": "Gets_Ear_Infection",
              "remarks": [
                "31.59% of children between 3 and 5 get an ear infection. .3159 / (2 * 12) = 0.01316250",
                "Source: https://www.nidcd.nih.gov/health/statistics/ambulatory-care-visits-diagnosis-otitis-media"
              ]
            },
            {
              "distribution": 0.9868375,
              "transition": "No_Infection"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.0007444,
              "transition": "Gets_Ear_Infection",
              "remarks": [
                "10.72% of children 6 - 18 get an ear infection. .1072 / (12 * 12) = .00074444",
                "Source: https://www.nidcd.nih.gov/health/statistics/ambulatory-care-visits-diagnosis-otitis-media"
              ]
            },
            {
              "distribution": 0.99925556,
              "transition": "No_Infection"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.00020833,
              "transition": "Gets_Ear_Infection",
              "remarks": [
                "It is widely accepted that 0.25% of adults get an ear infection (per anum).",
                "Based on 79 year average life expectancy in the U.S. .0025 / 12 = .00020833",
                "Source for life expectancy: http://data.worldbank.org/indicator/SP.DYN.LE00.IN",
                "Source for ear infection rates: http://patient.info/doctor/acute-otitis-media-in-adults"
              ]
            },
            {
              "distribution": 0.99979167,
              "transition": "No_Infection"
            }
          ]
        }
      ]
    },
    "Gets_Ear_Infection": {
      "type": "ConditionOnset",
      "target_encounter": "Ear_Infection_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "65363002",
          "display": "Otitis media"
        }
      ],
      "direct_transition": "Ear_Infection_Encounter"
    },
    "Ear_Infection_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "reason": "Gets_Ear_Infection",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.859,
          "transition": "Ear_Infection_Prescribed_Antibiotic",
          "remarks": [
            "Could not find an exact source for the rate at which antibiotics are perscribed.",
            "Was able to find some relevant statistics for acute otitis media from this source:",
            "http://pediatrics.aappublications.org/content/early/2014/09/09/peds.2014-0605"
          ]
        },
        {
          "distribution": 0.141,
          "transition": "Ear_Infection_Prescribed_OTC_Painkiller",
          "remarks": [
            "Assuming those not perscribed antibiotics were encourage to use over-the-counter pain killers."
          ]
        }
      ]
    },
    "Ear_Infection_Prescribed_Antibiotic": {
      "type": "CallSubmodule",
      "submodule": "medications/ear_infection_antibiotic",
      "direct_transition": "Ear_Infection_Prescribed_OTC_Painkiller"
    },
    "Ear_Infection_Prescribed_OTC_Painkiller": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Encounter"
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Ear_Infection_Prescription_Taken"
    },
    "Ear_Infection_Prescription_Taken": {
      "type": "Delay",
      "exact": {
        "quantity": 14,
        "unit": "days"
      },
      "direct_transition": "End_Ear_Infection_Medications"
    },
    "End_Ear_Infection_Medications": {
      "type": "Simple",
      "remarks": [
        "For any of the possible medications that could be prescribed in this module ",
        "this state cycles through the attributes and ends the medications until no ",
        "more prescriptions are remaining.",
        "The attributes that this state looks for are: ",
        "1. otc_pain_reliever ",
        "2. antibiotic_prescription ",
        "Any other medications prescribed in this module and not assigned to one of those ",
        "three attributes must be ended manually elsewhere in the module, the special ",
        "exception being 'opioid_prescription' (handled by the Opioid Addiction module)."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "antibiotic_prescription",
            "operator": "is not nil"
          },
          "transition": "End_Antibiotic_Prescription"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "otc_pain_reliever",
            "operator": "is not nil"
          },
          "transition": "End_Non_Opioid_Prescription"
        },
        {
          "remarks": [
            "Fallback transition after all medications are ended"
          ],
          "transition": "Next_Wellness_Encounter"
        }
      ]
    },
    "End_Antibiotic_Prescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "antibiotic_prescription",
      "direct_transition": "Unset_Antibiotic_Prescription_Attribute"
    },
    "Unset_Antibiotic_Prescription_Attribute": {
      "type": "SetAttribute",
      "attribute": "antibiotic_prescription",
      "direct_transition": "End_Ear_Infection_Medications"
    },
    "End_Non_Opioid_Prescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "otc_pain_reliever",
      "direct_transition": "Unset_Non_Opioid_Prescription_Attribute"
    },
    "Unset_Non_Opioid_Prescription_Attribute": {
      "type": "SetAttribute",
      "attribute": "otc_pain_reliever",
      "direct_transition": "End_Ear_Infection_Medications"
    },
    "Next_Wellness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Ear_Infection_End"
    },
    "Ear_Infection_End": {
      "type": "ConditionEnd",
      "condition_onset": "Gets_Ear_Infection",
      "direct_transition": "Loopback_No_Infection"
    },
    "Loopback_No_Infection": {
      "type": "Simple",
      "direct_transition": "No_Infection",
      "remarks": [
        "this state only exists to make the graph look nicer"
      ]
    }
  }
}
,
"epilepsy":{
  "name": "Epilepsy",
  "remarks": [
    "Epilepsy is a neurological disorder marked by sudden recurrent episodes of sensory disturbance, ",
    "loss of consciousness, or convulsions, associated with abnormal electrical activity in the brain. ",
    "Information on treatment, prevalence, and incidence of specific epilepsy types from the CDC: ",
    "https://www.cdc.gov/epilepsy/basics/fast-facts.htm"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "distributed_transition": [
        {
          "distribution": 0.023,
          "transition": "Ages_0_1"
        },
        {
          "distribution": 0.0192,
          "transition": "Ages_1_10"
        },
        {
          "distribution": 0.0194,
          "transition": "Ages_10_15"
        },
        {
          "distribution": 0.0192,
          "transition": "Ages_15_55"
        },
        {
          "distribution": 0.0192,
          "transition": "Ages_55_Plus"
        },
        {
          "distribution": 0.9,
          "transition": "Terminal"
        }
      ]
    },
    "Ages_0_1": {
      "type": "Delay",
      "remarks": [
        "Age ranges taken from an interview with Dr. Friedman, NYU Langone"
      ],
      "range": {
        "low": 0,
        "high": 1,
        "unit": "years"
      },
      "direct_transition": "Suspected_Epilepsy"
    },
    "Ages_1_10": {
      "type": "Delay",
      "remarks": [
        "Age ranges taken from an interview with Dr. Friedman, NYU Langone"
      ],
      "range": {
        "low": 1,
        "high": 10,
        "unit": "years"
      },
      "direct_transition": "Suspected_Epilepsy"
    },
    "Ages_10_15": {
      "type": "Delay",
      "remarks": [
        "Age ranges taken from an interview with Dr. Friedman, NYU Langone"
      ],
      "range": {
        "low": 10,
        "high": 15,
        "unit": "years"
      },
      "direct_transition": "Suspected_Epilepsy"
    },
    "Ages_15_55": {
      "type": "Delay",
      "remarks": [
        "Age ranges taken from an interview with Dr. Friedman, NYU Langone"
      ],
      "range": {
        "low": 15,
        "high": 55,
        "unit": "years"
      },
      "direct_transition": "Suspected_Epilepsy"
    },
    "Ages_55_Plus": {
      "type": "Delay",
      "remarks": [
        "Age ranges taken from an interview with Dr. Friedman, NYU Langone"
      ],
      "range": {
        "low": 55,
        "high": 90,
        "unit": "years"
      },
      "direct_transition": "Suspected_Epilepsy"
    },
    "Suspected_Epilepsy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Male"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Female"
        }
      ]
    },
    "Male": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.55,
          "transition": "Seizure_Disorder"
        },
        {
          "distribution": 0.45,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        ""
      ]
    },
    "Female": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.45,
          "transition": "Seizure_Disorder"
        },
        {
          "distribution": 0.55,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Figures derived from interview with Dr. Friedman, NYU Langone Medical Center."
      ]
    },
    "Seizure_Disorder": {
      "type": "ConditionOnset",
      "target_encounter": "Seizure_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "128613002",
          "display": "Seizure disorder"
        }
      ],
      "direct_transition": "Seizure_Encounter",
      "remarks": [
        ""
      ],
      "assign_to_attribute": "seizure"
    },
    "Seizure_Encounter": {
      "type": "Encounter",
      "wellness": false,
      "encounter_class": "emergency",
      "reason": "seizure",
      "remarks": [
        "Patients start being diagnosed with seizure disorder when they have a seizure."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "direct_transition": "History_of_Seizure"
    },
    "History_of_Seizure": {
      "type": "ConditionOnset",
      "target_encounter": "Seizure_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "703151001",
          "display": "History of single seizure (situation)"
        }
      ],
      "direct_transition": "EEG_Test"
    },
    "EEG_Test": {
      "type": "Procedure",
      "duration": {
        "low": 60,
        "high": 180,
        "unit": "minutes"
      },
      "target_encounter": "Seizure_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "54550000",
          "display": "Seizure Count Cerebral Cortex Electroencephalogram (EEG)"
        }
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Epilepsy"
          },
          "transition": "Living_with_Seizures"
        },
        {
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Epilepsy"
            },
            {
              "distribution": 0.6,
              "transition": "Living_with_Seizures"
            }
          ]
        }
      ],
      "remarks": [
        "For patients who have already been diagnosed with Epilepsy, the diagnosis is not re-issued. Those patients go back to living with seizures."
      ]
    },
    "Epilepsy": {
      "type": "ConditionOnset",
      "target_encounter": "Seizure_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "84757009",
          "display": "Epilepsy"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.33,
          "transition": "Carbamazepine"
        },
        {
          "distribution": 0.33,
          "transition": "Diazepam"
        },
        {
          "distribution": 0.34,
          "transition": "Clonazepam"
        }
      ]
    },
    "Living_with_Seizures": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.33,
          "transition": "Carbamazepine"
        },
        {
          "distribution": 0.33,
          "transition": "Diazepam"
        },
        {
          "distribution": 0.34,
          "transition": "Clonazepam"
        }
      ]
    },
    "Carbamazepine": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "308971",
          "display": "Carbamazepine[Tegretol]"
        }
      ],
      "assign_to_attribute": "seizure_meds",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "End_Seizure_Encounter"
          },
          "transition": "End_Medicine_Encounter"
        },
        {
          "transition": "End_Seizure_Encounter"
        }
      ]
    },
    "Diazepam": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "563026",
          "display": "Diazepam [Valium]"
        }
      ],
      "assign_to_attribute": "seizure_meds",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "End_Seizure_Encounter"
          },
          "transition": "End_Medicine_Encounter"
        },
        {
          "transition": "End_Seizure_Encounter"
        }
      ]
    },
    "Clonazepam": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1153378",
          "display": "Clonazepam [Klonopin]"
        }
      ],
      "assign_to_attribute": "seizure_meds",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "End_Seizure_Encounter"
          },
          "transition": "End_Medicine_Encounter"
        },
        {
          "transition": "End_Seizure_Encounter"
        }
      ]
    },
    "End_Seizure_Encounter": {
      "type": "EncounterEnd",
      "discharge_disposition": {
        "system": "NUBC",
        "code": "01",
        "display": "Discharged to home care or self care (routine discharge)"
      },
      "direct_transition": "Undergoing_Seizure_Treatment"
    },
    "Undergoing_Seizure_Treatment": {
      "type": "Delay",
      "remarks": [
        "Patients manage their epilepsy or seizures with meds on an ongoing basis."
      ],
      "range": {
        "low": 4,
        "high": 26,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Seizure_Encounter"
        },
        {
          "distribution": 0.1,
          "transition": "Sudden_Cardiac_Death"
        },
        {
          "distribution": 0.7,
          "transition": "Medication_Guard"
        }
      ]
    },
    "Medication_Guard": {
      "type": "Delay",
      "remarks": [
        "Wait a few weeks and then keep taking meds (after refill), change, or discontinue them."
      ],
      "range": {
        "low": 4,
        "high": 12,
        "unit": "weeks"
      },
      "direct_transition": "Medication_End"
    },
    "Medication_End": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "seizure_meds",
      "distributed_transition": [
        {
          "distribution": 0.7,
          "transition": "Medicine_Encounter"
        },
        {
          "distribution": 0.3,
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Patients who are living with seizures either keep taking meds or go into remission. Their diagnoses doesn't disappear in remission."
      ]
    },
    "Medicine_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "wellness": true,
      "reason": "seizure",
      "remarks": [
        "Patients start with medication prescription or follow-up."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "390906007",
          "display": "Follow-Up Encounter"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.33,
          "transition": "Carbamazepine"
        },
        {
          "distribution": 0.33,
          "transition": "Diazepam"
        },
        {
          "distribution": 0.34,
          "transition": "Clonazepam"
        }
      ]
    },
    "End_Medicine_Encounter": {
      "type": "EncounterEnd",
      "discharge_disposition": {
        "system": "NUBC",
        "code": "01",
        "display": "Discharged to home care or self care (routine discharge)"
      },
      "direct_transition": "Undergoing_Seizure_Treatment"
    },
    "Sudden_Cardiac_Death": {
      "type": "Death",
      "range": {
        "low": 12,
        "high": 52,
        "unit": "weeks"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "95281009",
          "display": "Sudden Cardiac Death"
        }
      ],
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"female_reproduction":{
  "name": "Female Reproduction",
  "remarks": [
    "This module models female reproduction from birth to death. Once females ",
    "reach reproductive age, this module operates on a monthly cycle. Each month, ",
    "a sexually active female has a non-zero chance of becoming pregnant. This ",
    "chance is greatly reduced by taking a contraceptive.",
    "If a female becomes pregnant, the monthly cycles are suspended until the ",
    "pregnancy terminates. The monthly reproductive cycles permanently end once ",
    "a female reaches menopause at age 50.",
    "This module of course operates on several assumptions: ",
    "1. All females have regular, monthly reproductive cycles (some don't) ",
    "2. All females reach menopause at age 50 "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Delay_For_Reproductive_Age"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Delay_For_Reproductive_Age": {
      "type": "Delay",
      "exact": {
        "quantity": 14,
        "unit": "years"
      },
      "direct_transition": "Female_Reproductive_Cycle"
    },
    "Female_Reproductive_Cycle": {
      "type": "Delay",
      "remarks": [
        "Adults have a cycle of 21 - 35 days (avg. 28). Source: ",
        "https://www.womenshealth.gov/a-z-topics/menstruation-and-menstrual-cycle"
      ],
      "range": {
        "low": 21,
        "high": 35,
        "unit": "days"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 50,
            "unit": "years"
          },
          "transition": "Menopause_Reached"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnant",
            "operator": "==",
            "value": true
          },
          "transition": "Pregnancy_Guard"
        },
        {
          "transition": "Reproductive_Cycle_Outcome"
        }
      ]
    },
    "Menopause_Reached": {
      "type": "Simple",
      "remarks": [
        "This state just exists to make the graph look nicer. Once menopause is ",
        "reached, head to Terminal."
      ],
      "direct_transition": "Terminal"
    },
    "Pregnancy_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Attribute",
        "attribute": "pregnant",
        "operator": "==",
        "value": false
      },
      "direct_transition": "Female_Reproductive_Cycle"
    },
    "Reproductive_Cycle_Outcome": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " REPRODUCTIVE CYCLE OUTCOMES                                          ",
        "======================================================================",
        "This is where the magic happens. If females are sexually active, there is ",
        "a non-zero chance of becoming pregnant. The 'sexually_active' attribute is ",
        "set by the 'sexual_activity' module."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "infertile",
            "operator": "==",
            "value": true
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "sexually_active",
            "operator": "==",
            "value": true
          },
          "transition": "Sexually_Active"
        },
        {
          "transition": "Not_Sexually_Active"
        }
      ]
    },
    "Sexually_Active": {
      "type": "Simple",
      "direct_transition": "Contraceptive_Incidence"
    },
    "Contraceptive_Incidence": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " CONTACEPTIVE INCIDENCE                                               ",
        "======================================================================",
        "Effectiveness of different contraceptive types. The following percentages ",
        "indicate the number out of 100 women who experience planned or unplanned ",
        "pregnancy within the first year of use. These percentages are scaled for ",
        "a monthly time step: ",
        "| Method         | Annual Chance of Pregnancy | Monthly Chance of Pregnancy | ",
        "|----------------|----------------------------|-----------------------------| ",
        "| none           |             85%            |            19.3%            | ",
        "| withdrawal     |             22%            |            2.05%            | ",
        "| condom         |             18%            |            1.640%           | ",
        "| pill           |              9%            |            0.692%           | ",
        "| patch          |              9%            |            0.692%           | ",
        "| ring           |              9%            |            0.692%           | ",
        "| injectable     |              6%            |            0.514%           | ",
        "| IUD            |          0.2 - 0.8%        |       0.0167 - 0.0669%      | ",
        "| sterilization  |         0.15 - 0.5%        |       0.0125 - 0.0418%      | ",
        "| implant        |            0.05%           |           0.00417%          | ",
        "'---------------------------------------------------------------------------' ",
        "Source: https://www.cdc.gov/reproductivehealth/unintendedpregnancy/pdf/contraceptive_methods_508.pdf"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "none"
          },
          "distributions": [
            {
              "distribution": 0.193,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.807,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "withdrawal"
          },
          "distributions": [
            {
              "distribution": 0.0205,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.9795,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "condom"
          },
          "distributions": [
            {
              "distribution": 0.0164,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.9836,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "pill"
          },
          "distributions": [
            {
              "distribution": 0.00692,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99318,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "patch"
          },
          "distributions": [
            {
              "distribution": 0.00692,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99318,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "ring"
          },
          "distributions": [
            {
              "distribution": 0.00692,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99318,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "injectable"
          },
          "distributions": [
            {
              "distribution": 0.00514,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99486,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "iud"
          },
          "distributions": [
            {
              "distribution": 0.00342,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99658,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "sterilization"
          },
          "distributions": [
            {
              "distribution": 0.00271,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.99729,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "contraceptive_type",
            "operator": "==",
            "value": "implant"
          },
          "distributions": [
            {
              "distribution": 0.000417,
              "transition": "Become_Pregnant"
            },
            {
              "distribution": 0.999583,
              "transition": "Next_Reproductive_Cycle"
            }
          ]
        }
      ]
    },
    "Not_Sexually_Active": {
      "type": "Simple",
      "direct_transition": "Next_Reproductive_Cycle"
    },
    "Become_Pregnant": {
      "type": "SetAttribute",
      "remarks": [
        "When true, the 'pregnant' attribute triggers the start of a cycle in ",
        "the Pregnancy module."
      ],
      "attribute": "pregnant",
      "value": true,
      "direct_transition": "Pregnancy_Guard"
    },
    "Next_Reproductive_Cycle": {
      "type": "Simple",
      "direct_transition": "Female_Reproductive_Cycle"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"fibromyalgia":{
  "name": "Fibromyalgia",
  "remarks": [
    "Fibromyalgia is a disorder of the central nervous system causing widespread chronic pain. It ",
    "is categorized as a type of arthritis and is 7x more likely in women than in men. The chronic ",
    "pain of fibromyalgia is sometimes treated with opioids if it's particularly severe.",
    "Fibromyalgia wasn't officially recognized as a disease until 1987 by the AMA. Specialized drugs ",
    "to treat fibromyalgia (Lyrica, Cymbalta, Savella) didn't become available until the mid 2000's.",
    "Information on treatment, prevalence, and incidence of specific arthritis types from the CDC: ",
    "http://www.cdc.gov/arthritis/basics/types.html",
    "Overall prevalence of arthritis: ",
    "http://www.cdc.gov/arthritis/data_statistics/national-statistics.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        " | Arthritis Type | Prevalence | Ratio F:M | ",
        " ------------------------------------------- ",
        " | Fibromyalgia   |   0.01670  |    7:1    | ",
        " ------------------------------------------- "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.0020875,
              "transition": "Delay_Until_Fibromyalgia"
            },
            {
              "distribution": 0.9989125,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.0146125,
              "transition": "Delay_Until_Fibromyalgia"
            },
            {
              "distribution": 0.9853875,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Delay_Until_Fibromyalgia": {
      "type": "Delay",
      "range": {
        "low": 25,
        "high": 80,
        "unit": "years"
      },
      "direct_transition": "Fibromyalgia_Guard"
    },
    "Fibromyalgia_Guard": {
      "type": "Guard",
      "remarks": [
        "Fibromyalgia wasn't recognized as a disease by the AMA until 1987. It's ",
        "diagnosis is still somewhat controversial."
      ],
      "allow": {
        "condition_type": "Date",
        "operator": ">=",
        "year": 1987
      },
      "direct_transition": "Fibromyalgia"
    },
    "Fibromyalgia": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " FIBROMYALGIA                                                         ",
        "======================================================================",
        "Source: http://www.cdc.gov/arthritis/basics/fibromyalgia.htm",
        "People with fibromyalgia have at least one hospitalization every 3 years.",
        "5.5M ambulatory care visits every year."
      ],
      "target_encounter": "Fibromyalgia_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "95417003",
          "display": "Primary fibromyalgia syndrome"
        }
      ],
      "direct_transition": "Fibromyalgia_Diagnosis"
    },
    "Fibromyalgia_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Fibromyalgia_Symptom1"
    },
    "Fibromyalgia_Symptom1": {
      "type": "Symptom",
      "symptom": "Muscle Pain",
      "range": {
        "low": 25,
        "high": 100
      },
      "direct_transition": "Fibromyalgia_Symptom2"
    },
    "Fibromyalgia_Symptom2": {
      "type": "Symptom",
      "symptom": "Muscle Tenderness",
      "range": {
        "low": 25,
        "high": 100
      },
      "direct_transition": "Fibromyalgia_Symptom3"
    },
    "Fibromyalgia_Symptom3": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Fibromyalgia_Symptom4"
    },
    "Fibromyalgia_Symptom4": {
      "type": "Symptom",
      "symptom": "Sleep Disturbances",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Fibromyalgia_Symptom5"
    },
    "Fibromyalgia_Symptom5": {
      "type": "Symptom",
      "symptom": "Cognitive Difficulties",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Fibromyalgia_Symptom6"
    },
    "Fibromyalgia_Symptom6": {
      "type": "Symptom",
      "symptom": "Stiffness",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Fibromyalgia_CarePlan"
    },
    "Fibromyalgia_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Fibromyalgia_Diagnosis",
      "assign_to_attribute": "fibromyalgia_careplan",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Joint mobility exercises"
        },
        {
          "system": "SNOMED-CT",
          "code": "226060000",
          "display": "Stress management"
        }
      ],
      "direct_transition": "Strong_NSAID"
    },
    "Strong_NSAID": {
      "type": "MedicationOrder",
      "target_encounter": "Fibromyalgia_Diagnosis",
      "reason": "Fibromyalgia",
      "remarks": [
        "A stronger NSAID pain reliever than the basic Aleve."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "849437",
          "display": "Naproxen sodium 550 MG [Anaprox]"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_Until_Fibromyalgia_Episode"
    },
    "Delay_Until_Fibromyalgia_Episode": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "years"
      },
      "direct_transition": "Fibromyalgia_Episode"
    },
    "Fibromyalgia_Episode": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "32485007",
          "display": "Hospital admission"
        }
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">=",
            "year": 2008
          },
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Prescribe_Lyrica"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Cymbalta"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Savella"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Date",
                "operator": ">=",
                "year": 1990
              },
              {
                "condition_type": "Attribute",
                "attribute": "opioid_prescription",
                "operator": "is nil"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Opioid",
              "remarks": [
                "Opioids are prescribed in the especially painful cases. Otherwise ",
                "all the patient can do is manage his or her pain."
              ]
            },
            {
              "distribution": 0.8,
              "transition": "End_Episode_Encounter"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "End_Episode_Encounter"
            }
          ]
        }
      ]
    },
    "Prescribe_Lyrica": {
      "type": "MedicationOrder",
      "target_encounter": "Fibromyalgia_Episode",
      "assign_to_attribute": "fibromyalgia_prescription",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "RxNorm",
          "code": "607015",
          "display": "pregabalin 100 MG [Lyrica]"
        }
      ],
      "direct_transition": "End_Episode_Encounter"
    },
    "Prescribe_Cymbalta": {
      "type": "MedicationOrder",
      "target_encounter": "Fibromyalgia_Episode",
      "assign_to_attribute": "fibromyalgia_prescription",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "RxNorm",
          "code": "596927",
          "display": "DULoxetine 20 MG [Cymbalta]"
        }
      ],
      "direct_transition": "End_Episode_Encounter"
    },
    "Prescribe_Savella": {
      "type": "MedicationOrder",
      "target_encounter": "Fibromyalgia_Episode",
      "assign_to_attribute": "fibromyalgia_prescription",
      "reason": "Fibromyalgia",
      "codes": [
        {
          "system": "RxNorm",
          "code": "833137",
          "display": "Milnacipran hydrochloride 100 MG [Savella]"
        }
      ],
      "direct_transition": "End_Episode_Encounter"
    },
    "Prescribe_Opioid": {
      "type": "MedicationOrder",
      "target_encounter": "Fibromyalgia_Episode",
      "assign_to_attribute": "opioid_prescription",
      "reason": "Fibromyalgia",
      "remarks": [
        "This medication is managed/ended by the opioid_addiction module."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049636",
          "display": "Acetaminophen 325 MG / oxyCODONE Hydrochloride 2.5 MG [Percocet]"
        }
      ],
      "direct_transition": "End_Episode_Encounter"
    },
    "End_Episode_Encounter": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "fibromyalgia_prescription",
            "operator": "is not nil"
          },
          "transition": "Take_Prescription"
        },
        {
          "transition": "Delay_Until_Fibromyalgia_Episode"
        }
      ]
    },
    "Take_Prescription": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "direct_transition": "End_Fibromyalgia_Prescription"
    },
    "End_Fibromyalgia_Prescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "fibromyalgia_prescription",
      "direct_transition": "Delay_Until_Fibromyalgia_Episode"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"food_allergies":{
  "name": "Food Allergies",
  "remarks": [
    "This module manages the progression of food allergies in a patient's lifetime.",
    "Food allergies are onset by the 'allergies.json' module."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Delay_For_Allergic_Reaction_To_Food"
    },
    "Delay_For_Allergic_Reaction_To_Food": {
      "type": "Delay",
      "remarks": [
        "Those children with food allergies will have an allergic reaction ",
        "within their first 2 years of life. That's how the food allergy gets ",
        "discovered and diagnosed."
      ],
      "range": {
        "low": 6,
        "high": 18,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "food_allergy",
            "operator": "is not nil"
          },
          "transition": "Allergic_Reaction_To_Food"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Allergic_Reaction_To_Food": {
      "type": "Simple",
      "complex_transition": [
        {
          "remarks": [
            "Those who are atopic AND have a food allergy have a higher chance ",
            "of having a severe allergic reaction."
          ],
          "condition": {
            "condition_type": "Attribute",
            "attribute": "atopic",
            "operator": "is not nil"
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Moderate_Reaction_To_Food"
            },
            {
              "distribution": 0.4,
              "transition": "Severe_Reaction_To_Food"
            }
          ]
        },
        {
          "remarks": [
            "Those who are not atopic but have a food allergy are less ",
            "likely to have a severe allergic reaction."
          ],
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Moderate_Reaction_To_Food"
            },
            {
              "distribution": 0.2,
              "transition": "Severe_Reaction_To_Food"
            }
          ]
        }
      ]
    },
    "Moderate_Reaction_To_Food": {
      "type": "Simple",
      "remarks": [
        "A moderate reaction to food prompts a visit to the PCP and a referral ",
        "to an allergist."
      ],
      "direct_transition": "Delay_For_PCP_Visit"
    },
    "Severe_Reaction_To_Food": {
      "type": "CallSubmodule",
      "remarks": [
        "A severe reaction to food prompts an ED visit, followed by a follow-up ",
        "at the PCP, then a referral to an allergist."
      ],
      "submodule": "allergies/severe_allergic_reaction",
      "direct_transition": "Delay_For_PCP_Visit"
    },
    "Delay_For_PCP_Visit": {
      "type": "Delay",
      "remarks": [
        "Following a moderate or severe allergic reaction, a PCP visit probably ",
        "happens same day or next day."
      ],
      "range": {
        "low": 0,
        "high": 1,
        "unit": "days"
      },
      "direct_transition": "PCP_Visit_For_Food_Allergy"
    },
    "PCP_Visit_For_Food_Allergy": {
      "type": "Encounter",
      "remarks": [
        "The PCP will refer the patient to an allergist to run tests and make ",
        "an official diagnosis. However, they will recommend that potential ",
        "food allergens be avoided until the test results confirm what the allergy ",
        "is."
      ],
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "food_allergy_careplan",
            "operator": "is nil"
          },
          "transition": "Food_Allergy_CarePlan"
        },
        {
          "transition": "End_PCP_Visit_For_Food_Allergy"
        }
      ]
    },
    "Food_Allergy_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "food_allergy_careplan",
      "remarks": [
        "Allergy maintenance is all about self care."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "326051000000105",
          "display": "Self care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "409002",
          "display": "Food allergy diet"
        },
        {
          "system": "SNOMED-CT",
          "code": "58332002",
          "display": "Allergy education"
        }
      ],
      "direct_transition": "Advise_To_Visit_Allergist"
    },
    "Advise_To_Visit_Allergist": {
      "type": "SetAttribute",
      "attribute": "visit_allergist",
      "value": true,
      "direct_transition": "End_PCP_Visit_For_Food_Allergy"
    },
    "End_PCP_Visit_For_Food_Allergy": {
      "type": "EncounterEnd",
      "remarks": [
        "If the patient has already seen an allergist and this is just another ",
        "incident of a reaction to food, don't refer them to the allergist again."
      ],
      "direct_transition": "Living_With_Food_Allergies"
    },
    "Living_With_Food_Allergies": {
      "type": "Delay",
      "range": {
        "low": 12,
        "high": 24,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">",
                "quantity": 16,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "outgrew_food_allergies",
                "operator": "is nil"
              }
            ]
          },
          "transition": "Potential_To_Outgrow_Allergies"
        },
        {
          "transition": "Potential_Allergic_Reaction_To_Food"
        }
      ]
    },
    "Potential_To_Outgrow_Allergies": {
      "type": "CallSubmodule",
      "remarks": [
        "Sensisitivity to milk, egg, soy, and wheat is the easiest to overcome.",
        "However, peanut, treenut, fish, and shellfish allergies persist through ",
        "adulthood. This logic is handled by a submodule."
      ],
      "submodule": "allergies/outgrow_food_allergies",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "outgrew_food_allergies",
            "operator": "==",
            "value": "true"
          },
          "transition": "Terminal"
        },
        {
          "transition": "Potential_Allergic_Reaction_To_Food"
        }
      ]
    },
    "Potential_Allergic_Reaction_To_Food": {
      "type": "Simple",
      "remarks": [
        "Children with food allergies typically show sensitivity at a young age.",
        "Many will end up outgrowing their food allergies by adolesence or adulthood.",
        "About 200,000 ED visits each year for a food allergy:",
        "https://www.foodallergy.org/file/facts-stats.pdf",
        "Most likely to have an allergic reaction requiring medical attention are ",
        "children and young adults."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 20,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "Allergic_Reaction_To_Food"
            },
            {
              "distribution": 0.9,
              "transition": "Living_With_Food_Allergies"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.02,
              "transition": "Allergic_Reaction_To_Food"
            },
            {
              "distribution": 0.98,
              "transition": "Living_With_Food_Allergies"
            }
          ]
        }
      ]
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"gout":{
  "name": "Gout",
  "remarks": [
    "Gout is a painful inflammation of the joints caused by a buildup of uric acid. ",
    "Gout is 3x more likely in men and is heavily influenced by diet. Gout appears as perioid ",
    "flare-ups that are treated with medication and subside for a period of time.",
    "Information on treatment, prevalence, and incidence of specific arthritis types from the CDC: ",
    "http://www.cdc.gov/arthritis/basics/types.html",
    "Overall prevalence of arthritis: ",
    "http://www.cdc.gov/arthritis/data_statistics/national-statistics.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        " | Arthritis Type | Prevalence | Ratio F:M | ",
        " ------------------------------------------- ",
        " | Gout           |   0.03900  |    1:3    | ",
        " ------------------------------------------- "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.02925,
              "transition": "Delay_Until_Gout"
            },
            {
              "distribution": 0.97075,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.00975,
              "transition": "Delay_Until_Gout"
            },
            {
              "distribution": 0.99025,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Delay_Until_Gout": {
      "type": "Delay",
      "range": {
        "low": 25,
        "high": 80,
        "unit": "years"
      },
      "direct_transition": "Gout"
    },
    "Gout": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " GOUT                                                                 ",
        "======================================================================",
        "Source: http://www.cdc.gov/arthritis/basics/gout.html"
      ],
      "target_encounter": "Gout_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "90560007",
          "display": "Gout"
        }
      ],
      "direct_transition": "Gout_Symptom1"
    },
    "Gout_Symptom1": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Gout_Symptom2"
    },
    "Gout_Symptom2": {
      "type": "Symptom",
      "symptom": "Joint Swelling",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Gout_Symptom3"
    },
    "Gout_Symptom3": {
      "type": "Symptom",
      "symptom": "Joint Redness",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Gout_Symptom4"
    },
    "Gout_Symptom4": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Gout_Diagnosis"
    },
    "Gout_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Gout",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "gout_careplan",
            "operator": "is nil"
          },
          "transition": "Gout_CarePlan"
        },
        {
          "transition": "Gout_Nonopioid_Pain_Medication"
        }
      ]
    },
    "Gout_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Gout_Diagnosis",
      "assign_to_attribute": "gout_careplan",
      "reason": "Gout",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183301007",
          "display": "Physical exercises"
        },
        {
          "system": "SNOMED-CT",
          "code": "229580007",
          "display": "Ice therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "226234005",
          "display": "Healthy diet"
        }
      ],
      "direct_transition": "Gout_Nonopioid_Pain_Medication"
    },
    "Gout_Nonopioid_Pain_Medication": {
      "type": "Simple",
      "remarks": [
        "NSAIDs are used to quickly alleviate the pain and inflammation of gout."
      ],
      "distributed_transition": [
        {
          "distribution": 0.6,
          "transition": "Strong_NSAID"
        },
        {
          "distribution": 0.4,
          "transition": "Colchicine"
        }
      ]
    },
    "Strong_NSAID": {
      "type": "MedicationOrder",
      "target_encounter": "Gout_Diagnosis",
      "assign_to_attribute": "gout_nsaid",
      "reason": "Gout",
      "remarks": [
        "A stronger NSAID pain reliever than the basic Aleve."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "849437",
          "display": "Naproxen sodium 550 MG [Anaprox]"
        }
      ],
      "direct_transition": "Uric_Acid_Reducer"
    },
    "Colchicine": {
      "type": "MedicationOrder",
      "target_encounter": "Gout_Diagnosis",
      "assign_to_attribute": "gout_nsaid",
      "reason": "Gout",
      "remarks": [
        "For those who can't stand the side effects of a strong NSAID."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "858069",
          "display": "Colchicine 0.6 MG [Colcrys]"
        }
      ],
      "direct_transition": "Uric_Acid_Reducer"
    },
    "Uric_Acid_Reducer": {
      "type": "MedicationOrder",
      "target_encounter": "Gout_Diagnosis",
      "reason": "Gout",
      "codes": [
        {
          "system": "RxNorm",
          "code": "573839",
          "display": "Allopurinol 100 MG [Zyloprim]"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Gout_Treatment_Period"
    },
    "Gout_Treatment_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      },
      "direct_transition": "End_Gout_Nonopioid"
    },
    "End_Gout_Nonopioid": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "gout_nsaid",
      "direct_transition": "End_Uric_Acid_Reducer"
    },
    "End_Uric_Acid_Reducer": {
      "type": "MedicationEnd",
      "medication_order": "Uric_Acid_Reducer",
      "direct_transition": "Wait_For_Next_Gout_Attack"
    },
    "Wait_For_Next_Gout_Attack": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "years"
      },
      "remarks": [
        "Gout has an annual incidence of about 5.7%. In an average 2-year period this is about 11.1%.",
        "Source: http://rheumatology.oxfordjournals.org/content/early/2011/01/11/rheumatology.keq363.long"
      ],
      "distributed_transition": [
        {
          "distribution": 0.111,
          "transition": "Gout_Diagnosis"
        },
        {
          "distribution": 0.889,
          "transition": "Wait_For_Next_Gout_Attack"
        }
      ]
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"homelessness":{
  "name": "Homelessness",
  "remarks": [
    "Primary source of info is the 2016 U.S. Department of Housing and Urban Development (HUD) ",
    "2016 Annual Homeless Assessment Report (AHAR) to Congress (AHAR)",
    "https://www.hudexchange.info/resources/documents/2016-AHAR-Part-1.pdf"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Potential_Homelessness"
    },
    "Potential_Homelessness": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "remarks": [
        "On a single night in 2016, 549,928 people were experiencing homelessness in the United States.",
        "Assuming a US population of 300M, 550k/300M == ~0.18%",
        "we assume that these are more likely to be of low SES, but not guaranteed. ",
        "these transition %s result higher than .18% because people do not stay homeless forever.",
        "from http://www.endhomelessness.org/library/entry/the-state-of-homelessness-in-america-2012 : ",
        "  'The odds for a person in the general U.S. population of experiencing homelessness in the course of a year are 1 in 194.",
        "For an individual living doubled up the odds are 1 in 12.",
        "For a released prisoner they are 1 in 13.",
        "For a young adult who has aged out of foster care they are 1 in 11.'  ",
        "synthea doesn't model these factors so we'll give a higher risk to people of low SES",
        "'doubled up population' is ~ 6 million == ~ 2%, prison population is ~ 1%"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Begin_Homelessness"
          },
          "remarks": "people who have ever been homeless have the highest risk of becoming homeless again",
          "distributions": [
            {
              "distribution": 0.99,
              "transition": "Potential_Homelessness"
            },
            {
              "distribution": 0.01,
              "transition": "Begin_Homelessness"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "Low"
          },
          "distributions": [
            {
              "distribution": 0.009975,
              "transition": "Potential_Homelessness"
            },
            {
              "distribution": 0.990025,
              "transition": "Begin_Homelessness"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.999,
              "transition": "Potential_Homelessness"
            },
            {
              "distribution": 0.001,
              "transition": "Begin_Homelessness"
            }
          ]
        }
      ]
    },
    "Begin_Homelessness": {
      "type": "SetAttribute",
      "attribute": "homeless",
      "value": true,
      "direct_transition": "Homelessness_Counter"
    },
    "Homelessness_Counter": {
      "type": "Counter",
      "attribute": "instances_of_homelessness",
      "action": "increment",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "instances_of_homelessness",
            "operator": ">=",
            "value": 4
          },
          "remarks": [
            "Chronic homelessness is defined as either 12 consecutive months of homelessness",
            "OR 4+ occasions of homelessness over 3 years. For simplicity in this model assume",
            "4 total occasions --> chronic",
            "January 2016 - ~1 in 5 individuals experiencing homelessness had chronic patterns of homelessness."
          ],
          "transition": "Chronic_Homelessness"
        },
        {
          "transition": "Temporary_Homelessness"
        }
      ]
    },
    "Chronic_Homelessness": {
      "type": "SetAttribute",
      "attribute": "homelessness_category",
      "value": "chronic",
      "direct_transition": "Living_Homeless"
    },
    "Temporary_Homelessness": {
      "type": "SetAttribute",
      "attribute": "homelessness_category",
      "value": "temporary",
      "direct_transition": "Living_Homeless"
    },
    "Living_Homeless": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "homelessness_category",
            "operator": "==",
            "value": "temporary"
          },
          "remarks": [
            "About 44% of homeless people are sheltered. ",
            "The average length of stay in emergency shelter was 69 days for single men, 51 days for single women, and 70 days for families.",
            "For those staying in transitional housing, the avg stay for single men was 175 days, 196 days for single women, and 223 days for families.",
            "Permanent supportive housing had the longest stay, with 556 days for single men, 571 days for single women",
            "http://www.nationalhomeless.org/factsheets/How_Many.html",
            "we assume the expected length of homelessness to be ~6 months"
          ],
          "distributions": [
            {
              "distribution": 0.44,
              "transition": "Visit_Homeless_Shelter"
            },
            {
              "distribution": 0.16,
              "transition": "End_Homelessness"
            },
            {
              "distribution": 0.4,
              "transition": "Living_Homeless"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "homelessness_category",
            "operator": "==",
            "value": "chronic"
          },
          "remarks": [
            "Of chronically homeless individuals, more than two thirds (68% or 52,890 people) were staying",
            "in unsheltered locations such as under bridges, in cars, or in abandoned buildings. ",
            "This is much greater than the unsheltered rate for all people ",
            "experiencing homelessness as individuals in the United States, which was 44 percent.",
            "--We assume that chronically homeless individuals are less likely to visit a homeless shelter"
          ],
          "distributions": [
            {
              "distribution": 0.32,
              "transition": "Visit_Homeless_Shelter"
            },
            {
              "distribution": 0.08,
              "transition": "End_Homelessness"
            },
            {
              "distribution": 0.6,
              "transition": "Living_Homeless"
            }
          ]
        }
      ]
    },
    "Visit_Homeless_Shelter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "210098006",
          "display": "Domiciliary or rest home patient evaluation and management"
        }
      ],
      "direct_transition": "Information_Gathering"
    },
    "Information_Gathering": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "311791003",
          "display": "Information gathering (procedure)"
        }
      ],
      "direct_transition": "Question_1",
      "remarks": [
        "the following questions are temporary. going forward we would like these risk factors to be modeled directly",
        "the LOINC codes selected & responses are a best guess at modeling the information here"
      ]
    },
    "Question_1": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "76690-7",
          "display": "Sexual orientation"
        }
      ],
      "attribute": "sexual_orientation",
      "unit": "{nominal}",
      "direct_transition": "Question_2"
    },
    "Question_2": {
      "type": "Simple",
      "remarks": [
        "simple random statistics here until we have a real HIV model",
        "National Alliance to End Homelessness estimates that 3.4% of homeless people are HIV+",
        "compared to 0.4% in the general population. (2006 data)",
        "http://www.nationalhomeless.org/factsheets/hiv.html"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Question_2_Positive"
          },
          "transition": "Question_2_Positive",
          "remarks": [
            "If they previously said they are HIV+ then stick with it"
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.966,
              "transition": "Question_2_Negative"
            },
            {
              "distribution": 0.034,
              "transition": "Question_2_Positive"
            }
          ]
        }
      ]
    },
    "Question_2_Positive": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "55277-8",
          "display": "HIV status"
        }
      ],
      "exact": {
        "quantity": "HIV positive"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_3"
    },
    "Question_2_Negative": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "55277-8",
          "display": "HIV status"
        }
      ],
      "exact": {
        "quantity": "not HIV positive"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_3"
    },
    "Question_3": {
      "type": "Simple",
      "remarks": [
        "see http://www.nationalhomeless.org/factsheets/addiction.pdf "
      ],
      "distributed_transition": [
        {
          "distribution": 0.26,
          "transition": "Question_3_Abuser"
        },
        {
          "distribution": 0.74,
          "transition": "Question_3_Nonabuser"
        }
      ]
    },
    "Question_3_Abuser": {
      "type": "Observation",
      "remarks": [
        "here we leverage our existing opioids model, for simplicity.",
        "in the real world homelessness has a stronger asssociation with drug abuse",
        "see http://www.nationalhomeless.org/factsheets/addiction.pdf "
      ],
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "28245-9",
          "display": "Abuse Status [OMAHA]"
        }
      ],
      "exact": {
        "quantity": "Severe signs/symptoms"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_4"
    },
    "Question_3_Nonabuser": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "28245-9",
          "display": "Abuse Status [OMAHA]"
        }
      ],
      "exact": {
        "quantity": "No signs/symptoms"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_4"
    },
    "Question_4": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "71802-3",
          "display": "Housing status"
        }
      ],
      "exact": {
        "quantity": "Patient is homeless"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_5"
    },
    "Question_5": {
      "type": "Simple",
      "remarks": [
        "estimated >70% of homeless do not have health insurance http://www.nationalhomeless.org/factsheets/health.html"
      ],
      "distributed_transition": [
        {
          "distribution": 0.25,
          "transition": "Question_5_Yes"
        },
        {
          "distribution": 0.75,
          "transition": "Question_5_No"
        }
      ]
    },
    "Question_5_Yes": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "63513-6",
          "display": "Are you covered by health insurance or some other kind of health care plan [PhenX]"
        }
      ],
      "exact": {
        "quantity": "Yes"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_6"
    },
    "Question_5_No": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "63513-6",
          "display": "Are you covered by health insurance or some other kind of health care plan [PhenX]"
        }
      ],
      "exact": {
        "quantity": "No"
      },
      "unit": "{nominal}",
      "direct_transition": "Question_6"
    },
    "Question_6": {
      "type": "Observation",
      "category": "social-history",
      "codes": [
        {
          "system": "LOINC",
          "code": "46240-8",
          "display": "History of Hospitalizations+​Outpatient visits"
        }
      ],
      "range": {
        "low": 0,
        "high": 10
      },
      "unit": "{count}",
      "direct_transition": "End_Shelter_Visit"
    },
    "End_Shelter_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Living_Homeless"
    },
    "End_Homelessness": {
      "type": "SetAttribute",
      "attribute": "homeless",
      "value": false,
      "direct_transition": "Potential_Homelessness"
    }
  }
}
,
"injuries":{
  "name": "Injuries",
  "remarks": [
    "This module waits for an injury to occur then plays out that injury's typical ",
    "progress in a patient's medical record. Some injuries may be both fatal or ",
    "non-fatal.",
    "Incidence is complicated. There are a lot of variables that play into incidence including ",
    "age, gender, race, socioeconomic status, etc. I made some simplifications for now that we can ",
    "adjust later if the prevalence is glaringly inaccurate. For now, I assume:",
    "1. Men and women get injured at the same rates (not true in all cases...) ",
    "2. Race and socioeconomic status don't significantly affect injury rates (they probably do...) ",
    "3. A person can't have multiple injuries at the same time (in reality, they can...) ",
    "Supported injury types are: ",
    "1.  'spinal'       - injuries to the spinal cord or fractures of the spine ",
    "2.  'gunshot'      - gunshot wounds ",
    "3.  'concussion'   - common concussion from accidents, falls, and sports ",
    "4.  'whiplash'     - common injury in automobile accidents, falls, and sports ",
    "5.  'broken_bone'  - randomly selects between collarbone, arm, wrist, hip, and ankle (top 5)",
    "6.  'burn'         - 1st, 2nd, or 3rd degree burns ",
    "7.  'laceration'   - randomly selects between hand, foot, face, arm, and leg ",
    "8.  'sprain'       - a sprained ankle or wrist ",
    "9.  'knee'         - a torn ligament (ACL, MCL, meniscus) ",
    "10. 'shoulder'     - a torn rotator cuff ",
    "Sources are included throughout the module where supplemental information was needed.",
    "Every injury pathway in this module assigns a care plan for the patient. This care ",
    "plan is referenced by the 'injury_careplan' attribute and is ended at the conclusion ",
    "of the injury.",
    "Injury pathways may also prescribe a medication and assign it to one of these attributes: ",
    "1. 'opioid_prescription' ",
    "2. 'otc_pain_reliever' ",
    "3. 'antibiotic_prescription' ",
    "Any medication order with one of these attributes will be automatically ended at the ",
    "conclusion of the injury. Be sure to only assign one medication to each of these ",
    "attributes in a given injury pathway to avoid conflict. Opioid prescriptions will be handled ",
    "and ended by the Opioid Addiction module."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Wait_For_Injury"
    },
    "Wait_For_Injury": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        "We give patients the opportunity to get injured about once per year. The range ",
        "here is inteded to introduce some randomness to the data so patients aren't all ",
        "getting injured on the same day each year.",
        "Distributions of injuries are initially based on the 2015 U.S. resident population (308.75M) and the ",
        "following incidence rates: ",
        "Spinal:        0.000153   http://www.boneandjointburden.org/2014-report/iiia12/traumatic-spine-fractures",
        "Gunshots:      0.000318   http://smartgunlaws.org/gun-deaths-and-injuries-statistics/",
        "Concussions:   0.005100   https://www.cdc.gov/traumaticbraininjury/pdf/tbi_report_to_congress_epi_and_rehab-a.pdf",
        "Whiplash:      0.004780   http://www.srisd.com/consumer_site/epidemiology.htm (This may be an overestimate)",
        "Broken bones:  0.058300   http://www.boneandjointburden.org/docs/By%20The%20Numbers%20-%20MSK%20Injuries.pdf",
        "Burns:         0.003980   http://www.burnfoundation.org/programs/resource.cfm?c=2&a=6",
        "Lacerations:   0.026100   (see broken bones, above)",
        "Sprains:       0.054400   https://www.ncbi.nlm.nih.gov/pubmed/20926721",
        "Knees:         0.002290   https://www.ncbi.nlm.nih.gov/pubmed/22506941",
        "Shoulders:     0.001470   http://rheumatology.oxfordjournals.org/content/45/2/215.full",
        "From these estimates the incidences may be adjusted slightly (see notes when a rate is adjusted) ",
        "to yield reasonable prevalences."
      ],
      "range": {
        "low": 10,
        "high": 14,
        "unit": "months"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "transition": "Child_Incidence_Rates"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<=",
            "quantity": 65,
            "unit": "years"
          },
          "transition": "Adult_Incidence_Rates"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 65,
            "unit": "years"
          },
          "transition": "Elderly_Incidence_Rates"
        }
      ]
    },
    "Child_Incidence_Rates": {
      "type": "Simple",
      "remarks": [
        "The incidence rates for children (0 - 17)."
      ],
      "distributed_transition": [
        {
          "distribution": 0.000153,
          "transition": "Spinal_Injury"
        },
        {
          "distribution": 0.000318,
          "transition": "Gunshot_Injury"
        },
        {
          "distribution": 0.0101,
          "transition": "Concussion_Injury",
          "remarks": [
            "Our initial estimate for concussions seem too low. Since most concussion injuries ",
            "happen in sports and children are more likely to get concussions (for this reason) ",
            "doubling the concussion rate for children from 0.0051 --> 0.0101."
          ]
        },
        {
          "distribution": 0.00478,
          "transition": "Whiplash_Injury"
        },
        {
          "distribution": 0.025,
          "transition": "Broken_Bone_Injury",
          "remarks": [
            "Children get broken bones far more often than adults. To make a patient's record ",
            "realistic I still cut the original probability in half from 0.0583 --> 0.025 "
          ]
        },
        {
          "distribution": 0.00398,
          "transition": "Burn_Injury"
        },
        {
          "distribution": 0.015,
          "transition": "Laceration_Injury"
        },
        {
          "distribution": 0.025,
          "remarks": [
            "Sprains are slightly more likely in kids."
          ],
          "transition": "Sprain_Injury"
        },
        {
          "distribution": 0.00229,
          "transition": "Knee_Injury"
        },
        {
          "distribution": 0.00147,
          "transition": "Shoulder_Injury"
        },
        {
          "distribution": 0.5,
          "transition": "Wait_For_Injury",
          "remarks": [
            "The GMF's distributed transition will take this transition and automatically adjust the distribution ",
            "out of 1.0 if none of the other transitions are taken, see: ",
            "https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-Transitions#distributed"
          ]
        }
      ]
    },
    "Adult_Incidence_Rates": {
      "type": "Simple",
      "remarks": [
        "The incidence rates for adults (18 - 65)."
      ],
      "distributed_transition": [
        {
          "distribution": 0.000153,
          "transition": "Spinal_Injury"
        },
        {
          "distribution": 0.000318,
          "transition": "Gunshot_Injury"
        },
        {
          "distribution": 0.00765,
          "transition": "Concussion_Injury",
          "remarks": [
            "Adults are likely to get concussions from sports, work-related accidents, and ",
            "motor vehicle accidents. Increasing the incidence in adults by 1.5 from ",
            "0.0051 --> 0.00765"
          ]
        },
        {
          "distribution": 0.00478,
          "transition": "Whiplash_Injury"
        },
        {
          "distribution": 0.007,
          "transition": "Broken_Bone_Injury",
          "remarks": [
            "Adults break fewer bones than children or the elderly. Shifting incidence away ",
            "from adults towards children. Reducing this incidence by a factor of 8 from ",
            "0.0583 --> 0.007 "
          ]
        },
        {
          "distribution": 0.00398,
          "transition": "Burn_Injury"
        },
        {
          "distribution": 0.015,
          "transition": "Laceration_Injury"
        },
        {
          "distribution": 0.0125,
          "transition": "Sprain_Injury"
        },
        {
          "distribution": 0.00229,
          "transition": "Knee_Injury"
        },
        {
          "distribution": 0.00147,
          "transition": "Shoulder_Injury"
        },
        {
          "distribution": 0.5,
          "transition": "Wait_For_Injury",
          "remarks": [
            "The GMF's distributed transition will take this transition and automatically adjust the distribution ",
            "out of 1.0 if none of the other transitions are taken, see: ",
            "https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-Transitions#distributed"
          ]
        }
      ]
    },
    "Elderly_Incidence_Rates": {
      "type": "Simple",
      "remarks": [
        "The incidence rates for elderly (65+)."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "osteoporosis",
            "operator": "==",
            "value": true
          },
          "distributions": [
            {
              "distribution": 0.000153,
              "transition": "Spinal_Injury"
            },
            {
              "distribution": 0.000318,
              "transition": "Gunshot_Injury"
            },
            {
              "distribution": 0.0051,
              "transition": "Concussion_Injury"
            },
            {
              "distribution": 0.00478,
              "transition": "Whiplash_Injury"
            },
            {
              "distribution": {
                "attribute": "probability_of_fall_injury",
                "default": 0.06
              },
              "remarks": [
                "Highest probability for elderly with osteoporosis.",
                "see also http://www.shef.ac.uk/FRAX/charts.aspx",
                "10-yr probability of major fracture varies significantly based on age & bone density",
                "assume a medium risk of 40% chance over 10 years ~~> 6% chance per yr"
              ],
              "transition": "Broken_Bone_Injury"
            },
            {
              "distribution": 0.00398,
              "transition": "Burn_Injury"
            },
            {
              "distribution": 0.015,
              "transition": "Laceration_Injury"
            },
            {
              "distribution": 0.0125,
              "transition": "Sprain_Injury"
            },
            {
              "distribution": 0.00229,
              "transition": "Knee_Injury"
            },
            {
              "distribution": 0.00147,
              "transition": "Shoulder_Injury"
            },
            {
              "distribution": 0.5,
              "transition": "Wait_For_Injury",
              "remarks": [
                "The GMF's distributed transition will take this transition and automatically adjust the distribution ",
                "out of 1.0 if none of the other transitions are taken, see: ",
                "https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-Transitions#distributed"
              ]
            }
          ]
        },
        {
          "remarks": [
            "elderly patients who do not have osteoporosis"
          ],
          "distributions": [
            {
              "distribution": 0.000153,
              "transition": "Spinal_Injury"
            },
            {
              "distribution": 0.000318,
              "transition": "Gunshot_Injury"
            },
            {
              "distribution": 0.0051,
              "transition": "Concussion_Injury"
            },
            {
              "distribution": 0.00478,
              "transition": "Whiplash_Injury"
            },
            {
              "distribution": {
                "attribute": "probability_of_fall_injury",
                "default": 0.035
              },
              "remarks": [
                "Retain high probability for elderly - reduced somewhat here since these are the patients without osteoporosis"
              ],
              "transition": "Broken_Bone_Injury"
            },
            {
              "distribution": 0.00398,
              "transition": "Burn_Injury"
            },
            {
              "distribution": 0.015,
              "transition": "Laceration_Injury"
            },
            {
              "distribution": 0.0125,
              "transition": "Sprain_Injury"
            },
            {
              "distribution": 0.00229,
              "transition": "Knee_Injury"
            },
            {
              "distribution": 0.00147,
              "transition": "Shoulder_Injury"
            },
            {
              "distribution": 0.5,
              "transition": "Wait_For_Injury",
              "remarks": [
                "The GMF's distributed transition will take this transition and automatically adjust the distribution ",
                "out of 1.0 if none of the other transitions are taken, see: ",
                "https://github.com/synthetichealth/synthea/wiki/Generic-Module-Framework%3A-Transitions#distributed"
              ]
            }
          ]
        }
      ]
    },
    "Spinal_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SPINAL INJURY                                                        ",
        "======================================================================",
        "Further supported by the following incidence statistics (from 2010): ",
        "http://www.boneandjointburden.org/2014-report/iiia12/traumatic-spine-fractures ",
        "16 - 25% of spinal fractures result in neurological damage. This aligns with ",
        "The incidence of spinal cord injury folowing a spinal fracture. For simplicity ",
        "All spinal fractures with spinal cord damage also result in neurological damage."
      ],
      "direct_transition": "ED_Visit_For_Spinal_Injury"
    },
    "ED_Visit_For_Spinal_Injury": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "distributed_transition": [
        {
          "transition": "Spinal_Cord_Damage",
          "distribution": 0.25
        },
        {
          "transition": "No_Spinal_Cord_Damage",
          "distribution": 0.75
        }
      ]
    },
    "Spinal_Injury_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "75162002",
          "display": "Spinal cord injury rehabilitation"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "231181000000100",
          "display": "Delivery of rehabilitation for spinal cord injury"
        },
        {
          "system": "SNOMED-CT",
          "code": "77476009",
          "display": "Application of back brace"
        }
      ],
      "direct_transition": "Delay_After_Spinal_Surgery"
    },
    "Spinal_Cord_Damage": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Spinal_Injury",
      "assign_to_attribute": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1734006",
          "display": "Fracture of the vertebral column with spinal cord injury"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.49,
          "remarks": [
            "Nearly half of all patients die from traumatic spinal cord injury. ",
            "Source: https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3831332/"
          ],
          "transition": "Death_Spinal_Cord"
        },
        {
          "distribution": 0.51,
          "transition": "Neurological_Damage"
        }
      ]
    },
    "Neurological_Damage": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Spinal_Injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698754002",
          "display": "Chronic paralysis due to lesion of spinal cord"
        }
      ],
      "direct_transition": "Spinal_Surgery"
    },
    "No_Spinal_Cord_Damage": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Spinal_Injury",
      "assign_to_attribute": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "15724005",
          "display": "Fracture of vertebral column without spinal cord injury"
        }
      ],
      "direct_transition": "Spinal_Injury_CarePlan"
    },
    "Spinal_Surgery": {
      "type": "Procedure",
      "reason": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305425002",
          "display": "Admission to neurosurgical department"
        }
      ],
      "direct_transition": "Spinal_Injury_CarePlan"
    },
    "Delay_After_Spinal_Surgery": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "days"
      },
      "direct_transition": "Spinal_Injury_Treatment_Encounter"
    },
    "Spinal_Injury_Treatment_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Spinal_Injury_Prescribe_Opioid"
    },
    "Spinal_Injury_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "End_Spinal_Injury_Encounter"
    },
    "End_Spinal_Injury_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Spinal_Treatment_Period"
    },
    "Spinal_Treatment_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "months"
      },
      "direct_transition": "Spinal_Injury_Followup"
    },
    "Spinal_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "spinal_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Spinal_Injury"
    },
    "End_Spinal_Injury": {
      "type": "ConditionEnd",
      "remarks": [
        "This only ends the initial, acute spinal injury. If the patient had spinal ",
        "cord damage and survived, his/her chronic paralysis will persist for life."
      ],
      "referenced_by_attribute": "spinal_injury",
      "direct_transition": "End_Spinal_Injury_Followup"
    },
    "End_Spinal_Injury_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Gunshot_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " GUNSHOT INJURY                                                       ",
        "======================================================================",
        "Further supported by the following statistics (2010): ",
        "http://smartgunlaws.org/gun-deaths-and-injuries-statistics/",
        "Gunshot deaths:                  31,076  => 29.8%",
        "Non-fatal hospital discharges:   73,505  => 70.2%",
        "Total gunshot injuries:         104,581"
      ],
      "direct_transition": "ED_Visit_For_Gunshot_Injury"
    },
    "ED_Visit_For_Gunshot_Injury": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Gunshot_Wound"
    },
    "Gunshot_Wound": {
      "type": "ConditionOnset",
      "assign_to_attribute": "gunshot_wound",
      "target_encounter": "ED_Visit_For_Gunshot_Injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "262574004",
          "display": "Bullet wound"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.298,
          "transition": "Death_Gunshot_Wound"
        },
        {
          "distribution": 0.702,
          "transition": "Gunshot_Injury_Treatment"
        }
      ]
    },
    "Gunshot_Injury_Treatment": {
      "type": "Simple",
      "remarks": [
        "This is an aribitrary distribution between wounds requiring surgery ",
        "and wounds that do not (just grazed by the bullet). Assuming that most ",
        "gunshot wounds will require surgery."
      ],
      "distributed_transition": [
        {
          "distribution": 0.85,
          "transition": "Gunshot_Wound_Surgery"
        },
        {
          "distribution": 0.15,
          "transition": "Gunshot_Wound_CarePlan"
        }
      ]
    },
    "Gunshot_Wound_Surgery": {
      "type": "Procedure",
      "reason": "Gunshot_Wound",
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305433001",
          "display": "Admission to trauma surgery department"
        }
      ],
      "direct_transition": "Gunshot_Wound_Prescribe_Pain_Medication"
    },
    "Gunshot_Wound_Prescribe_Pain_Medication": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.7,
          "transition": "Gunshot_Wound_Prescribe_Opioid"
        },
        {
          "distribution": 0.3,
          "transition": "Gunshot_Wound_Prescribe_Non_Opioid"
        }
      ]
    },
    "Gunshot_Wound_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "Gunshot_Wound_Prescribe_Non_Opioid"
    },
    "Gunshot_Wound_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "Gunshot_Wound_CarePlan"
    },
    "Gunshot_Wound_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "Gunshot_Wound",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225358003",
          "display": "Wound care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "385949008",
          "display": "Dressing change management"
        },
        {
          "system": "SNOMED-CT",
          "code": "439830001",
          "display": "Behavior to prevent infection"
        }
      ],
      "direct_transition": "End_Gunshot_Encounter"
    },
    "End_Gunshot_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Gunshot_Wound_Healing_Period"
    },
    "Gunshot_Wound_Healing_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 4,
        "unit": "months"
      },
      "direct_transition": "Gunshot_Injury_Followup"
    },
    "Gunshot_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Gunshot_Wound",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "Gunshot_Wound_Ends"
    },
    "Gunshot_Wound_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Gunshot_Wound",
      "direct_transition": "End_Gunshot_Followup"
    },
    "End_Gunshot_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Concussion_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " CONCUSSION                                                           ",
        "======================================================================",
        "Further supported by the following CDC reports: ",
        "http://www.cdc.gov/traumaticbraininjury/data/rates.html",
        "https://www.cdc.gov/traumaticbraininjury/pdf/tbi_report_to_congress_epi_and_rehab-a.pdf",
        "http://www.cdc.gov/traumaticbraininjury/pdf/bluebook_factsheet-a.pdf"
      ],
      "direct_transition": "ED_Visit_For_Concussion"
    },
    "ED_Visit_For_Concussion": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "Mild_Concussion"
        },
        {
          "distribution": 0.2,
          "transition": "Moderate_Concussion"
        },
        {
          "distribution": 0.05,
          "transition": "Severe_Concussion"
        }
      ]
    },
    "Mild_Concussion": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Concussion",
      "assign_to_attribute": "concussion_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "62106007",
          "display": "Concussion with no loss of consciousness"
        }
      ],
      "direct_transition": "Concussion_CarePlan"
    },
    "Moderate_Concussion": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Concussion",
      "assign_to_attribute": "concussion_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "62564004",
          "display": "Concussion with loss of consciousness"
        }
      ],
      "direct_transition": "Concussion_CarePlan"
    },
    "Severe_Concussion": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Concussion",
      "assign_to_attribute": "concussion_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "110030002",
          "display": "Concussion injury of brain"
        }
      ],
      "remarks": [
        "Distributions based on this article: ",
        "http://www.cdc.gov/traumaticbraininjury/severe.html"
      ],
      "distributed_transition": [
        {
          "distribution": 0.57,
          "transition": "Concussion_CarePlan"
        },
        {
          "distribution": 0.33,
          "transition": "Permanent_Brain_Damage"
        },
        {
          "distribution": 0.1,
          "transition": "Death_Severe_Concussion"
        }
      ]
    },
    "Permanent_Brain_Damage": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Concussion",
      "remarks": [
        "There will never be a ConditionEnd for this state - this brain damage is permanent."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "275272006",
          "display": "Brain damage - traumatic"
        }
      ],
      "direct_transition": "Concussion_CarePlan"
    },
    "Concussion_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "concussion_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "47387005",
          "display": "Head injury rehabilitation"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183051005",
          "display": "Recommendation to rest"
        },
        {
          "system": "SNOMED-CT",
          "code": "226138001",
          "display": "Alcohol-free diet"
        }
      ],
      "direct_transition": "End_Concussion_Encounter"
    },
    "End_Concussion_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Concussion_Recovery_Period"
    },
    "Concussion_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "months"
      },
      "direct_transition": "Concussion_Injury_Followup"
    },
    "Concussion_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "concussion_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Concussion_Injury"
    },
    "End_Concussion_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "concussion_injury",
      "direct_transition": "End_Concussion_Followup"
    },
    "End_Concussion_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Whiplash_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " WHIPLASH                                                             ",
        "======================================================================",
        "Further supported by the following sources: ",
        "http://www.srisd.com/consumer_site/epidemiology.htm",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC2564031/",
        "Many whiplash injuries do not present themselves immediately and are not ",
        "treated by an emergency department. If they're ever addressed at all they ",
        "are treated in an ambulatory setting by a PCP. For simplicity however, all ",
        "of the whiplash injuries seen in this module are treated by an ED department."
      ],
      "direct_transition": "ED_Visit_For_Whiplash"
    },
    "ED_Visit_For_Whiplash": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Whiplash"
    },
    "Whiplash": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Whiplash",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "39848009",
          "display": "Whiplash injury to neck"
        }
      ],
      "direct_transition": "Whiplash_Injury_Prescribe_Non_Opioid"
    },
    "Whiplash_Injury_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "Whiplash_CarePlan"
    },
    "Whiplash_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "Whiplash",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "266694003",
          "display": "Heat therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "183051005",
          "display": "Recommendation to rest"
        }
      ],
      "direct_transition": "End_Whiplash_Encounter"
    },
    "End_Whiplash_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Whiplash_Recovery_Period"
    },
    "Whiplash_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "End_Whiplash_Injury"
    },
    "End_Whiplash_Injury": {
      "type": "ConditionEnd",
      "condition_onset": "Whiplash",
      "direct_transition": "Conclude_Injury"
    },
    "Broken_Bone_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " BROKEN BONE                                                          ",
        "======================================================================",
        "Further supported by the following sources: ",
        "Most commonly broken bones: https://askabiologist.asu.edu/how-bone-breaks"
      ],
      "direct_transition": "ED_Visit_For_Broken_Bone"
    },
    "ED_Visit_For_Broken_Bone": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Broken_Bone"
    },
    "Broken_Bone": {
      "type": "Simple",
      "remarks": [
        "A reasonable distribution of broken bones. Based on a Top 5 list: ",
        "1. Clavicle ",
        "2. Arm ",
        "3. Wrist ",
        "4. Hip (but this occurs mostly in older women with osteoporosis) ",
        "5. Ankle "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "osteoporosis",
            "operator": "==",
            "value": true
          },
          "remarks": [
            "For the year 2000, there were an estimated 9 million new osteoporotic fractures, ",
            "of which 1.6 million were at the hip, 1.7 million were at the forearm ",
            "and 1.4 million were clinical vertebral fractures. ",
            "-- https://www.iofbonehealth.org/facts-statistics",
            "1.6 / 9 == 18%, 1.7/9 == 19%. ",
            "4.7 million not included in that stat, so we assume the distribution of the rest"
          ],
          "distributions": [
            {
              "distribution": 0.1,
              "transition": "Broken_Clavicle"
            },
            {
              "distribution": 0.415,
              "transition": "Broken_Arm",
              "remarks": [
                ".225 normally + .19 new"
              ]
            },
            {
              "distribution": 0.1,
              "transition": "Broken_Wrist"
            },
            {
              "distribution": 0.1,
              "transition": "Broken_Ankle"
            },
            {
              "distribution": 0.05,
              "transition": "Broken_Rib"
            },
            {
              "distribution": 0.23,
              "transition": "Broken_Hip",
              "remarks": [
                ".05 below + .18 new"
              ]
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.225,
              "transition": "Broken_Clavicle"
            },
            {
              "distribution": 0.225,
              "transition": "Broken_Arm"
            },
            {
              "distribution": 0.2,
              "transition": "Broken_Wrist"
            },
            {
              "distribution": 0.2,
              "transition": "Broken_Ankle"
            },
            {
              "distribution": 0.1,
              "transition": "Broken_Rib"
            },
            {
              "distribution": 0.05,
              "transition": "Broken_Hip"
            }
          ]
        }
      ]
    },
    "Broken_Clavicle": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "58150001",
          "display": "Fracture of clavicle"
        }
      ],
      "direct_transition": "Clavicle_X_Ray"
    },
    "Clavicle_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "168594001",
        "display": "Clavicle X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "51299004",
            "display": "Clavicle"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of clavicle",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Surgery"
    },
    "Broken_Arm": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "65966004",
          "display": "Fracture of forearm"
        }
      ],
      "direct_transition": "Arm_X_Ray"
    },
    "Arm_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "1225002",
        "display": "Upper arm X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "40983000",
            "display": "Arm"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of arm",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Immobilization"
    },
    "Broken_Wrist": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "263102004",
          "display": "Fracture subluxation of wrist"
        }
      ],
      "direct_transition": "Wrist_X_Ray"
    },
    "Wrist_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "60027007",
        "display": "X-ray or wrist"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "8205005",
            "display": "Wrist"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of wrist",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Immobilization"
    },
    "Broken_Ankle": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "16114001",
          "display": "Fracture of ankle"
        }
      ],
      "direct_transition": "Ankle_X_Ray"
    },
    "Ankle_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "19490002",
        "display": "Ankle X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "344001",
            "display": "Ankle"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of ankle",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Immobilization"
    },
    "Broken_Rib": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "33737001",
          "display": "Fracture of rib"
        }
      ],
      "direct_transition": "Chest_X_Ray"
    },
    "Chest_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "399208008",
        "display": "Chest X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "51185008",
            "display": "Chest"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of chest",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Immobilization"
    },
    "Broken_Hip": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Broken_Bone",
      "assign_to_attribute": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "359817006",
          "display": "Closed fracture of hip"
        }
      ],
      "direct_transition": "Pelvic_X_Ray"
    },
    "Pelvic_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "268425006",
        "display": "Pelvis X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "12921003",
            "display": "Pelvis"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of pelvis",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Broken_Bone_Surgery"
    },
    "Broken_Bone_Immobilization": {
      "type": "Procedure",
      "reason": "broken_bone",
      "duration": {
        "low": 20,
        "high": 45,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274474001",
          "display": "Bone immobilization"
        }
      ],
      "direct_transition": "Broken_Bone_Injury_Prescribe_Pain_Medication"
    },
    "Broken_Bone_Surgery": {
      "type": "Procedure",
      "reason": "broken_bone",
      "duration": {
        "low": 1,
        "high": 2,
        "unit": "hours"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305428000",
          "display": "Admission to orthopedic department"
        }
      ],
      "direct_transition": "Broken_Bone_Injury_Prescribe_Pain_Medication"
    },
    "Broken_Bone_Injury_Prescribe_Pain_Medication": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Broken_Bone_Surgery"
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Broken_Bone_Injury_Prescribe_Opioid"
            },
            {
              "distribution": 0.2,
              "transition": "Broken_Bone_Injury_Prescribe_Non_Opioid"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Broken_Bone_Injury_Prescribe_Opioid"
            },
            {
              "distribution": 0.7,
              "transition": "Broken_Bone_Injury_Prescribe_Non_Opioid"
            }
          ]
        }
      ]
    },
    "Broken_Bone_Injury_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "Broken_Bone_Injury_Prescribe_Non_Opioid"
    },
    "Broken_Bone_Injury_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "Broken_Bone_CarePlan"
    },
    "Broken_Bone_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "385691007",
          "display": "Fracture care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183051005",
          "display": "Recommendation to rest",
          "remarks": [
            "Until the broken bone heals"
          ]
        },
        {
          "system": "SNOMED-CT",
          "code": "408580007",
          "display": "Physical activity target light exercise",
          "remarks": [
            "After the broken bone heals"
          ]
        }
      ],
      "direct_transition": "Consider_Osteoporosis"
    },
    "Consider_Osteoporosis": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "64859006",
                "display": "Osteoporosis (disorder)"
              }
            ]
          },
          "transition": "Diagnose_Fracture_Due_to_Osteoporosis"
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 50,
            "unit": "years"
          },
          "transition": "Osteoporosis_Workup"
        },
        {
          "distributions": [
            {
              "distribution": 0.02,
              "transition": "Osteoporosis_Workup"
            },
            {
              "distribution": 0.98,
              "transition": "End_Broken_Bone_Encounter"
            }
          ],
          "remarks": [
            "Give all people a small chance to check for osteoporosis",
            "Frequent checks are not valuable -- ",
            "https://www.nih.gov/news-events/nih-research-matters/how-often-should-women-have-bone-tests"
          ]
        }
      ]
    },
    "Osteoporosis_Workup": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "312681000",
          "display": "Bone density scan (procedure)"
        }
      ],
      "reason": "broken_bone",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "osteoporosis",
            "operator": "==",
            "value": true
          },
          "transition": "Low_Bone_Density"
        },
        {
          "transition": "High_Bone_Density"
        }
      ]
    },
    "High_Bone_Density": {
      "type": "Observation",
      "category": "procedure",
      "codes": [
        {
          "system": "LOINC",
          "code": "38265-5",
          "display": "DXA [T-score] Bone density"
        }
      ],
      "remarks": [
        "TODO - This code is specifically for radius/ulna.",
        "Future impl may want to use a different code depending on what bone was broken"
      ],
      "range": {
        "low": -0.5,
        "high": 0.5
      },
      "unit": "{T-score}",
      "direct_transition": "End_Broken_Bone_Encounter"
    },
    "Low_Bone_Density": {
      "type": "Observation",
      "category": "procedure",
      "codes": [
        {
          "system": "LOINC",
          "code": "38265-5",
          "display": "DXA [T-score] Bone density"
        }
      ],
      "range": {
        "low": -3.8,
        "high": -2.5
      },
      "unit": "{T-score}",
      "remarks": [
        "WHO definition of osteoporosis is a T-score < 2.5",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1963365/"
      ],
      "direct_transition": "Diagnose_Osteoporosis"
    },
    "Diagnose_Osteoporosis": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "64859006",
          "display": "Osteoporosis (disorder)"
        }
      ],
      "direct_transition": "Diagnose_Fracture_Due_to_Osteoporosis"
    },
    "Diagnose_Fracture_Due_to_Osteoporosis": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "443165006",
          "display": "Pathological fracture due to osteoporosis (disorder)"
        }
      ],
      "direct_transition": "End_Broken_Bone_Encounter"
    },
    "End_Broken_Bone_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Broken_Bone_Recovery_Period"
    },
    "Broken_Bone_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 4,
        "unit": "months"
      },
      "direct_transition": "Broken_Bone_Injury_Followup"
    },
    "Broken_Bone_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "broken_bone",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Broken_Bone_Injury"
    },
    "End_Broken_Bone_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "broken_bone",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "443165006",
                "display": "Pathological fracture due to osteoporosis (disorder)"
              }
            ]
          },
          "transition": "End_Osteoporosis_Fracture"
        },
        {
          "transition": "End_Broken_Bone_Followup"
        }
      ]
    },
    "End_Osteoporosis_Fracture": {
      "type": "ConditionEnd",
      "condition_onset": "Diagnose_Fracture_Due_to_Osteoporosis",
      "direct_transition": "End_Broken_Bone_Followup"
    },
    "End_Broken_Bone_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Burn_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " BURN                                                                 ",
        "======================================================================",
        "Further supported by the following sources: ",
        "http://www.ameriburn.org/resources_factsheet.php",
        "http://www.burnfoundation.org/programs/resource.cfm?c=2&a=6 (1999 incidence)",
        "Since the early 1990's the burn rates in the U.S. have declined almost 50%;",
        "however, the relative proportions of severity has stayed the same."
      ],
      "direct_transition": "ED_Visit_For_Burn"
    },
    "ED_Visit_For_Burn": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Burn"
    },
    "Burn": {
      "type": "Simple",
      "remarks": [
        "Used the 1990 incidence rates to determine the relative proportions of burns only.",
        "ED Visits:      1.25M",
        "Hospital Stays:   51k  => 0.0408",
        "Deaths:          5500  => 0.0044",
        "Distributed the burns that don't result in death or a hospital stay between first ",
        "and second degree burns. (60% first degree, 40% second degree of the 0.9548 remaining)."
      ],
      "distributed_transition": [
        {
          "distribution": 0.57288,
          "transition": "First_Degree_Burn"
        },
        {
          "distribution": 0.38192,
          "transition": "Second_Degree_Burn"
        },
        {
          "distribution": 0.0408,
          "transition": "Third_Degree_Burn"
        },
        {
          "distribution": 0.0044,
          "transition": "Deadly_Burn"
        }
      ]
    },
    "First_Degree_Burn": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Burn",
      "assign_to_attribute": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "403190006",
          "display": "First degree burn"
        }
      ],
      "direct_transition": "Burn_CarePlan"
    },
    "Second_Degree_Burn": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Burn",
      "assign_to_attribute": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "403191005",
          "display": "Second degree burn"
        }
      ],
      "direct_transition": "Burn_CarePlan"
    },
    "Third_Degree_Burn": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Burn",
      "assign_to_attribute": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "403192003",
          "display": "Third degree burn"
        }
      ],
      "direct_transition": "Burn_CarePlan"
    },
    "Burn_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "133901003",
          "display": "Burn care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "385949008",
          "display": "Dressing change management"
        },
        {
          "system": "SNOMED-CT",
          "code": "440381005",
          "display": "Behavior to prevent sun exposure"
        },
        {
          "system": "SNOMED-CT",
          "code": "439830001",
          "display": "Behavior to prevent infection"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "403190006",
                "display": "First degree burn"
              }
            ]
          },
          "transition": "Burn_Injury_Prescribe_Non_Opioid"
        },
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "403191005",
                "display": "Second degree burn"
              }
            ]
          },
          "transition": "Burn_Injury_Prescribe_Antibiotic"
        },
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "403192003",
                "display": "Third degree burn"
              }
            ]
          },
          "transition": "Severe_Burn_Care"
        }
      ]
    },
    "Severe_Burn_Care": {
      "type": "Procedure",
      "reason": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183450002",
          "display": "Admission to burn unit"
        }
      ],
      "direct_transition": "Severe_Burn_Hospitalization"
    },
    "Severe_Burn_Hospitalization": {
      "type": "Procedure",
      "reason": "burn_injury",
      "duration": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305340004",
          "display": "Admission to long stay hospital"
        }
      ],
      "direct_transition": "Burn_Injury_Prescribe_Antibiotic"
    },
    "Burn_Injury_Prescribe_Antibiotic": {
      "type": "CallSubmodule",
      "remarks": [
        "Antibiotics that can be used to treat ear infections are equally ",
        "suitable for treating bacterial tissue infections."
      ],
      "submodule": "medications/ear_infection_antibiotic",
      "direct_transition": "Burn_Injury_Prescribe_Opioid"
    },
    "Burn_Injury_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "Burn_Injury_Prescribe_Non_Opioid"
    },
    "Burn_Injury_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Burn_Encounter"
    },
    "End_Burn_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Burn_Recovery_Period"
    },
    "Burn_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "Burn_Injury_Followup"
    },
    "Burn_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Burn_Injury"
    },
    "End_Burn_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "burn_injury",
      "direct_transition": "End_Burn_Followup"
    },
    "End_Burn_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Laceration_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " LACERATION                                                           ",
        "======================================================================",
        "Added a mix of lacerations for variety. It seems like most common ",
        "lacerations are equally likely.",
        "TODO: In the future, lacerations that are poorly treated by the patient may ",
        "develop an infection. Could be interesting to add this into the mix."
      ],
      "direct_transition": "ED_Visit_For_Laceration"
    },
    "ED_Visit_For_Laceration": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Laceration"
    },
    "Laceration": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Laceration_Of_Hand"
        },
        {
          "distribution": 0.2,
          "transition": "Laceration_Of_Arm"
        },
        {
          "distribution": 0.2,
          "transition": "Laceration_Of_Leg"
        },
        {
          "distribution": 0.2,
          "transition": "Laceration_Of_Face"
        },
        {
          "distribution": 0.2,
          "transition": "Laceration_Of_Foot"
        }
      ]
    },
    "Laceration_Of_Hand": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Laceration",
      "assign_to_attribute": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "284549007",
          "display": "Laceration of hand"
        }
      ],
      "direct_transition": "Laceration_CarePlan"
    },
    "Laceration_Of_Arm": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Laceration",
      "assign_to_attribute": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "283371005",
          "display": "Laceration of forearm"
        }
      ],
      "direct_transition": "Laceration_CarePlan"
    },
    "Laceration_Of_Leg": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Laceration",
      "assign_to_attribute": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "283385000",
          "display": "Laceration of thigh"
        }
      ],
      "direct_transition": "Laceration_CarePlan"
    },
    "Laceration_Of_Face": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Laceration",
      "assign_to_attribute": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "370247008",
          "display": "Facial laceration"
        }
      ],
      "direct_transition": "Laceration_CarePlan"
    },
    "Laceration_Of_Foot": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Laceration",
      "assign_to_attribute": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "284551006",
          "display": "Laceration of foot"
        }
      ],
      "direct_transition": "Laceration_CarePlan"
    },
    "Laceration_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "laceration_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225358003",
          "display": "Wound care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "385949008",
          "display": "Dressing change management"
        },
        {
          "system": "SNOMED-CT",
          "code": "439830001",
          "display": "Behavior to prevent infection"
        }
      ],
      "direct_transition": "Suture_Laceration"
    },
    "Suture_Laceration": {
      "type": "Procedure",
      "reason": "laceration_injury",
      "duration": {
        "low": 10,
        "high": 30,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "288086009",
          "display": "Suture open wound"
        }
      ],
      "remarks": [
        "For some of the lacerations it's prudent to give a tetanus booster. ",
        "For now this distribution is arbitrary but we assume not every wound ",
        "involves rusty or dirty metal and that most people are up-to-date ",
        "with their tetanus shots."
      ],
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Laceration_Tetanus_Shot"
        },
        {
          "distribution": 0.8,
          "transition": "Laceration_Injury_Prescribe_Non_Opioid"
        }
      ]
    },
    "Laceration_Tetanus_Shot": {
      "type": "Procedure",
      "reason": "laceration_injury",
      "duration": {
        "low": 10,
        "high": 20,
        "unit": "minutes"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "384700001",
          "display": "Injection of tetanus antitoxin"
        }
      ],
      "direct_transition": "Laceration_Injury_Prescribe_Non_Opioid"
    },
    "Laceration_Injury_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Laceration_Encounter"
    },
    "End_Laceration_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Laceration_Recovery_Period"
    },
    "Laceration_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      },
      "direct_transition": "End_Laceration_Injury"
    },
    "End_Laceration_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "laceration_injury",
      "direct_transition": "Conclude_Injury"
    },
    "Sprain_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SPRAIN                                                               ",
        "======================================================================",
        "Arbitrary distribution of sprained ankles and wrists for variety."
      ],
      "direct_transition": "ED_Visit_For_Sprain"
    },
    "ED_Visit_For_Sprain": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.7,
          "transition": "Sprained_Ankle"
        },
        {
          "distribution": 0.3,
          "transition": "Sprained_Wrist"
        }
      ]
    },
    "Sprained_Ankle": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Sprain",
      "assign_to_attribute": "sprain_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "44465007",
          "display": "Sprain of ankle"
        }
      ],
      "direct_transition": "Sprain_CarePlan"
    },
    "Sprained_Wrist": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Sprain",
      "assign_to_attribute": "sprain_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "70704007",
          "display": "Sprain of wrist"
        }
      ],
      "direct_transition": "Sprain_CarePlan"
    },
    "Sprain_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "sprain_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91251008",
          "display": "Physical therapy procedure"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "229586001",
          "display": "Rest, ice, compression and elevation treatment programme"
        },
        {
          "system": "SNOMED-CT",
          "code": "229070002",
          "display": "Stretching exercises"
        }
      ],
      "direct_transition": "Sprain_Prescribe_Non_Opioid"
    },
    "Sprain_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Sprain_Encounter"
    },
    "End_Sprain_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Sprain_Recovery_Period"
    },
    "Sprain_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "End_Sprain_Injury"
    },
    "End_Sprain_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "sprain_injury",
      "direct_transition": "Conclude_Injury"
    },
    "Knee_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " KNEE                                                                 ",
        "======================================================================",
        "Tears of the following structures: ",
        "1. ACL      (25.4%)",
        "2. MCL      (36.1%)",
        "3. Meniscus (23.0%)",
        "4. Patella  (29.5%)",
        "These percentages add up to >100 since multiple tears could occur from one knee ",
        "injury. To simplify I normalized these percentages out of 100 but maintained ",
        "the relative proportions. Only one of the above occurs at any given time.",
        "Sources: ",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3768257/"
      ],
      "direct_transition": "ED_Visit_For_Knee_Injury"
    },
    "ED_Visit_For_Knee_Injury": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "distributed_transition": [
        {
          "transition": "Torn_MCL",
          "distribution": 0.3177
        },
        {
          "transition": "Torn_ACL",
          "distribution": 0.2235
        },
        {
          "transition": "Torn_Meniscus",
          "distribution": 0.2024
        },
        {
          "transition": "Torn_Patellar_Tendon",
          "distribution": 0.2564
        }
      ]
    },
    "Knee_X_Ray": {
      "type": "ImagingStudy",
      "procedure_code": {
        "system": "SNOMED-CT",
        "code": "74016001",
        "display": "Knee X-ray"
      },
      "series": [
        {
          "body_site": {
            "system": "SNOMED-CT",
            "code": "72696002",
            "display": "Knee"
          },
          "modality": {
            "system": "DICOM-DCM",
            "code": "DX",
            "display": "Digital Radiography"
          },
          "instances": [
            {
              "title": "Image of knee",
              "sop_class": {
                "system": "DICOM-SOP",
                "code": "1.2.840.10008.5.1.4.1.1.1.1",
                "display": "Digital X-Ray Image Storage"
              }
            }
          ]
        }
      ],
      "direct_transition": "Knee_Injury_Prescribe_Non_Opioid"
    },
    "Knee_Injury_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "knee_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91251008",
          "display": "Physical therapy procedure"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "229586001",
          "display": "Rest, ice, compression and elevation treatment programme"
        },
        {
          "system": "SNOMED-CT",
          "code": "229070002",
          "display": "Stretching exercises"
        }
      ],
      "direct_transition": "Knee_X_Ray"
    },
    "Torn_ACL": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Knee_Injury",
      "assign_to_attribute": "knee_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "444470001",
          "display": "Injury of anterior cruciate ligament"
        }
      ],
      "direct_transition": "Knee_Injury_CarePlan"
    },
    "Torn_MCL": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Knee_Injury",
      "assign_to_attribute": "knee_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "444448004",
          "display": "Injury of medial collateral ligament of knee"
        }
      ],
      "direct_transition": "Knee_Injury_CarePlan"
    },
    "Torn_Meniscus": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Knee_Injury",
      "assign_to_attribute": "knee_injury",
      "remarks": [
        "These typically don't require surgery, so go straight to therapy."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "239720000",
          "display": "Tear of meniscus of knee"
        }
      ],
      "direct_transition": "Knee_Injury_CarePlan"
    },
    "Torn_Patellar_Tendon": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Knee_Injury",
      "assign_to_attribute": "knee_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "30832001",
          "display": "Rupture of patellar tendon"
        }
      ],
      "direct_transition": "Knee_Injury_CarePlan"
    },
    "End_Knee_Injury_Encounter_I": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "transition": "Knee_Injury_Recovery_Period",
          "condition": {
            "condition_type": "PriorState",
            "name": "Torn_Meniscus"
          }
        },
        {
          "transition": "Wait_For_Knee_Surgery"
        }
      ]
    },
    "Wait_For_Knee_Surgery": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "direct_transition": "Knee_Surgery_Encounter"
    },
    "Knee_Surgery_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "knee_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183495009",
          "display": "Non-urgent orthopedic admission"
        }
      ],
      "direct_transition": "Knee_Surgery_Procedure"
    },
    "Knee_Surgery_Procedure": {
      "type": "Procedure",
      "reason": "knee_injury",
      "duration": {
        "low": 2,
        "high": 4,
        "unit": "hours"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "699253003",
          "display": "Surgical manipulation of joint of knee"
        }
      ],
      "direct_transition": "Knee_Injury_Prescribe_Opioid"
    },
    "Knee_Injury_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "End_Knee_Injury_Encounter_II"
    },
    "Knee_Injury_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Knee_Injury_Encounter_I"
    },
    "End_Knee_Injury_Encounter_II": {
      "type": "EncounterEnd",
      "direct_transition": "Knee_Injury_Recovery_Period"
    },
    "Knee_Injury_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "months"
      },
      "direct_transition": "End_Knee_Injury"
    },
    "End_Knee_Injury": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "knee_injury",
      "direct_transition": "Conclude_Injury"
    },
    "Shoulder_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " SHOULDER                                                             ",
        "======================================================================",
        "Tears of the rotator cuff. Typically this doesn't require an immediate trip ",
        "to the emergency department. An ambulatory encounter and PT (or in some cases,",
        "surgery) will do. Interestingly enough, in most cases surgery won't help a ",
        "torn rotator cuff any more than physical therapy. The percentages are arbitraty ",
        "but I directed most patients directly to PT instead of surgery."
      ],
      "direct_transition": "Torn_Rotator_Cuff"
    },
    "Torn_Rotator_Cuff": {
      "type": "ConditionOnset",
      "target_encounter": "Encounter_For_Shoulder_Injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "307731004",
          "display": "Injury of tendon of the rotator cuff of shoulder"
        }
      ],
      "direct_transition": "Encounter_For_Shoulder_Injury"
    },
    "Encounter_For_Shoulder_Injury": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Torn_Rotator_Cuff",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Shoulder_Injury_CarePlan"
    },
    "Shoulder_Injury_CarePlan": {
      "type": "CarePlanStart",
      "assign_to_attribute": "injury_careplan",
      "reason": "Torn_Rotator_Cuff",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91251008",
          "display": "Physical therapy procedure"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "229586001",
          "display": "Rest, ice, compression and elevation treatment programme"
        },
        {
          "system": "SNOMED-CT",
          "code": "229070002",
          "display": "Stretching exercises"
        }
      ],
      "direct_transition": "End_Shoulder_Injury_Encounter"
    },
    "End_Shoulder_Injury_Encounter": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.9,
          "transition": "Shoulder_Injury_Recovery_Period"
        },
        {
          "distribution": 0.1,
          "transition": "Wait_For_Shoulder_Surgery"
        }
      ]
    },
    "Wait_For_Shoulder_Surgery": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "direct_transition": "Shoulder_Surgery_Encounter"
    },
    "Shoulder_Surgery_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Torn_Rotator_Cuff",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183495009",
          "display": "Non-urgent orthopedic admission"
        }
      ],
      "direct_transition": "Shoulder_Surgery_Procedure"
    },
    "Shoulder_Surgery_Procedure": {
      "type": "Procedure",
      "reason": "Torn_Rotator_Cuff",
      "duration": {
        "low": 2,
        "high": 4,
        "unit": "hours"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "387685009",
          "display": "Surgical manipulation of shoulder joint"
        }
      ],
      "direct_transition": "Shoulder_Surgery_Prescribe_Opioid"
    },
    "Shoulder_Surgery_Prescribe_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "Shoulder_Surgery_Prescribe_Non_Opioid"
    },
    "Shoulder_Surgery_Prescribe_Non_Opioid": {
      "type": "CallSubmodule",
      "submodule": "medications/otc_pain_reliever",
      "direct_transition": "End_Shoulder_Surgery_Encounter"
    },
    "End_Shoulder_Surgery_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Shoulder_Injury_Recovery_Period"
    },
    "Shoulder_Injury_Recovery_Period": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "months"
      },
      "direct_transition": "Shoulder_Injury_Followup"
    },
    "Shoulder_Injury_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Torn_Rotator_Cuff",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185349003",
          "display": "Encounter for 'check-up'"
        }
      ],
      "direct_transition": "End_Shoulder_Injury"
    },
    "End_Shoulder_Injury": {
      "type": "ConditionEnd",
      "condition_onset": "Torn_Rotator_Cuff",
      "direct_transition": "End_Shoulder_Followup"
    },
    "End_Shoulder_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Conclude_Injury"
    },
    "Conclude_Injury": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " INJURY CONCLUSION                                                    ",
        "======================================================================",
        "This section is not resposible for ending conditions, only resetting ",
        "attributes and ending care plans and medications. This allows chronic ",
        "injuries to continue while short-term injuries should be ended earlier ",
        "in this module."
      ],
      "direct_transition": "End_Injury_CarePlan"
    },
    "End_Injury_CarePlan": {
      "type": "CarePlanEnd",
      "referenced_by_attribute": "injury_careplan",
      "direct_transition": "End_Injury_Medications"
    },
    "End_Injury_Medications": {
      "type": "Simple",
      "remarks": [
        "For any of the possible medications that could be prescribed in this module ",
        "this state cycles through the attributes and ends the medications until no ",
        "more prescriptions are remaining.",
        "The attributes that this state looks for are: ",
        "1. otc_pain_reliever ",
        "2. antibiotic_prescription ",
        "Any other medications prescribed in this module and not assigned to one of those ",
        "three attributes must be ended manually elsewhere in the module, the special ",
        "exception being 'opioid_prescription' (handled by the Opioid Addiction module)."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "antibiotic_prescription",
            "operator": "is not nil"
          },
          "transition": "End_Antibiotic_Prescription"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "otc_pain_reliever",
            "operator": "is not nil"
          },
          "transition": "End_Non_Opioid_Prescription"
        },
        {
          "remarks": [
            "Fallback transition after all medications are ended"
          ],
          "transition": "Wait_For_Injury"
        }
      ]
    },
    "End_Antibiotic_Prescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "antibiotic_prescription",
      "direct_transition": "Unset_Antibiotic_Prescription_Attribute"
    },
    "Unset_Antibiotic_Prescription_Attribute": {
      "type": "SetAttribute",
      "attribute": "antibiotic_prescription",
      "direct_transition": "End_Injury_Medications"
    },
    "End_Non_Opioid_Prescription": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "otc_pain_reliever",
      "direct_transition": "Unset_Non_Opioid_Prescription_Attribute"
    },
    "Unset_Non_Opioid_Prescription_Attribute": {
      "type": "SetAttribute",
      "attribute": "otc_pain_reliever",
      "direct_transition": "End_Injury_Medications"
    },
    "Deadly_Burn": {
      "type": "ConditionOnset",
      "assign_to_attribute": "burn_injury",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "48333001",
          "display": "Burn injury(morphologic abnormality)"
        }
      ],
      "direct_transition": "Death_Severe_Burn"
    },
    "Death_Spinal_Cord": {
      "type": "Death",
      "referenced_by_attribute": "spinal_injury",
      "direct_transition": "Terminal"
    },
    "Death_Gunshot_Wound": {
      "type": "Death",
      "referenced_by_attribute": "gunshot_wound",
      "direct_transition": "Terminal"
    },
    "Death_Severe_Concussion": {
      "type": "Death",
      "referenced_by_attribute": "concussion_injury",
      "direct_transition": "Terminal"
    },
    "Death_Severe_Burn": {
      "type": "Death",
      "referenced_by_attribute": "burn_injury",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"lung_cancer/lung_cancer_probabilities":{
  "name": "Lung Cancer Probabilities",
  "remarks": [
    "Overall, the chance that a man will develop lung cancer in his lifetime is about 1 in 14;",
    "for a woman, the risk is about 1 in 17.",
    "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-",
    "cancer-key-statistics",
    "",
    "Men who smoke are 23 times more likely to develop lung cancer.",
    "Women are 13 times more likely, compared to never smokers.",
    "http://www.lung.org/lung-health-and-diseases/lung-disease-lookup/lung-cancer/learn-about-",
    "lung-cancer/lung-cancer-fact-sheet.html",
    "",
    "In a 2006 European study, the risk of developing lung cancer was:",
    "0.2 percent for men who never smoked (0.4% for women);",
    "5.5 percent of male former smokers (2.6% in women);",
    "15.9 percent of current male smokers (9.5% for women);",
    "24.4 percent for male \"heavy smokers\" defined as smoking more than 5 cigarettes per day",
    "(18.5 percent for women) ",
    "https://www.verywell.com/what-percentage-of-smokers-get-lung-cancer-2248868"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "transition": "Female",
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          }
        },
        {
          "transition": "Male",
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          }
        }
      ],
      "remarks": [
        "TODO - make this calculation more elaborate, based on duration smoking, timestep-dependent"
      ]
    },
    "Terminal": {
      "type": "Terminal"
    },
    "Male": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Male_Smoker",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          }
        },
        {
          "transition": "Male_Quit",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "quit smoking age",
            "operator": "is not nil"
          }
        },
        {
          "transition": "Male_Nonsmoker"
        }
      ]
    },
    "Female": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Female_Smoker",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          }
        },
        {
          "transition": "Female_Quit",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "quit smoking age",
            "operator": "is not nil"
          }
        },
        {
          "transition": "Female_Nonsmoker"
        }
      ]
    },
    "Male_Smoker": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.244
    },
    "Male_Quit": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.055
    },
    "Male_Nonsmoker": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.002
    },
    "Female_Smoker": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.185
    },
    "Female_Quit": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.026
    },
    "Female_Nonsmoker": {
      "type": "SetAttribute",
      "attribute": "probability_of_lung_cancer",
      "direct_transition": "Terminal",
      "value": 0.004
    }
  }
}
,
"lung_cancer":{
  "name": "Lung Cancer",
  "remarks": [
    "Most of the data for this module was synthesized from two primary sources:",
    "1. The comprehensive pages starting at http://www.cancer.org/cancer/lungcancer/index",
    "2. The Cancer Care Ontario Pathway Maps at https://www.cancercare.on.ca/ocs/qpi/dispathmgmt/pathways/lung_cancer_pathway_map/",
    "Some data statistics came from:",
    "3. The American Lung Association Lung Cancer Fact Sheet @ http://www.lung.org/lung-health-and-diseases/lung-disease-lookup/lung-cancer/learn-about-lung-cancer/lung-cancer-fact-sheet.html",
    "4. https://www.verywell.com/what-percentage-of-smokers-get-lung-cancer-2248868",
    "5. Life Expectancies: http://www.healthcommunities.com/lung-cancer/prognosis.shtml"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Ages_45_65"
    },
    "Ages_45_65": {
      "type": "Delay",
      "range": {
        "low": 45,
        "high": 65,
        "unit": "years"
      },
      "direct_transition": "Lung Cancer Probabilities",
      "remarks": [
        "Lung cancer mainly occurs in older people. About 2 out of 3 people diagnosed with lung cancer are 65 or older, while less than 2% are younger than 45. The average age at the time of diagnosis is about 70.",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-key-statistics"
      ]
    },
    "Lung Cancer Probabilities": {
      "type": "CallSubmodule",
      "submodule": "lung_cancer/lung_cancer_probabilities",
      "distributed_transition": [
        {
          "distribution": {
            "attribute": "probability_of_lung_cancer",
            "default": 0.0645
          },
          "transition": "Onset_Lung_Cancer"
        },
        {
          "distribution": {
            "attribute": "probability_of_no_lung_cancer",
            "default": 0.93355
          },
          "transition": "Terminal"
        }
      ],
      "remarks": [
        "Overall, the chance that a man will develop lung cancer in his lifetime is about 1 in 14; for a woman, the risk is about 1 in 17.",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-key-statistics",
        "Men who smoke are 23 times more likely to develop lung cancer. Women are 13 times more likely, compared to never smokers.",
        "http://www.lung.org/lung-health-and-diseases/lung-disease-lookup/lung-cancer/learn-about-lung-cancer/lung-cancer-fact-sheet.html",
        "In a 2006 European study, the risk of developing lung cancer was: 0.2 percent for men who never smoked (0.4% for women); 5.5 percent of male former smokers (2.6% in women); 15.9 percent of current male smokers (9.5% for women); 24.4 percent for male 'heavy smokers' defined as smoking more than 5 cigarettes per day (18.5 percent for women)",
        "https://www.verywell.com/what-percentage-of-smokers-get-lung-cancer-2248868"
      ]
    },
    "Onset_Lung_Cancer": {
      "type": "SetAttribute",
      "attribute": "lung_cancer",
      "value": true,
      "direct_transition": "Init_Lung_Cancer_Counter"
    },
    "Init_Lung_Cancer_Counter": {
      "type": "SetAttribute",
      "attribute": "lung_cancer_nondiagnosis_counter",
      "value": 0,
      "direct_transition": "Undiagnosed_Lung_Cancer"
    },
    "Undiagnosed_Lung_Cancer": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "distributed_transition": [
        {
          "distribution": {
            "attribute": "probability_of_lung_cancer_treatment",
            "default": 0.2
          },
          "transition": "Cough"
        },
        {
          "distribution": {
            "attribute": "probability_of_no_lung_cancer_treatment",
            "default": 0.8
          },
          "transition": "Increment_Counter"
        }
      ]
    },
    "Increment_Counter": {
      "type": "Counter",
      "action": "increment",
      "attribute": "lung_cancer_nondiagnosis_counter",
      "direct_transition": "Undiagnosed_Lung_Cancer"
    },
    "Cough": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Bloody Cough"
    },
    "Bloody Cough": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 100,
        "high": 350
      },
      "direct_transition": "Shortness of Breath"
    },
    "Shortness of Breath": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 100,
        "high": 350
      },
      "direct_transition": "Fever"
    },
    "Fever": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 250
      },
      "direct_transition": "Head and neck swelling"
    },
    "Head and neck swelling": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 250
      },
      "direct_transition": "Sweats"
    },
    "Sweats": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 250
      },
      "direct_transition": "Fatigue"
    },
    "Fatigue": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 250
      },
      "direct_transition": "Decrease in appetite"
    },
    "Decrease in appetite": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Decrease in weight"
    },
    "Decrease in weight": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Chest Pain"
    },
    "Chest Pain": {
      "type": "Symptom",
      "symptom": "Chest Pain",
      "range": {
        "low": 50,
        "high": 250
      },
      "direct_transition": "Suspected Lung Cancer"
    },
    "Suspected Lung Cancer": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter I",
      "assign_to_attribute": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "162573006",
          "display": "Suspected lung cancer (situation)"
        }
      ],
      "direct_transition": "Diagnosis Encounter I"
    },
    "Diagnosis Encounter I": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "direct_transition": "Chest X-Ray"
    },
    "Chest X-Ray": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter I",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "399208008",
          "display": "Plain chest X-ray (procedure)"
        }
      ],
      "duration": {
        "low": 10,
        "high": 25,
        "unit": "minutes"
      },
      "direct_transition": "End_Diagnosis_Encounter_I"
    },
    "End_Diagnosis_Encounter_I": {
      "type": "EncounterEnd",
      "direct_transition": "Schedule Follow Up I"
    },
    "Schedule Follow Up I": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 9,
        "unit": "days"
      },
      "direct_transition": "Diagnosis Encounter II"
    },
    "Diagnosis Encounter II": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Chest CT Scan"
    },
    "Chest CT Scan": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter II",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "418891003",
          "display": "Computed tomography of chest and abdomen"
        }
      ],
      "duration": {
        "low": 20,
        "high": 60,
        "unit": "minutes"
      },
      "direct_transition": "End_Diagnosis_Encounter_II"
    },
    "End_Diagnosis_Encounter_II": {
      "type": "EncounterEnd",
      "direct_transition": "Schedule Follow Up II"
    },
    "Schedule Follow Up II": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 9,
        "unit": "days"
      },
      "distributed_transition": [
        {
          "distribution": 0.85,
          "transition": "Non-Small Cell Lung Cancer"
        },
        {
          "distribution": 0.15,
          "transition": "Small Cell Lung Cancer"
        }
      ],
      "remarks": [
        "About 85% of lung cancers are non-small cell lung cancers.",
        "About 10%-15% of lung cancers are small cell lung cancers.",
        "http://www.cancer.org/cancer/lungcancer/index"
      ]
    },
    "Non-Small Cell Lung Cancer": {
      "type": "SetAttribute",
      "attribute": "Lung Cancer Type",
      "value": "NSCLC",
      "direct_transition": "NSCLC"
    },
    "NSCLC": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter III",
      "assign_to_attribute": "Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "254637007",
          "display": "Non-small cell lung cancer (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter III"
    },
    "Small Cell Lung Cancer": {
      "type": "SetAttribute",
      "attribute": "Lung Cancer Type",
      "value": "SCLC",
      "direct_transition": "SCLC"
    },
    "SCLC": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter III",
      "assign_to_attribute": "Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "254632001",
          "display": "Small cell carcinoma of lung (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter III"
    },
    "Diagnosis Encounter III": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "reason": "Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.25,
          "transition": "Sputum Cytology (Phelgm)"
        },
        {
          "distribution": 0.25,
          "transition": "Thoracentesis (Fluid)"
        },
        {
          "distribution": 0.25,
          "transition": "Needle Biopsy (Cells)"
        },
        {
          "distribution": 0.25,
          "transition": "Bronchoscopy (Tube)"
        }
      ]
    },
    "Sputum Cytology (Phelgm)": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter III",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "167995008",
          "display": "Sputum microscopy (procedure)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter_III"
    },
    "Thoracentesis (Fluid)": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter III",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "91602002",
          "display": "Thoracentesis (procedure)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter_III"
    },
    "Needle Biopsy (Cells)": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter III",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "432231006",
          "display": "Fine needle aspiration biopsy of lung (procedure)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter_III"
    },
    "Bronchoscopy (Tube)": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter III",
      "reason": "Suspected Lung Cancer",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "173160006",
          "display": "Diagnostic fiberoptic bronchoscopy (procedure)"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter_III"
    },
    "End_Diagnosis_Encounter_III": {
      "type": "EncounterEnd",
      "direct_transition": "Schedule Follow Up III"
    },
    "Schedule Follow Up III": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "days"
      },
      "remarks": [
        "See Stage Distribution (%) 2006-2012, Case Counts and Percentages",
        "http://seer.cancer.gov/csr/1975_2013/browse_csr.php?sectionSEL=15&pageSEL=sect_15_table.14.html",
        "http://seer.cancer.gov/csr/1975_2013/browse_csr.php?sectionSEL=15&pageSEL=sect_15_table.13.html",
        "only 15 percent of lung cancer cases are diagnosed at an early stage.",
        "http://www.lung.org/lung-health-and-diseases/lung-disease-lookup/lung-cancer/learn-about-lung-cancer/lung-cancer-fact-sheet.html",
        "updated remarks 2017-08-31:",
        "http://oregon.providence.org/our-services/a/ask-a-providence-expert/forms-and-information/ask-an-expert-lung-cancer-growth-and-spread/",
        "It takes at least 30 divisions of one cancer cell to create a tumor that is 1 centimeter in size (about half an inch).",
        "That is the smallest size likely to be seen on an X-ray. It takes about three to six months for most lung cancers to double their size. ",
        "Therefore, it could take several years for a typical lung cancer to reach a size at which it could be diagnosed on a chest X-ray. "
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "lung_cancer_nondiagnosis_counter",
            "operator": "<=",
            "value": 36
          },
          "transition": "Stage I"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "lung_cancer_nondiagnosis_counter",
            "operator": "<=",
            "value": 72
          },
          "transition": "Stage II"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "lung_cancer_nondiagnosis_counter",
            "operator": "<=",
            "value": 108
          },
          "transition": "Stage III"
        },
        {
          "transition": "Stage IV"
        }
      ]
    },
    "Stage I": {
      "type": "Death",
      "range": {
        "low": 2,
        "high": 6,
        "unit": "years"
      },
      "referenced_by_attribute": "Lung Cancer",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "SCLC"
          },
          "transition": "SCLC I"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "NSCLC"
          },
          "transition": "NSCLC I"
        }
      ]
    },
    "Stage II": {
      "type": "Death",
      "range": {
        "low": 16,
        "high": 28,
        "unit": "months"
      },
      "referenced_by_attribute": "Lung Cancer",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "SCLC"
          },
          "transition": "SCLC II"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "NSCLC"
          },
          "transition": "NSCLC II"
        }
      ]
    },
    "Stage III": {
      "type": "Death",
      "range": {
        "low": 9,
        "high": 18,
        "unit": "months"
      },
      "referenced_by_attribute": "Lung Cancer",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "SCLC"
          },
          "transition": "SCLC III"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "NSCLC"
          },
          "transition": "NSCLC III"
        }
      ]
    },
    "Stage IV": {
      "type": "Death",
      "range": {
        "low": 6,
        "high": 10,
        "unit": "months"
      },
      "referenced_by_attribute": "Lung Cancer",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "SCLC"
          },
          "transition": "SCLC IV"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "NSCLC"
          },
          "transition": "NSCLC IV"
        }
      ]
    },
    "NSCLC I": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424132000",
          "display": "Non-small cell carcinoma of lung, TNM stage 1 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "NSCLC II": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "425048006",
          "display": "Non-small cell carcinoma of lung, TNM stage 2 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "NSCLC III": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "422968005",
          "display": "Non-small cell carcinoma of lung, TNM stage 3 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "NSCLC IV": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "423121009",
          "display": "Non-small cell carcinoma of lung, TNM stage 4 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "SCLC I": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "67811000119102",
          "display": "Primary small cell malignant neoplasm of lung, TNM stage 1 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "SCLC II": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "67821000119109",
          "display": "Primary small cell malignant neoplasm of lung, TNM stage 2 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "SCLC III": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "67831000119107",
          "display": "Primary small cell malignant neoplasm of lung, TNM stage 3 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "SCLC IV": {
      "type": "ConditionOnset",
      "target_encounter": "Diagnosis Encounter IV",
      "assign_to_attribute": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "67841000119103",
          "display": "Primary small cell malignant neoplasm of lung, TNM stage 4 (disorder)"
        }
      ],
      "direct_transition": "Diagnosis Encounter IV"
    },
    "Diagnosis Encounter IV": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "reason": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Lung_Cancer_CarePlan"
    },
    "Lung_Cancer_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Diagnosis Encounter IV",
      "reason": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "182964004",
          "display": "Terminal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "133918004",
          "display": "Comfort measures"
        },
        {
          "system": "SNOMED-CT",
          "code": "408957008",
          "display": "Chronic pain control management"
        },
        {
          "system": "SNOMED-CT",
          "code": "243072006",
          "display": "Cancer education"
        }
      ],
      "direct_transition": "MRI Brain"
    },
    "MRI Brain": {
      "type": "Procedure",
      "target_encounter": "Diagnosis Encounter IV",
      "reason": "Lung Cancer Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698354004",
          "display": "Magnetic resonance imaging for measurement of brain volume (procedure)"
        }
      ],
      "duration": {
        "low": 30,
        "high": 120,
        "unit": "minutes"
      },
      "direct_transition": "End_Diagnosis_Encounter_IV"
    },
    "End_Diagnosis_Encounter_IV": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "SCLC"
          },
          "transition": "SCLC Treatment Path"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "Lung Cancer Type",
            "operator": "==",
            "value": "NSCLC"
          },
          "transition": "NSCLC Treatment Path"
        }
      ]
    },
    "SCLC Treatment Path": {
      "type": "Simple",
      "direct_transition": "SCLC Treatment Encounter"
    },
    "SCLC Treatment Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Lung Cancer Condition",
      "remarks": [
        "TODO: This inpatient encounter should last 5 days, not the standard 15 minutes."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "SCLC Chemotheraphy I"
    },
    "SCLC Chemotheraphy I": {
      "type": "MedicationOrder",
      "target_encounter": "SCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "assign_to_attribute": "chemotherapy1",
      "remarks": [
        "SCLC is generally treated with combinations of chemotherapy drugs. The combinations most often used are: Cisplatin and etoposide",
        "http://www.cancer.org/cancer/lungcancer-smallcell/detailedguide/small-cell-lung-cancer-treating-chemotherapy"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1736854",
          "display": "Cisplatin 50 MG Injection"
        }
      ],
      "direct_transition": "SCLC Chemotheraphy IB"
    },
    "SCLC Chemotheraphy IB": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "chemotherapy1",
      "direct_transition": "SCLC Chemotheraphy II"
    },
    "SCLC Chemotheraphy II": {
      "type": "MedicationOrder",
      "target_encounter": "SCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "assign_to_attribute": "chemotherapy2",
      "remarks": [
        "SCLC is generally treated with combinations of chemotherapy drugs. The combinations most often used are: Cisplatin and etoposide",
        "http://www.cancer.org/cancer/lungcancer-smallcell/detailedguide/small-cell-lung-cancer-treating-chemotherapy"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1734340",
          "display": "Etoposide 100 MG Injection"
        }
      ],
      "direct_transition": "SCLC Chemotheraphy IIB"
    },
    "SCLC Chemotheraphy IIB": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "chemotherapy2",
      "direct_transition": "SCLC Radiation"
    },
    "SCLC Radiation": {
      "type": "Procedure",
      "target_encounter": "SCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "remarks": [
        "The type of radiation therapy most often used to treat SCLC is called external beam radiation therapy (EBRT).",
        "http://www.cancer.org/cancer/lungcancer-smallcell/detailedguide/small-cell-lung-cancer-treating-radiation-therapy"
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "703423002",
          "display": "Combined chemotherapy and radiation therapy (procedure)"
        }
      ],
      "duration": {
        "low": 0.5,
        "high": 4,
        "unit": "hours"
      },
      "direct_transition": "End_SCLC_Treatment_Encounter"
    },
    "End_SCLC_Treatment_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "SCLC Treatment Delay"
    },
    "SCLC Treatment Delay": {
      "type": "Delay",
      "range": {
        "low": 21,
        "high": 28,
        "unit": "days"
      },
      "remarks": [
        "Doctors give chemo in cycles, with a period of treatment (usually 1 to 3 days) followed by a rest period to allow your body time to recover. Each cycle generally lasts about 3 to 4 weeks",
        "http://www.cancer.org/cancer/lungcancer-smallcell/detailedguide/small-cell-lung-cancer-treating-chemotherapy",
        "Most often, radiation as part of the initial treatment for SCLC is given once or twice daily, 5 days a week, for 3 to 7 weeks.",
        "http://www.cancer.org/cancer/lungcancer-smallcell/detailedguide/small-cell-lung-cancer-treating-radiation-therapy"
      ],
      "direct_transition": "SCLC Treatment Path"
    },
    "NSCLC Treatment Path": {
      "type": "Simple",
      "direct_transition": "NSCLC Treatment Encounter"
    },
    "NSCLC Treatment Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "remarks": [
        "TODO: This inpatient encounter should last 5 days, not the standard 15 minutes."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "NSCLC Chemotheraphy I"
    },
    "NSCLC Chemotheraphy I": {
      "type": "MedicationOrder",
      "target_encounter": "NSCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "assign_to_attribute": "chemotherapy1",
      "remarks": [
        "Most often, treatment for NSCLC uses a combination of 2 chemo drugs.",
        "If a combination is used, it often includes cisplatin or carboplatin plus one other drug",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-treating-chemotherapy"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1736854",
          "display": "Cisplatin 50 MG Injection"
        }
      ],
      "direct_transition": "NSCLC Chemotheraphy IB"
    },
    "NSCLC Chemotheraphy IB": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "chemotherapy1",
      "direct_transition": "NSCLC Chemotheraphy II"
    },
    "NSCLC Chemotheraphy II": {
      "type": "MedicationOrder",
      "target_encounter": "NSCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "assign_to_attribute": "chemotherapy2",
      "remarks": [
        "The chemo drugs most often used for NSCLC include ... Paclitaxel (Taxol)",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-treating-chemotherapy"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "583214",
          "display": "PACLitaxel 100 MG Injection"
        }
      ],
      "direct_transition": "NSCLC Chemotheraphy IIB"
    },
    "NSCLC Chemotheraphy IIB": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "chemotherapy2",
      "direct_transition": "NSCLC Radiation"
    },
    "NSCLC Radiation": {
      "type": "Procedure",
      "target_encounter": "NSCLC Treatment Encounter",
      "reason": "Lung Cancer Condition",
      "remarks": [
        "External beam radiation therapy (EBRT) focuses radiation from outside the body on the cancer. This is the type of radiation therapy most often used to treat NSCLC or its spread to other organs.",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-treating-radiation-therapy"
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "703423002",
          "display": "Combined chemotherapy and radiation therapy (procedure)"
        }
      ],
      "duration": {
        "low": 0.5,
        "high": 4,
        "unit": "hours"
      },
      "direct_transition": "End_NSCLC_Treatment_Encounter"
    },
    "End_NSCLC_Treatment_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "NSCLC Treatment Delay"
    },
    "NSCLC Treatment Delay": {
      "type": "Delay",
      "range": {
        "low": 28,
        "high": 35,
        "unit": "days"
      },
      "remarks": [
        "Doctors give chemo in cycles, with a period of treatment (usually 1 to 3 days) followed by a rest period to allow the body time to recover. Some chemo drugs, though, are given every day. Chemo cycles generally last about 3 to 4 weeks.",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-treating-radiation-therapy",
        "Most often, radiation treatments to the lungs are given 5 days a week for 5 to 7 weeks",
        "http://www.cancer.org/cancer/lungcancer-non-smallcell/detailedguide/non-small-cell-lung-cancer-treating-radiation-therapy"
      ],
      "direct_transition": "NSCLC Treatment Path"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"lupus":{
  "name": "Lupus",
  "remarks": [
    "Lupus is a somewhat uncommon autoimmune disease that causes widespread inflammation. ",
    "It is also categorized as a type of arthritis. Prior to the discovery of corticosteroids ",
    "in the mid 1900's lupus was treated with quinine and salicylates.",
    "Information on treatment, prevalence, and incidence of specific arthritis types from the CDC: ",
    "http://www.cdc.gov/arthritis/basics/types.html",
    "Overall prevalence of arthritis: ",
    "http://www.cdc.gov/arthritis/data_statistics/national-statistics.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        " | Arthritis Type | Prevalence | Ratio F:M | ",
        " ------------------------------------------- ",
        " | Lupus          |   0.00054  |    6:1    | ",
        " ------------------------------------------- "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.000077143,
              "transition": "Delay_Until_Lupus"
            },
            {
              "distribution": 0.999922857,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.0004629,
              "transition": "Delay_Until_Lupus"
            },
            {
              "distribution": 0.9995371,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Delay_Until_Lupus": {
      "type": "Delay",
      "range": {
        "low": 25,
        "high": 80,
        "unit": "years"
      },
      "direct_transition": "Lupus"
    },
    "Lupus": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " LUPUS                                                                ",
        "======================================================================",
        "Source: http://www.cdc.gov/arthritis/basics/lupus.htm"
      ],
      "target_encounter": "Lupus_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "200936003",
          "display": "Lupus erythematosus"
        }
      ],
      "direct_transition": "Lupus_Diagnosis"
    },
    "Lupus_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Lupus",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Lupus_Symptom1"
    },
    "Lupus_Symptom1": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Lupus_Symptom2"
    },
    "Lupus_Symptom2": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Lupus_Symptom3"
    },
    "Lupus_Symptom3": {
      "type": "Symptom",
      "symptom": "Rash",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Lupus_Symptom4"
    },
    "Lupus_Symptom4": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Lupus_CarePlan"
    },
    "Lupus_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Lupus_Diagnosis",
      "assign_to_attribute": "lupus_careplan",
      "reason": "Lupus",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "440381005",
          "display": "Behavior to prevent sun exposure"
        },
        {
          "system": "SNOMED-CT",
          "code": "226234005",
          "display": "Healthy diet"
        }
      ],
      "direct_transition": "Lupus_Nonopioid_Pain_Medication"
    },
    "Lupus_Nonopioid_Pain_Medication": {
      "type": "MedicationOrder",
      "target_encounter": "Lupus_Diagnosis",
      "reason": "Lupus",
      "codes": [
        {
          "system": "RxNorm",
          "code": "849727",
          "display": "Naproxen sodium 220 MG [Aleve]"
        }
      ],
      "direct_transition": "Corticosteroid"
    },
    "Corticosteroid": {
      "type": "MedicationOrder",
      "target_encounter": "Lupus_Diagnosis",
      "assign_to_attribute": "lupus_corticosteroid",
      "reason": "Lupus",
      "remarks": [
        "When introduced in higher levels than those produced by the body, corticosteroids ",
        "inhibit inflammation. However, doctors prefer to use these for as short a time period ",
        "as possible to avoid dangerous side effects."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "567645",
          "display": "predniSONE 2.5 MG [Deltasone]"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Corticosteroid_Treatment"
    },
    "Corticosteroid_Treatment": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      },
      "direct_transition": "End_Corticosteroid"
    },
    "End_Corticosteroid": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "lupus_corticosteroid",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Immune_Suppressant"
          },
          "transition": "End_Immune_Suppressant"
        },
        {
          "transition": "Wait_For_Lupus_Flareup"
        }
      ]
    },
    "Wait_For_Lupus_Flareup": {
      "type": "Delay",
      "remarks": [
        "About 60% of patients have a flare-up each year. 84% every 2 years."
      ],
      "range": {
        "low": 1,
        "high": 3,
        "unit": "years"
      },
      "distributed_transition": [
        {
          "distribution": 0.84,
          "transition": "Lupus_Flareup"
        },
        {
          "distribution": 0.16,
          "transition": "Wait_For_Lupus_Flareup"
        }
      ]
    },
    "Lupus_Flareup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Lupus",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Immune_Suppressant"
    },
    "Immune_Suppressant": {
      "type": "MedicationOrder",
      "target_encounter": "Lupus_Flareup",
      "reason": "Lupus",
      "remarks": [
        "More aggressive immune suppressants are used for subsequent flares."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "835900",
          "display": "cycloSPORINE, modified 100 MG [Neoral]"
        }
      ],
      "direct_transition": "Flareup_Corticosteroid"
    },
    "Flareup_Corticosteroid": {
      "type": "MedicationOrder",
      "target_encounter": "Lupus_Flareup",
      "assign_to_attribute": "lupus_corticosteroid",
      "reason": "Lupus",
      "remarks": [
        "When introduced in higher levels than those produced by the body, corticosteroids ",
        "inhibit inflammation. However, doctors prefer to use these for as short a time period ",
        "as possible to avoid dangerous side effects."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "567645",
          "display": "predniSONE 2.5 MG [Deltasone]"
        }
      ],
      "direct_transition": "End_Flareup_Encounter"
    },
    "End_Flareup_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Corticosteroid_Treatment"
    },
    "End_Immune_Suppressant": {
      "type": "MedicationEnd",
      "medication_order": "Immune_Suppressant",
      "direct_transition": "Wait_For_Lupus_Flareup"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"med_rec":{
  "name": "Medication Reconciliation",
  "remarks": [
    "This module will generate a documentation of current medications procedure at 45% of",
    "wellness encounters. Through the Meaningful Use program, ONC is striving for",
    "medication reconciliation at 50% of encounters. This assumes that we are not",
    "at the goal level yet.",
    "Source: https://www.healthit.gov/providers-professionals/achieve-meaningful-use/core-measures-2/medication-reconciliation"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Wellness_Encounter"
    },
    "Wellness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "distributed_transition": [
        {
          "distribution": 0.45,
          "transition": "Med_Rec"
        },
        {
          "distribution": 0.55,
          "transition": "Initial"
        }
      ]
    },
    "Med_Rec": {
      "type": "Procedure",
      "target_encounter": "Wellness_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "428191000124101",
          "display": "Documentation of current medications"
        }
      ],
      "direct_transition": "Initial"
    }
  }
}
,
"medications/ear_infection_antibiotic":{
  "name": "Ear Infection Antibiotic",
  "remarks": [
    "This submodule prescribes an antibiotic used to treat ear infections ",
    "(otitis media). If no medication is available in the current year of ",
    "the simulation then none is prescribed.",
    "IT IS UP TO THE CALLING MODULE TO END THIS MEDICATION BY ATTRIBUTE.",
    "All antibiotics prescribed in this module are assigned to the attribute ",
    "'antibiotic_prescription'.",
    "Source for common antibiotics used to treat otitis media: ",
    "http://www.nps.org.au/conditions/ear-nose-mouth-and-throat-disorders/ear-nose-and-throat-infections/ear-infection-middle/for-individuals/medicines-and-treatments",
    "Availability dates for different drugs came from the FDA: ",
    "http://www.accessdata.fda.gov/scripts/cder/daf/",
    "Dosage information came from FDA reference sheets available at: ",
    "https://www.drugs.com/dosage/",
    "Medications prescribed in this module:     ",
    "1. Penicillin        available after 1945  ",
    "2. Ampicillin        available after 1961  ",
    "3. Doxycycline       available after 1967  ",
    "4. Amoxicillin       available after 1979  ",
    "5. Cefaclor          available 1979 - 2004 ",
    "6. Cefuroxime        available after 1983  "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "antibiotic_prescription",
            "operator": "is nil"
          },
          "transition": "Prescribe_Ear_Infection_Antibiotic"
        },
        {
          "transition": "Ear_Infection_Antibiotic_Terminal"
        }
      ]
    },
    "Prescribe_Ear_Infection_Antibiotic": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1945
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Ear_Infection_Antibiotic_Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1961
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Penicillin"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1967
          },
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Prescribe_Penicillin"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Ampicillin"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1979
          },
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Penicillin"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Ampicillin"
            },
            {
              "distribution": 0.6,
              "transition": "Prescribe_Doxycycline"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1983
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Prescribe_Amoxicillin"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Cefaclor"
            },
            {
              "distribution": 0.1,
              "transition": "Prescribe_Doxycycline"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2004
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Prescribe_Amoxicillin"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Cefaclor"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Cefuroxime"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Prescribe_Amoxicillin"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Cefuroxime"
            }
          ]
        }
      ]
    },
    "Prescribe_Penicillin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "remarks": [
        "Historically this was injected, not ingested. There are still modern ",
        "variant of penicillin that come as oral or injectable solutions. There ",
        "is no distinction between a pediatric and adult dose."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "105078",
          "display": "Penicillin G 375 MG/ML Injectable Solution"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 4,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Prescribe_Ampicillin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "remarks": [
        "Historically this was injected, not ingested. There are still modern ",
        "variant of ampicillin that come as oral or injectable solutions. There ",
        "is no distinction between a pediatric and adult dose."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "789980",
          "display": "Ampicillin 100 MG/ML Injectable Solution"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Prescribe_Doxycycline": {
      "type": "Simple",
      "remarks": [
        "Not recommended for children < 8 years old. For children the dose is ",
        "100 - 200mg/day. For adults, the dose is 200mg/day."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Doxycycline"
        },
        {
          "transition": "Adult_Doxycycline"
        }
      ]
    },
    "Pediatric_Doxycycline": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1652673",
          "display": "Doxycycline Monohydrate 50 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          },
          {
            "system": "SNOMED-CT",
            "code": "419115000",
            "display": "Do not take milk, indigestion remedies, or medicines containing iron or zinc at the same time of day as this medicine"
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Adult_Doxycycline": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1650142",
          "display": "Doxycycline Monohydrate 100 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          },
          {
            "system": "SNOMED-CT",
            "code": "419115000",
            "display": "Do not take milk, indigestion remedies, or medicines containing iron or zinc at the same time of day as this medicine"
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Prescribe_Amoxicillin": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Amoxicillin"
        },
        {
          "transition": "Adult_Amoxicillin"
        }
      ]
    },
    "Pediatric_Amoxicillin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "392151",
          "display": "Amoxicillin 200 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Adult_Amoxicillin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "308192",
          "display": "Amoxicillin 500 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 3,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Prescribe_Cefaclor": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Cefaclor"
        },
        {
          "transition": "Adult_Cefaclor"
        }
      ]
    },
    "Pediatric_Cefaclor": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "309045",
          "display": "Cefaclor 250 MG Oral Capsule"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Adult_Cefaclor": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "309043",
          "display": "12 HR Cefaclor 500 MG Extended Release Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Prescribe_Cefuroxime": {
      "type": "MedicationOrder",
      "assign_to_attribute": "antibiotic_prescription",
      "remarks": [
        "The pediatric and adult doses of Cefuroxime are the same."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "309097",
          "display": "Cefuroxime 250 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 2,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 10,
          "unit": "days"
        },
        "instructions": [
          {
            "system": "SNOMED-CT",
            "code": "418577003",
            "display": "Take at regular intervals. Complete the prescribed course unless otherwise directed."
          }
        ]
      },
      "direct_transition": "Ear_Infection_Antibiotic_Terminal"
    },
    "Ear_Infection_Antibiotic_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"medications/moderate_opioid_pain_reliever":{
  "name": "Moderate Opioid Pain Reliever",
  "remarks": [
    "This submodule prescribes a moderate opioid pain reliever for acute pain. ",
    "For example, after a major surgery or injury. Medications prescribed ",
    "in this module are accurate for the current year of the simulation. ",
    "If a patient is not eligible for an opioid pain reliever (for example, ",
    "if they are already taking one, or if they are a young child), none is prescribed.",
    "All medications prescribed in this module are assigned to the attribute ",
    "'opioid_prescription'. It is the responsibility of the Opioid Addiction module ",
    "to end this medication.",
    "Availability dates for different drugs came from the FDA: ",
    "http://www.accessdata.fda.gov/scripts/cder/daf/",
    "Dosage information came from FDA reference sheets available at: ",
    "https://www.drugs.com/dosage/",
    "The following medications are prescribed in this module. Most opioids were invented ",
    "during or prior to WWII, but did not become widely available until after the war:",
    "1. Meperidine (Demerol)                      available after 1945      ",
    "2. Hydrocodone/Acetaminophen (Vicondin)      available after 1943      ",
    "3. Oxycodone/Acetaminophen (Percocet)        available after 1920 (est)"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "opioid_prescription",
                "operator": "is nil"
              },
              {
                "condition_type": "Age",
                "operator": ">=",
                "quantity": 12,
                "unit": "years"
              }
            ]
          },
          "transition": "Prescribe_Moderate_Opioid"
        },
        {
          "transition": "Moderate_Opioid_Terminal"
        }
      ]
    },
    "Prescribe_Moderate_Opioid": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1920
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Moderate_Opioid_Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1945
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Oxycodone_Acetaminophen"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.4,
              "transition": "Prescribe_Meperidine"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Oxycodone_Acetaminophen"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Hydrocodone_Acetaminophen"
            }
          ]
        }
      ]
    },
    "Prescribe_Meperidine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "861467",
          "display": "Meperidine Hydrochloride 50 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 4,
          "unit": "hours"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Moderate_Opioid_Terminal"
    },
    "Prescribe_Oxycodone_Acetaminophen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049221",
          "display": "Acetaminophen 325 MG / oxyCODONE Hydrochloride 5 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 6,
          "unit": "hours"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Moderate_Opioid_Terminal"
    },
    "Prescribe_Hydrocodone_Acetaminophen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "857005",
          "display": "Acetaminophen 325 MG / HYDROcodone Bitartrate 7.5 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 6,
          "unit": "hours"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Moderate_Opioid_Terminal"
    },
    "Moderate_Opioid_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"medications/otc_antihistamine":{
  "name": "Over-The-Counter Antihistamine",
  "remarks": [
    "This submodule correctly prescribes an over-the-counter antihistamine ",
    "that has accurate dosage for adults and children and is accurate for the ",
    "current year of the simulation. Medications are not prescribed before they ",
    "were invented, and older medications (e.g. benadryl) are prescribed less ",
    "frequently as alternatives (e.g. claritin) become available.",
    "IT IS THE RESPONSIBILITY OF THE CALLING MODULE TO END THIS MEDICATION BY ATTRIBUTE.",
    "All medications prescribed in this module are assigned to the attribute ",
    "'otc_antihistamine'.",
    "Availability dates for different drugs came from the FDA: ",
    "http://www.accessdata.fda.gov/scripts/cder/daf/",
    "Dosage information came from FDA reference sheets available at: ",
    "https://www.drugs.com/dosage/",
    "Although there are now liquid forms of some medications (especially for ",
    "children), it's unclear when those became available and the dosing is too ",
    "complicated to model easily. For simplicity, all OTC antihistamines prescribed ",
    "in this module are of the oral tablet type.",
    "Historically there has been 3 'generations' of antihistamines: ",
    "Generaton 1 H1 antihistamines: ",
    "1. Diphenhydramine (Benadryl)           available after 1946 ",
    "2. Chlorphenamine (Chlor-Timeton)       available after 1951 ",
    "Generation 2 H1 antihistamines. Some were discontinued in the 1990's due ",
    "to rare but serious risk of cardiac arrest: ",
    "3. Astemizole (Hismanal)                available 1977 - 1990 ",
    "4. Terfenadine (Seldane)                available 1985 - 1992 ",
    "5. Loratadine (Claritin)                available after 1993 ",
    "6. Cetirizine (Zyrtec)                  available after 2007 ",
    "Generation 3 H1 antihistamines: ",
    "7. Fexofenadine (Allegra)               available after 1996 "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "otc_antihistamine",
            "operator": "is nil"
          },
          "transition": "Prescribe_OTC_Antihistamine"
        },
        {
          "transition": "OTC_Anthistamine_Terminal"
        }
      ]
    },
    "Prescribe_OTC_Antihistamine": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1946
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "OTC_Anthistamine_Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1951
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Diphenhydramine"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1977
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Prescribe_Diphenhydramine"
            },
            {
              "distribution": 0.6,
              "transition": "Prescribe_Chlorphenamine"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1985
          },
          "distributions": [
            {
              "distribution": 0.34,
              "transition": "Prescribe_Diphenhydramine"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Chlorphenamine"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Astemizole"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1992
          },
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Diphenhydramine"
            },
            {
              "distribution": 0.2,
              "transition": "Prescribe_Chlorphenamine"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Astemizole"
            },
            {
              "distribution": 0.3,
              "transition": "Prescribe_Terfenadine"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1996
          },
          "distributions": [
            {
              "distribution": 0.2,
              "transition": "Prescribe_Diphenhydramine"
            },
            {
              "distribution": 0.8,
              "transition": "Prescribe_Loratadine"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 2007
          },
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Prescribe_Loratadine"
            },
            {
              "distribution": 0.5,
              "transition": "Prescribe_Fexofenadine"
            }
          ]
        },
        {
          "remarks": [
            "After 2007, only the latest generation and most common antihistamines ",
            "are still prescribed."
          ],
          "distributions": [
            {
              "distribution": 0.34,
              "transition": "Prescribe_Loratadine"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Fexofenadine"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Cetirizine"
            }
          ]
        }
      ]
    },
    "Prescribe_Diphenhydramine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "remarks": [
        "There is no distinction between pediatric and adult forms of this ",
        "medication. Adults just take more doses of the standard 25mg pill."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049630",
          "display": "diphenhydrAMINE Hydrochloride 25 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Chlorphenamine": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Chlorphenamine"
        },
        {
          "transition": "Adult_Chlorphenamine"
        }
      ]
    },
    "Pediatric_Chlorphenamine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "239981",
          "display": "Chlorpheniramine 2 MG Chewable Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Adult_Chlorphenamine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "389128",
          "display": "Chlorpheniramine 8 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Astemizole": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "remarks": [
        "There is only one RxNorm code available for this medication.",
        "Since it was withdrawn from the market in the 1990's there is ",
        "only limited information available."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "197378",
          "display": "Astemizole 10 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Terfenadine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "remarks": [
        "There are few RxNorm codes available for this medication.",
        "Since it was withdrawn from the market in the 1990's there is ",
        "only limited information available."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "141918",
          "display": "Terfenadine 60 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Loratadine": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Loratadine"
        },
        {
          "transition": "Adult_Loratadine"
        }
      ]
    },
    "Pediatric_Loratadine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "665078",
          "display": "Loratadine 5 MG Chewable Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Adult_Loratadine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "311372",
          "display": "Loratadine 10 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Fexofenadine": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Fexofenadine"
        },
        {
          "transition": "Adult_Fexofenadine"
        }
      ]
    },
    "Pediatric_Fexofenadine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "997488",
          "display": "Fexofenadine hydrochloride 30 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Adult_Fexofenadine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "997501",
          "display": "Fexofenadine hydrochloride 60 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Prescribe_Cetirizine": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Cetirizine"
        },
        {
          "transition": "Adult_Cetirizine"
        }
      ]
    },
    "Pediatric_Cetirizine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1014676",
          "display": "cetirizine hydrochloride 5 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "Adult_Cetirizine": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_antihistamine",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1014678",
          "display": "cetirizine hydrochloride 10 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Anthistamine_Terminal"
    },
    "OTC_Anthistamine_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"medications/otc_pain_reliever":{
  "name": "Over-The-Counter Pain Reliever",
  "remarks": [
    "This submodule correctly prescribes an over-the-counter pain reliever ",
    "that has accurate dosage for adults and children and is accurate for the ",
    "current year of the simulation. Medications are not prescribed before they ",
    "were invented, and older medications (e.g. aspirin) are prescribed less ",
    "frequently as alternatives (e.g. acetaminophen) become available.",
    "IT IS THE RESPONSIBILITY OF THE CALLING MODULE TO END THIS MEDICATION BY ATTRIBUTE.",
    "All medications prescribed in this module are assigned to the attribute ",
    "'otc_pain_reliever'.",
    "Availability dates for different drugs came from the FDA: ",
    "http://www.accessdata.fda.gov/scripts/cder/daf/",
    "Dosage information came from FDA reference sheets available at: ",
    "https://www.drugs.com/dosage/",
    "Although there are now liquid forms of some medications (especially for ",
    "children), it's unclear when those became available and the dosing is too ",
    "complicated to model easily. For simplicity, all OTC pain relievers prescribed ",
    "in this module are of the oral tablet type.",
    "The following medications may be prescribed by this module:  ",
    "1. Aspirin                              available after 1899 ",
    "2. Acetaminophen (Tylenol)              available after 1950 ",
    "3. Ibuprofen (Motrin, Advil)            available after 1974 ",
    "4. Naproxen Sodium (Aleve)              available after 1994 "
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "otc_pain_reliever",
            "operator": "is nil"
          },
          "transition": "Prescribe_OTC_Pain_Reliever"
        },
        {
          "transition": "OTC_Pain_Reliever_Terminal"
        }
      ]
    },
    "Prescribe_OTC_Pain_Reliever": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1899
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "OTC_Pain_Reliever_Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1950
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Aspirin"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1974
          },
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Prescribe_Aspirin"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Acetaminophen"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1994
          },
          "distributions": [
            {
              "distribution": 0.15,
              "transition": "Prescribe_Aspirin"
            },
            {
              "distribution": 0.6,
              "transition": "Prescribe_Acetaminophen"
            },
            {
              "distribution": 0.25,
              "transition": "Prescribe_Ibuprofen"
            }
          ]
        },
        {
          "remarks": [
            "After 1994, all medications are available. At this point ",
            "aspirin is phased out in favor of newer alternatives."
          ],
          "distributions": [
            {
              "distribution": 0.34,
              "transition": "Prescribe_Acetaminophen"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Ibuprofen"
            },
            {
              "distribution": 0.33,
              "transition": "Prescribe_Naproxen_Sodium"
            }
          ]
        }
      ]
    },
    "Prescribe_Aspirin": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "remarks": [
        "There is no children's dose of aspirin. Anyone prescribed aspirin ",
        "gets the same 81mg dose."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "243670",
          "display": "Aspirin 81 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "Prescribe_Acetaminophen": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Acetaminophen"
        },
        {
          "transition": "Adult_Acetaminophen"
        }
      ]
    },
    "Pediatric_Acetaminophen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "codes": [
        {
          "system": "RxNorm",
          "code": "282464",
          "display": "Acetaminophen 160 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "Adult_Acetaminophen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "codes": [
        {
          "system": "RxNorm",
          "code": "313782",
          "display": "Acetaminophen 325 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "Prescribe_Ibuprofen": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "transition": "Pediatric_Ibuprofen"
        },
        {
          "transition": "Adult_Ibuprofen"
        }
      ]
    },
    "Pediatric_Ibuprofen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "codes": [
        {
          "system": "RxNorm",
          "code": "198405",
          "display": "Ibuprofen 100 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "Adult_Ibuprofen": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "codes": [
        {
          "system": "RxNorm",
          "code": "310965",
          "display": "Ibuprofen 200 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "Prescribe_Naproxen_Sodium": {
      "type": "Simple",
      "remarks": [
        "Naproxen Sodium is not prescribed for children. Patients < age 12 that ",
        "reach this state are redirected to Acetaminophen or Ibuprofen."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 12,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Prescribe_Acetaminophen"
            },
            {
              "distribution": 0.5,
              "transition": "Prescribe_Ibuprofen"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "Naproxen_Sodium"
            }
          ]
        }
      ]
    },
    "Naproxen_Sodium": {
      "type": "MedicationOrder",
      "assign_to_attribute": "otc_pain_reliever",
      "codes": [
        {
          "system": "RxNorm",
          "code": "849574",
          "display": "Naproxen sodium 220 MG Oral Tablet"
        }
      ],
      "prescription": {
        "as_needed": true
      },
      "direct_transition": "OTC_Pain_Reliever_Terminal"
    },
    "OTC_Pain_Reliever_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"medications/strong_opioid_pain_reliever":{
  "name": "Strong Opioid Pain Reliever",
  "remarks": [
    "This submodule prescribes a strong opioid pain reliever for chronic or ",
    "terminal pain. For example, the late stages of cancer. Medications prescribed ",
    "in this module are accurate for the current year of the simulation. ",
    "If a patient is not eligible for an opioid pain reliever (for example, ",
    "if they are already taking one, or if they are a young child), none is prescribed.",
    "All medications prescribed in this module are assigned to the attribute ",
    "'opioid_prescription'. It is the responsibility of the Opioid Addiction module ",
    "to end this medication.",
    "Availability dates for different drugs came from the FDA: ",
    "http://www.accessdata.fda.gov/scripts/cder/daf/",
    "Dosage information came from FDA reference sheets available at: ",
    "https://www.drugs.com/dosage/",
    "The following medications are prescribed in this module. Most opioids were invented ",
    "during or prior to WWII, but did not become widely available until after the war:",
    "1. Methadone (Dolophine)             available after 1947      ",
    "2. Oxycodone (OxyContin)             available after 1920 (est)"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "opioid_prescription",
                "operator": "is nil"
              },
              {
                "condition_type": "Age",
                "operator": ">=",
                "quantity": 12,
                "unit": "years"
              }
            ]
          },
          "transition": "Prescribe_Strong_Opioid"
        },
        {
          "transition": "Strong_Opioid_Terminal"
        }
      ]
    },
    "Prescribe_Strong_Opioid": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1920
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Strong_Opioid_Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Date",
            "operator": "<",
            "year": 1947
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Prescribe_Oxycodone"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.6,
              "transition": "Prescribe_Oxycodone"
            },
            {
              "distribution": 0.4,
              "transition": "Prescribe_Methadone"
            }
          ]
        }
      ]
    },
    "Prescribe_Oxycodone": {
      "type": "MedicationOrder",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049683",
          "display": "oxyCODONE Hydrochloride 10 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 6,
          "unit": "hours"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Strong_Opioid_Terminal"
    },
    "Prescribe_Methadone": {
      "type": "MedicationOrder",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "864718",
          "display": "Methadone Hydrochloride 5 MG Oral Tablet"
        }
      ],
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 12,
          "unit": "hours"
        },
        "duration": {
          "quantity": 2,
          "unit": "weeks"
        }
      },
      "direct_transition": "Strong_Opioid_Terminal"
    },
    "Strong_Opioid_Terminal": {
      "type": "Terminal"
    }
  }
}
,
"metabolic_syndrome_care":{
  "name": "Metabolic Syndrome Standards of Care",
  "remarks": [],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "Initial impl == direct translation of ruby module"
      ],
      "direct_transition": "Wellness_Encounter"
    },
    "Wellness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Check_Hypertension"
    },
    "Check_Hypertension": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Age",
                "operator": ">=",
                "quantity": 18,
                "unit": "years"
              },
              {
                "condition_type": "Attribute",
                "attribute": "hypertension",
                "operator": "==",
                "value": true
              }
            ]
          },
          "transition": "Diagnose_Hypertension"
        },
        {
          "transition": "Check_Diabetes"
        }
      ]
    },
    "Diagnose_Hypertension": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "38341003",
          "display": "Hypertension"
        }
      ],
      "direct_transition": "Check_Diabetes"
    },
    "Check_Diabetes": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes",
                "operator": "is not nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "prediabetes",
                "operator": "is not nil"
              }
            ]
          },
          "transition": "Record_HA1C"
        },
        {
          "transition": "Obese_Check"
        }
      ]
    },
    "Record_HA1C": {
      "type": "Observation",
      "vital_sign": "Blood Glucose",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "4548-4",
          "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
        }
      ],
      "unit": "%",
      "direct_transition": "Blood_Sugar_Check"
    },
    "Diagnosis": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "4548-4",
                "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
              }
            ],
            "operator": "<=",
            "value": 5.7
          },
          "remarks": [
            "Normal level"
          ],
          "transition": "Wellness_Encounter"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "4548-4",
                "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
              }
            ],
            "operator": "<=",
            "value": 6.5
          },
          "remarks": [
            "Prediabetic level"
          ],
          "transition": "Set_Severity_0"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "4548-4",
                "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
              }
            ],
            "operator": "<=",
            "value": 7.5
          },
          "remarks": [
            "Diabetic level"
          ],
          "transition": "Set_Severity_1"
        },
        {
          "condition": {
            "condition_type": "Observation",
            "codes": [
              {
                "system": "LOINC",
                "code": "4548-4",
                "display": "Hemoglobin A1c/Hemoglobin.total in Blood"
              }
            ],
            "operator": "<=",
            "value": 9
          },
          "remarks": [
            "Severe level"
          ],
          "transition": "Set_Severity_2"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": "is not nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": ">=",
                "value": 3
              },
              {
                "condition_type": "PriorState",
                "name": "Set_Severity_3",
                "within": {
                  "quantity": 1,
                  "unit": "years"
                }
              }
            ]
          },
          "remarks": [
            "in words - if the severity is >= 3 and they have been set severity 3 within a year"
          ],
          "transition": "Set_Severity_4"
        },
        {
          "remarks": [
            "> severe level"
          ],
          "transition": "Set_Severity_3"
        }
      ]
    },
    "Set_Severity_0": {
      "type": "SetAttribute",
      "attribute": "diabetes_severity",
      "value": 0,
      "remarks": [
        "setting prediabetes as severity 0 makes some things easier"
      ],
      "direct_transition": "Diagnose_Prediabetes"
    },
    "Diagnose_Prediabetes": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "15777000",
          "display": "Prediabetes"
        }
      ],
      "assign_to_attribute": "diabetes_stage",
      "direct_transition": "Check_CarePlan"
    },
    "Set_Severity_1": {
      "type": "SetAttribute",
      "attribute": "diabetes_severity",
      "value": 1,
      "direct_transition": "Diagnose_Diabetes"
    },
    "Set_Severity_2": {
      "type": "SetAttribute",
      "attribute": "diabetes_severity",
      "value": 2,
      "direct_transition": "Diagnose_Diabetes"
    },
    "Set_Severity_3": {
      "type": "SetAttribute",
      "attribute": "diabetes_severity",
      "value": 3,
      "direct_transition": "Diagnose_Diabetes"
    },
    "Set_Severity_4": {
      "type": "SetAttribute",
      "attribute": "diabetes_severity",
      "value": 4,
      "direct_transition": "Diagnose_Diabetes"
    },
    "Diagnose_Diabetes": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "44054006",
          "display": "Diabetes"
        }
      ],
      "assign_to_attribute": "diabetes_stage",
      "direct_transition": "Check_CarePlan"
    },
    "Check_CarePlan": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active CarePlan",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "698360004",
                "display": "Diabetes self management plan"
              }
            ]
          },
          "transition": "Prescribe_Medications"
        },
        {
          "transition": "Diabetic_CarePlan"
        }
      ]
    },
    "Diabetic_CarePlan": {
      "type": "CarePlanStart",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698360004",
          "display": "Diabetes self management plan"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "160670007",
          "display": "Diabetic diet"
        },
        {
          "system": "SNOMED-CT",
          "code": "229065009",
          "display": "Exercise therapy"
        }
      ],
      "goals": [
        {
          "observation": {
            "codes": [
              {
                "system": "LOINC",
                "code": "4548-4",
                "display": "Hemoglobin A1c total in Blood"
              }
            ],
            "operator": "<",
            "value": "7.0"
          },
          "addresses": [
            "diabetes_stage"
          ]
        },
        {
          "observation": {
            "codes": [
              {
                "system": "LOINC",
                "code": "2339-0",
                "display": "Glucose [Mass/volume] in Blood"
              }
            ],
            "operator": "<",
            "value": "108"
          },
          "addresses": [
            "diabetes_stage"
          ]
        },
        {
          "text": "Maintain blood pressure below 140/90 mmHg",
          "addresses": [
            "diabetes_stage"
          ]
        },
        {
          "text": "Improve and maintenance of optimal foot health: aim at early detection of peripheral vascular problems and neuropathy presumed due to diabetes; and prevention of diabetic foot ulcer, gangrene",
          "addresses": [
            "diabetes_stage"
          ]
        },
        {
          "text": "Address patient knowledge deficit on diabetic self-care",
          "addresses": [
            "diabetes_stage"
          ]
        }
      ],
      "remarks": [
        "based on https://github.com/clinical-cloud/sample-careplans"
      ],
      "reason": "diabetes_stage",
      "direct_transition": "Prescribe_Medications"
    },
    "Prescribe_Medications": {
      "type": "Simple",
      "direct_transition": "Monotherapy"
    },
    "Monotherapy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": ">=",
                "value": 2
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Medication",
                  "codes": [
                    {
                      "system": "RxNorm",
                      "code": "860975",
                      "display": "24 HR Metformin hydrochloride 500 MG Extended Release Oral Tablet"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Prescribe_Metformin"
        },
        {
          "transition": "Bitherapy"
        }
      ]
    },
    "Prescribe_Metformin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "860975",
          "display": "24 HR Metformin hydrochloride 500 MG Extended Release Oral Tablet"
        }
      ],
      "reason": "Diagnose_Diabetes",
      "direct_transition": "Bitherapy"
    },
    "Bitherapy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": ">=",
                "value": 3
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Medication",
                  "codes": [
                    {
                      "system": "RxNorm",
                      "code": "897122",
                      "display": "3 ML liraglutide 6 MG/ML Pen Injector"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Prescribe_Liraglutide"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": "<",
                "value": 3
              },
              {
                "condition_type": "Active Medication",
                "codes": [
                  {
                    "system": "RxNorm",
                    "code": "897122",
                    "display": "3 ML liraglutide 6 MG/ML Pen Injector"
                  }
                ]
              }
            ]
          },
          "transition": "End_Liraglutide"
        },
        {
          "transition": "Tritherapy"
        }
      ]
    },
    "Prescribe_Liraglutide": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "897122",
          "display": "3 ML liraglutide 6 MG/ML Pen Injector"
        }
      ],
      "reason": "Diagnose_Diabetes",
      "direct_transition": "Tritherapy"
    },
    "End_Liraglutide": {
      "type": "MedicationEnd",
      "codes": [
        {
          "system": "RxNorm",
          "code": "897122",
          "display": "3 ML liraglutide 6 MG/ML Pen Injector"
        }
      ],
      "direct_transition": "Tritherapy"
    },
    "Tritherapy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": ">=",
                "value": 4
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Medication",
                  "codes": [
                    {
                      "system": "RxNorm",
                      "code": "1373463",
                      "display": "canagliflozin 100 MG Oral Tablet"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Prescribe_Canagliflozin"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "diabetes_severity",
                "operator": "<",
                "value": 4
              },
              {
                "condition_type": "Active Medication",
                "codes": [
                  {
                    "system": "RxNorm",
                    "code": "1373463",
                    "display": "canagliflozin 100 MG Oral Tablet"
                  }
                ]
              }
            ]
          },
          "transition": "End_Canagliflozin"
        },
        {
          "transition": "Insulin"
        }
      ]
    },
    "Prescribe_Canagliflozin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1373463",
          "display": "canagliflozin 100 MG Oral Tablet"
        }
      ],
      "reason": "Diagnose_Diabetes",
      "direct_transition": "Insulin"
    },
    "End_Canagliflozin": {
      "type": "MedicationEnd",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1373463",
          "display": "canagliflozin 100 MG Oral Tablet"
        }
      ],
      "direct_transition": "Insulin"
    },
    "Insulin": {
      "type": "Simple",
      "remarks": [
        "around a third of patients with type 2 diabetes are on insulin ",
        "30.8% (17.8% only insulin and 13.0% insulin and other med)",
        "https://www.cdc.gov/diabetes/statistics/meduse/fig2.htm",
        "coincidentally around a third of patients have nephropathy",
        "for simplicity we'll make this a 1-1 relationship so that nephropathy --> insulin"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "127013003",
                "display": "Diabetic renal disease (disorder)"
              }
            ]
          },
          "transition": "Prescribe_Insulin"
        },
        {
          "transition": "End_Insulin"
        }
      ]
    },
    "Prescribe_Insulin": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "106892",
                "display": "insulin human, isophane 70 UNT/ML / Regular Insulin, Human 30 UNT/ML Injectable Suspension [Humulin]"
              }
            ]
          },
          "remarks": [
            "they have basal so stop it and change towards prandial"
          ],
          "transition": "End_Basal_Insulin_Towards_Prandial"
        },
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "865098",
                "display": "Insulin Lispro 100 UNT/ML Injectable Solution [Humalog]"
              }
            ]
          },
          "remarks": [
            "they have prandial so do nothing"
          ],
          "transition": "Check_Complications"
        },
        {
          "remarks": [
            "prescribe basal the first time around"
          ],
          "transition": "Prescribe_Basal_Insulin"
        }
      ]
    },
    "Prescribe_Basal_Insulin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "106892",
          "display": "insulin human, isophane 70 UNT/ML / Regular Insulin, Human 30 UNT/ML Injectable Suspension [Humulin]"
        }
      ],
      "reason": "Diagnose_Diabetes",
      "direct_transition": "Check_Complications"
    },
    "End_Basal_Insulin_Towards_Prandial": {
      "type": "MedicationEnd",
      "codes": [
        {
          "system": "RxNorm",
          "code": "106892",
          "display": "insulin human, isophane 70 UNT/ML / Regular Insulin, Human 30 UNT/ML Injectable Suspension [Humulin]"
        }
      ],
      "direct_transition": "Prescribe_Prandial_Insulin"
    },
    "Prescribe_Prandial_Insulin": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "865098",
          "display": "Insulin Lispro 100 UNT/ML Injectable Solution [Humalog]"
        }
      ],
      "reason": "Diagnose_Diabetes",
      "direct_transition": "Check_Complications"
    },
    "End_Insulin": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "106892",
                "display": "insulin human, isophane 70 UNT/ML / Regular Insulin, Human 30 UNT/ML Injectable Suspension [Humulin]"
              }
            ]
          },
          "transition": "End_Basal_Insulin"
        },
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "865098",
                "display": "Insulin Lispro 100 UNT/ML Injectable Solution [Humalog]"
              }
            ]
          },
          "transition": "End_Prandial_Insulin"
        },
        {
          "transition": "Check_Complications"
        }
      ]
    },
    "End_Basal_Insulin": {
      "type": "MedicationEnd",
      "codes": [
        {
          "system": "RxNorm",
          "code": "106892",
          "display": "insulin human, isophane 70 UNT/ML / Regular Insulin, Human 30 UNT/ML Injectable Suspension [Humulin]"
        }
      ],
      "direct_transition": "Check_Complications"
    },
    "End_Prandial_Insulin": {
      "type": "MedicationEnd",
      "codes": [
        {
          "system": "RxNorm",
          "code": "865098",
          "display": "Insulin Lispro 100 UNT/ML Injectable Solution [Humalog]"
        }
      ],
      "direct_transition": "Check_Complications"
    },
    "Check_Complications": {
      "type": "Simple",
      "direct_transition": "Check_Nephropathy"
    },
    "Check_Nephropathy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "nephropathy",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "127013003",
                      "display": "Diabetic renal disease (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Nephropathy"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "nephropathy",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "127013003",
                    "display": "Diabetic renal disease (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Nephropathy"
        },
        {
          "transition": "Check_Microalbuminuria"
        }
      ]
    },
    "Diagnose_Nephropathy": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "127013003",
          "display": "Diabetic renal disease (disorder)"
        }
      ],
      "direct_transition": "Check_Microalbuminuria"
    },
    "End_Nephropathy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "127013003",
          "display": "Diabetic renal disease (disorder)"
        }
      ],
      "direct_transition": "Check_Microalbuminuria"
    },
    "Check_Microalbuminuria": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "microalbuminuria",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "90781000119102",
                      "display": "Microalbuminuria due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Microalbuminuria"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "microalbuminuria",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "90781000119102",
                    "display": "Microalbuminuria due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Microalbuminuria"
        },
        {
          "transition": "Check_Proteinuria"
        }
      ]
    },
    "Diagnose_Microalbuminuria": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "90781000119102",
          "display": "Microalbuminuria due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Proteinuria"
    },
    "End_Microalbuminuria": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "90781000119102",
          "display": "Microalbuminuria due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Proteinuria"
    },
    "Check_Proteinuria": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "proteinuria",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "157141000119108",
                      "display": "Proteinuria due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Proteinuria"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "proteinuria",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "157141000119108",
                    "display": "Proteinuria due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Proteinuria"
        },
        {
          "transition": "Check_End_Stage_Renal_Disease"
        }
      ]
    },
    "Diagnose_Proteinuria": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "157141000119108",
          "display": "Proteinuria due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_End_Stage_Renal_Disease"
    },
    "End_Proteinuria": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "157141000119108",
          "display": "Proteinuria due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_End_Stage_Renal_Disease"
    },
    "Check_End_Stage_Renal_Disease": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "end_stage_renal_disease",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "46177005",
                      "display": "End stage renal disease (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_End_Stage_Renal_Disease"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "end_stage_renal_disease",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "46177005",
                    "display": "End stage renal disease (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_End_Stage_Renal_Disease"
        },
        {
          "transition": "Check_Retinopathy"
        }
      ]
    },
    "Diagnose_End_Stage_Renal_Disease": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46177005",
          "display": "End stage renal disease (disorder)"
        }
      ],
      "direct_transition": "Check_Retinopathy"
    },
    "End_End_Stage_Renal_Disease": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46177005",
          "display": "End stage renal disease (disorder)"
        }
      ],
      "direct_transition": "Check_Retinopathy"
    },
    "Check_Retinopathy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "retinopathy",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "422034002",
                      "display": "Diabetic retinopathy associated with type II diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Retinopathy"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "retinopathy",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "422034002",
                    "display": "Diabetic retinopathy associated with type II diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Retinopathy"
        },
        {
          "transition": "Check_Nonproliferative_Retinopathy"
        }
      ]
    },
    "Diagnose_Retinopathy": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "422034002",
          "display": "Diabetic retinopathy associated with type II diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Nonproliferative_Retinopathy"
    },
    "End_Retinopathy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "422034002",
          "display": "Diabetic retinopathy associated with type II diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Nonproliferative_Retinopathy"
    },
    "Check_Nonproliferative_Retinopathy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "nonproliferative_retinopathy",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "1551000119108",
                      "display": "Nonproliferative diabetic retinopathy due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Nonproliferative_Retinopathy"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "nonproliferative_retinopathy",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "1551000119108",
                    "display": "Nonproliferative diabetic retinopathy due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Nonproliferative_Retinopathy"
        },
        {
          "transition": "Check_Proliferative_Retinopathy"
        }
      ]
    },
    "Diagnose_Nonproliferative_Retinopathy": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1551000119108",
          "display": "Nonproliferative diabetic retinopathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Proliferative_Retinopathy"
    },
    "End_Nonproliferative_Retinopathy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1551000119108",
          "display": "Nonproliferative diabetic retinopathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Proliferative_Retinopathy"
    },
    "Check_Proliferative_Retinopathy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "proliferative_retinopathy",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "1501000119109",
                      "display": "Proliferative diabetic retinopathy due to type II diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Proliferative_Retinopathy"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "proliferative_retinopathy",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "1501000119109",
                    "display": "Proliferative diabetic retinopathy due to type II diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Proliferative_Retinopathy"
        },
        {
          "transition": "Check_Macular_Edema"
        }
      ]
    },
    "Diagnose_Proliferative_Retinopathy": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1501000119109",
          "display": "Proliferative diabetic retinopathy due to type II diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Macular_Edema"
    },
    "End_Proliferative_Retinopathy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "1501000119109",
          "display": "Proliferative diabetic retinopathy due to type II diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Macular_Edema"
    },
    "Check_Macular_Edema": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "macular_edema",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "97331000119101",
                      "display": "Macular edema and retinopathy due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Macular_Edema"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "macular_edema",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "97331000119101",
                    "display": "Macular edema and retinopathy due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Macular_Edema"
        },
        {
          "transition": "Check_Blindness"
        }
      ]
    },
    "Diagnose_Macular_Edema": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "97331000119101",
          "display": "Macular edema and retinopathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Blindness"
    },
    "End_Macular_Edema": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "97331000119101",
          "display": "Macular edema and retinopathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Blindness"
    },
    "Check_Blindness": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "blindness",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "60951000119105",
                      "display": "Blindness due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Blindness"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "blindness",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "60951000119105",
                    "display": "Blindness due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Blindness"
        },
        {
          "transition": "Check_Neuropathy"
        }
      ]
    },
    "Diagnose_Blindness": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "60951000119105",
          "display": "Blindness due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Neuropathy"
    },
    "End_Blindness": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "60951000119105",
          "display": "Blindness due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Check_Neuropathy"
    },
    "Check_Neuropathy": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "neuropathy",
                "operator": "is not nil"
              },
              {
                "condition_type": "Not",
                "condition": {
                  "condition_type": "Active Condition",
                  "codes": [
                    {
                      "system": "SNOMED-CT",
                      "code": "368581000119106",
                      "display": "Neuropathy due to type 2 diabetes mellitus (disorder)"
                    }
                  ]
                }
              }
            ]
          },
          "transition": "Diagnose_Neuropathy"
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "neuropathy",
                "operator": "is nil"
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "368581000119106",
                    "display": "Neuropathy due to type 2 diabetes mellitus (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "End_Neuropathy"
        },
        {
          "transition": "Consider_Procedures"
        }
      ]
    },
    "Diagnose_Neuropathy": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "368581000119106",
          "display": "Neuropathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Consider_Procedures"
    },
    "End_Neuropathy": {
      "type": "ConditionEnd",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "368581000119106",
          "display": "Neuropathy due to type 2 diabetes mellitus (disorder)"
        }
      ],
      "direct_transition": "Consider_Procedures"
    },
    "Consider_Procedures": {
      "type": "Simple",
      "direct_transition": "Potential_Dialysis"
    },
    "Potential_Dialysis": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "46177005",
                "display": "End stage renal disease (disorder)"
              }
            ]
          },
          "transition": "Dialysis"
        },
        {
          "transition": "Potential_Amputation"
        }
      ]
    },
    "Dialysis": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "265764009",
          "display": "Renal dialysis (procedure)"
        }
      ],
      "direct_transition": "Potential_Amputation",
      "duration": {
        "low": 3,
        "high": 4,
        "unit": "hours"
      }
    },
    "Potential_Amputation": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Amputation_Necessary",
            "within": {
              "quantity": 1,
              "unit": "years"
            }
          },
          "remarks": [
            "dialysis means this check is made every few days which can skew results.",
            "we only want to consider amputation once a year"
          ],
          "transition": "No_Amputation_Necessary"
        },
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "368581000119106",
                "display": "Neuropathy due to type 2 diabetes mellitus (disorder)"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.0025,
              "transition": "Amputation_Necessary"
            },
            {
              "distribution": 0.9975,
              "transition": "No_Amputation_Necessary"
            }
          ],
          "remarks": [
            "In 2010, about 73,000 non-traumatic lower-limb amputations were performed in adults aged 20 years or older with diagnosed diabetes.",
            "28.9 million adults had diagnosed diabetes. 73,000/ 28,900,000 = 0.0025 or 0.25% per year",
            "https://www.cdc.gov/diabetes/data/statistics/2014statisticsreport.html"
          ]
        },
        {
          "transition": "No_Amputation_Necessary"
        }
      ]
    },
    "Amputation_Necessary": {
      "type": "SetAttribute",
      "attribute": "diabetes_amputation_necessary",
      "value": true,
      "direct_transition": "Schedule_Followup"
    },
    "No_Amputation_Necessary": {
      "type": "SetAttribute",
      "attribute": "diabetes_amputation_necessary",
      "value": false,
      "direct_transition": "Schedule_Followup"
    },
    "Schedule_Followup": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetes_amputation_necessary",
            "operator": "==",
            "value": true
          },
          "transition": "Delay_Before_Amputation"
        },
        {
          "transition": "Living_With_Diabetes"
        }
      ]
    },
    "Delay_Before_Amputation": {
      "type": "Delay",
      "exact": {
        "quantity": 6,
        "unit": "weeks"
      },
      "direct_transition": "Amputation"
    },
    "Amputation": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "reason": "Diagnose_Neuropathy",
      "remarks": [
        "lower limb amputation occurs in 0.65% of the diabetic population",
        " with upper limb amputation occurring in an ever fewer 0.034%",
        "http://www.amputee-coalition.org/resources/massachusetts/",
        "== lower limb =~ 20x more likely than upper limb"
      ],
      "distributed_transition": [
        {
          "distribution": 0.2375,
          "transition": "Potential_Amputation_of_Left_Foot"
        },
        {
          "distribution": 0.2375,
          "transition": "Potential_Amputation_of_Left_Leg"
        },
        {
          "distribution": 0.2375,
          "transition": "Potential_Amputation_of_Right_Foot"
        },
        {
          "distribution": 0.2375,
          "transition": "Potential_Amputation_of_Right_Leg"
        },
        {
          "distribution": 0.0125,
          "transition": "Potential_Amputation_of_Left_Hand"
        },
        {
          "distribution": 0.0125,
          "transition": "Potential_Amputation_of_Left_Arm"
        },
        {
          "distribution": 0.0125,
          "transition": "Potential_Amputation_of_Right_Hand"
        },
        {
          "distribution": 0.0125,
          "transition": "Potential_Amputation_of_Right_Arm"
        }
      ]
    },
    "Potential_Amputation_of_Left_Foot": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Left_Foot"
              },
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Left_Leg"
              }
            ]
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Left_Foot"
        }
      ]
    },
    "Amputation_of_Left_Foot": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "180030006",
          "display": "Amputation of left foot"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Foot_Amputation"
    },
    "Potential_Amputation_of_Right_Foot": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Right_Foot"
              },
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Right_Leg"
              }
            ]
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Right_Foot"
        }
      ]
    },
    "Amputation_of_Right_Foot": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "180030006",
          "display": "Amputation of right foot"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Foot_Amputation"
    },
    "Potential_Amputation_of_Left_Leg": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Amputation_of_Left_Leg"
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Left_Leg"
        }
      ]
    },
    "Amputation_of_Left_Leg": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "79733001",
          "display": "Amputation of left leg"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Lower_Limb_Amputation"
    },
    "Potential_Amputation_of_Right_Leg": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Amputation_of_Right_Leg"
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Right_Leg"
        }
      ]
    },
    "Amputation_of_Right_Leg": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "79733001",
          "display": "Amputation of right leg"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Lower_Limb_Amputation"
    },
    "History_of_Lower_Limb_Amputation": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "161622006",
          "display": "History of lower limb amputation (situation)"
        }
      ],
      "direct_transition": "Recovery_After_Amputation"
    },
    "History_of_Foot_Amputation": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "429280009",
          "display": "History of amputation of foot (situation)"
        }
      ],
      "direct_transition": "Recovery_After_Amputation"
    },
    "Potential_Amputation_of_Left_Hand": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Left_Hand"
              },
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Left_Arm"
              }
            ]
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Left_Hand"
        }
      ]
    },
    "Amputation_of_Left_Hand": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46028000",
          "display": "Amputation of left hand"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Hand_Amputation"
    },
    "Potential_Amputation_of_Right_Hand": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Right_Hand"
              },
              {
                "condition_type": "PriorState",
                "name": "Amputation_of_Right_Arm"
              }
            ]
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Right_Hand"
        }
      ]
    },
    "Amputation_of_Right_Hand": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46028000",
          "display": "Amputation of right hand"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Hand_Amputation"
    },
    "Potential_Amputation_of_Right_Arm": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Amputation_of_Right_Arm"
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Right_Arm"
        }
      ]
    },
    "Amputation_of_Right_Arm": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "13995008",
          "display": "Amputation of right arm"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Upper_Limb_Amputation"
    },
    "Potential_Amputation_of_Left_Arm": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "Amputation_of_Left_Arm"
          },
          "transition": "End_Amputation_Encounter"
        },
        {
          "transition": "Amputation_of_Left_Arm"
        }
      ]
    },
    "Amputation_of_Left_Arm": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "13995008",
          "display": "Amputation of left arm"
        }
      ],
      "duration": {
        "low": 1,
        "high": 4,
        "unit": "hours"
      },
      "reason": "Diagnose_Neuropathy",
      "direct_transition": "History_of_Upper_Limb_Amputation"
    },
    "History_of_Upper_Limb_Amputation": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "161621004",
          "display": "History of upper limb amputation (situation)"
        }
      ],
      "direct_transition": "Recovery_After_Amputation"
    },
    "History_of_Hand_Amputation": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "698423002",
          "display": "History of disarticulation at wrist (situation)"
        }
      ],
      "direct_transition": "Recovery_After_Amputation"
    },
    "Recovery_After_Amputation": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "End_Amputation_Encounter"
    },
    "End_Amputation_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Living_With_Diabetes"
    },
    "Living_With_Diabetes": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "46177005",
                "display": "End stage renal disease (disorder)"
              }
            ]
          },
          "transition": "Delay_Before_Next_Dialysis_Encounter"
        },
        {
          "transition": "Followup_Encounter_After_Diagnosis"
        }
      ]
    },
    "Followup_Encounter_After_Diagnosis": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Record_HA1C"
    },
    "Delay_Before_Next_Dialysis_Encounter": {
      "type": "Delay",
      "exact": {
        "quantity": 3,
        "unit": "days"
      },
      "direct_transition": "Dialysis_Encounter"
    },
    "Dialysis_Encounter": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "reason": "Diagnose_End_Stage_Renal_Disease",
      "direct_transition": "Record_HA1C"
    },
    "Obesity": {
      "type": "ConditionOnset",
      "assign_to_attribute": "obesity",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 162864005,
          "display": "Body mass index 30+ - obesity (finding)"
        }
      ],
      "direct_transition": "Wellness_Encounter"
    },
    "Severe Obesity": {
      "type": "ConditionOnset",
      "assign_to_attribute": "obesity",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 408512008,
          "display": "Body mass index 40+ - severely obese (finding)"
        }
      ],
      "direct_transition": "Wellness_Encounter"
    },
    "Obese_Check": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Severe Obesity",
          "condition": {
            "condition_type": "Vital Sign",
            "vital_sign": "BMI",
            "operator": ">=",
            "value": 40
          }
        },
        {
          "transition": "Obesity",
          "condition": {
            "condition_type": "Vital Sign",
            "vital_sign": "BMI",
            "operator": ">=",
            "value": 30
          }
        },
        {
          "transition": "Wellness_Encounter"
        }
      ]
    },
    "Blood_Sugar_Check": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Hyperglycemia",
          "condition": {
            "condition_type": "Vital Sign",
            "vital_sign": "Glucose",
            "operator": ">=",
            "value": 130
          }
        },
        {
          "transition": "Triglyceride_Check"
        }
      ]
    },
    "Hyperglycemia": {
      "type": "ConditionOnset",
      "assign_to_attribute": "hyperglycemia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 80394007,
          "display": "Hyperglycemia (disorder)"
        }
      ],
      "direct_transition": "Triglyceride_Check"
    },
    "Triglyceride_Check": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Hypertriglyceridemia",
          "condition": {
            "condition_type": "Vital Sign",
            "vital_sign": "Triglycerides",
            "operator": ">=",
            "value": 150
          }
        },
        {
          "transition": "Metabolic_Check"
        }
      ]
    },
    "Hypertriglyceridemia": {
      "type": "ConditionOnset",
      "assign_to_attribute": "hypertriglyceridemia",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 302870006,
          "display": "Hypertriglyceridemia (disorder)"
        }
      ],
      "direct_transition": "Metabolic_Check"
    },
    "Metabolic_Check": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Metabolic_Syndrome",
          "condition": {
            "condition_type": "At Least",
            "minimum": 3,
            "conditions": [
              {
                "condition_type": "Attribute",
                "attribute": "obesity",
                "operator": "is not nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "hypertension",
                "operator": "is not nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "hyperglycemia",
                "operator": "is not nil"
              },
              {
                "condition_type": "Attribute",
                "attribute": "hypertriglyceridemia",
                "operator": "is not nil"
              },
              {
                "condition_type": "Vital Sign",
                "vital_sign": "HDL",
                "operator": "<",
                "value": 50
              }
            ]
          }
        },
        {
          "transition": "Diagnosis"
        }
      ]
    },
    "Metabolic_Syndrome": {
      "type": "ConditionOnset",
      "assign_to_attribute": "metabolic_syndrome",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 237602007,
          "display": "Metabolic syndrome X (disorder)"
        }
      ],
      "direct_transition": "Diagnosis"
    }
  }
}
,
"metabolic_syndrome_disease":{
  "name": "Metabolic Syndrome Disease Progression",
  "remarks": [],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Initial_Kidney_Health"
    },
    "Initial_Kidney_Health": {
      "type": "SetAttribute",
      "attribute": "diabetic_kidney_damage",
      "value": 0,
      "direct_transition": "Initial_Eye_Health"
    },
    "Initial_Eye_Health": {
      "type": "SetAttribute",
      "attribute": "diabetic_eye_damage",
      "value": 0,
      "direct_transition": "Initial_Nerve_Health"
    },
    "Initial_Nerve_Health": {
      "type": "SetAttribute",
      "attribute": "diabetic_nerve_damage",
      "value": 0,
      "direct_transition": "Age_Guard"
    },
    "Age_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Age",
        "operator": ">=",
        "quantity": 18,
        "unit": "years"
      },
      "direct_transition": "Chance_to_Onset_Hypertension"
    },
    "Chance_to_Onset_Hypertension": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.296,
          "transition": "Onset_Hypertension"
        },
        {
          "distribution": 0.704,
          "transition": "No_Hypertension"
        }
      ],
      "remarks": [
        "probability: 0.296 # (1.0==100%) http://www.cdc.gov/MMWr/preview/mmwrhtml/su6203a24.htm#Tab"
      ]
    },
    "Onset_Hypertension": {
      "type": "SetAttribute",
      "attribute": "hypertension",
      "value": true,
      "direct_transition": "Diabetes_Prevalence"
    },
    "No_Hypertension": {
      "type": "SetAttribute",
      "attribute": "hypertension",
      "value": false,
      "direct_transition": "Diabetes_Prevalence"
    },
    "Diabetes_Prevalence": {
      "type": "Simple",
      "remarks": [
        "diabetes prevalence %s based on the following",
        "http://www.mass.gov/eohhs/gov/departments/dph/programs/community-health/diabetes/facts/diabetes-statistics.html",
        "prediabetes prevalence is ~38 % overall and similar among most races but slightly lower among Native americans",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3830901/",
        "http://www.diabetes.org/living-with-diabetes/treatment-and-care/high-risk-populations/treatment-american-indians.html",
        "It is estimated that 27.8% of people with diabetes are undiagnosed",
        "https://www.cdc.gov/diabetes/pdfs/data/2014-report-estimates-of-diabetes-and-its-burden-in-the-united-states.pdf",
        "therefore the diabetes %s are all scaled up by a factor of 1.278, ",
        "so that the total % of people that eventually get diabetes is higher, but the current population with diabetes should be around 8.8%",
        "because there is a delay before diabetes onsets",
        "similarly the prediabetes #s are scaled up (but by a little less) so the current prediabetic % at any time is ~38%"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Race",
            "race": "White"
          },
          "distributions": [
            {
              "distribution": 0.083,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.065 * 1.278"
              ]
            },
            {
              "distribution": 0.45,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.38 * 1.2"
              ]
            },
            {
              "distribution": 0.467,
              "transition": "No_Diabetes"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Race",
            "race": "Hispanic"
          },
          "distributions": [
            {
              "distribution": 0.1815,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.142 * 1.278"
              ]
            },
            {
              "distribution": 0.45,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.38 * 1.2"
              ]
            },
            {
              "distribution": 0.3685,
              "transition": "No_Diabetes"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Race",
            "race": "Black"
          },
          "distributions": [
            {
              "distribution": 0.1636,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.128 * 1.278"
              ]
            },
            {
              "distribution": 0.45,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.38 * 1.2"
              ]
            },
            {
              "distribution": 0.3864,
              "transition": "No_Diabetes"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Race",
            "race": "Asian"
          },
          "distributions": [
            {
              "distribution": 0.2045,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.16 * 1.278"
              ]
            },
            {
              "distribution": 0.45,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.38 * 1.2"
              ]
            },
            {
              "distribution": 0.3455,
              "transition": "No_Diabetes"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Race",
            "race": "Native"
          },
          "distributions": [
            {
              "distribution": 0.1828,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.143 * 1.278"
              ]
            },
            {
              "distribution": 0.36,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.30 * 1.2"
              ]
            },
            {
              "distribution": 0.4572,
              "transition": "No_Diabetes"
            }
          ]
        },
        {
          "remarks": [
            "for Other races, just fall back to overall state %s"
          ],
          "distributions": [
            {
              "distribution": 0.1022,
              "transition": "Eventual_Diabetes",
              "remarks": [
                "0.08 * 1.278"
              ]
            },
            {
              "distribution": 0.45,
              "transition": "Eventual_Prediabetes",
              "remarks": [
                "0.38 * 1.2"
              ]
            },
            {
              "distribution": 0.4478,
              "transition": "No_Diabetes"
            }
          ]
        }
      ]
    },
    "Eventual_Prediabetes": {
      "type": "Delay",
      "range": {
        "low": 0,
        "high": 37,
        "unit": "years"
      },
      "remarks": [
        "we assume that diabetes and prediabetes generally onset between the ages of 18-55"
      ],
      "direct_transition": "Onset_Prediabetes"
    },
    "Eventual_Diabetes": {
      "type": "Delay",
      "range": {
        "low": 0,
        "high": 30,
        "unit": "years"
      },
      "remarks": [
        "we assume that diabetes and prediabetes generally onset between the ages of 18-55",
        "this tracks a little lower so that we can diagnose prediabetes early and then diabetes later",
        "there is little info on how many patients with prediabetes progress to diabetes",
        "so we assume that 38% of patients with diabetes had a prediabetes diagnosis"
      ],
      "distributed_transition": [
        {
          "distribution": 0.38,
          "transition": "Onset_Prediabetes_Towards_Diabetes"
        },
        {
          "distribution": 0.62,
          "transition": "Delay_before_Diabetes"
        }
      ]
    },
    "Onset_Prediabetes": {
      "type": "SetAttribute",
      "attribute": "prediabetes",
      "value": true,
      "direct_transition": "No_Diabetes"
    },
    "No_Diabetes": {
      "type": "Terminal"
    },
    "Onset_Prediabetes_Towards_Diabetes": {
      "type": "SetAttribute",
      "attribute": "prediabetes",
      "value": true,
      "direct_transition": "Delay_before_Diabetes"
    },
    "Delay_before_Diabetes": {
      "type": "Delay",
      "range": {
        "low": 0,
        "high": 7,
        "unit": "years"
      },
      "remarks": [
        "we assume that diabetes and prediabetes generally onset between the ages of 18-55",
        "at this point we are between 18-48, so we wait 0-7 years"
      ],
      "direct_transition": "Onset_Diabetes"
    },
    "Onset_Diabetes": {
      "type": "SetAttribute",
      "attribute": "diabetes",
      "value": true,
      "direct_transition": "Chance_to_Onset_Hypertension_at_Diabetes_Onset"
    },
    "Chance_to_Onset_Hypertension_at_Diabetes_Onset": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "hypertension",
            "operator": "==",
            "value": true
          },
          "transition": "Nephropathy_Progression"
        },
        {
          "distributions": [
            {
              "distribution": 0.423,
              "transition": "Onset_Hypertension_with_Diabetes"
            },
            {
              "distribution": 0.577,
              "transition": "No_Hypertension_With_Diabetes"
            }
          ],
          "remarks": [
            "59.4% of adults with diabetes have hypertension http://www.cdc.gov/MMWr/preview/mmwrhtml/su6203a24.htm#Tab",
            "but we already gave 29.6% of adults hypertension above, so we only give 42.3% hypertension here, not 59%",
            ".296 + .704(x) = .594,  x = .423"
          ]
        }
      ]
    },
    "Onset_Hypertension_with_Diabetes": {
      "type": "SetAttribute",
      "attribute": "hypertension",
      "value": true,
      "direct_transition": "Nephropathy_Progression"
    },
    "No_Hypertension_With_Diabetes": {
      "type": "SetAttribute",
      "attribute": "hypertension",
      "value": false,
      "direct_transition": "Nephropathy_Progression"
    },
    "Diabetes_Progression": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "direct_transition": "Nephropathy_Progression"
    },
    "Nephropathy_Progression": {
      "type": "Simple",
      "remarks": [
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4727808/",
        "There are 5 defined stages of kidney disease; stage 5 is End-stage where dialysis is necessary",
        "Prevalence of Nephropathy is 34.5% - http://link.springer.com/chapter/10.1007%2F978-1-4939-0793-9_2",
        "Prevalence of microalbuminuria is ~ 28.8% - https://www.ncbi.nlm.nih.gov/pubmed/11877563",
        "Prevalence of End stage renal disease is ~ .78% - ",
        "https://www.cdc.gov/diabetes/pdfs/data/2014-report-estimates-of-diabetes-and-its-burden-in-the-united-states.pdf"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_kidney_damage",
            "operator": "==",
            "value": 0
          },
          "remarks": [
            "we want ~ 35% of patients to hit mild kidney disease",
            "assuming roughly 20 yrs, 0.18% / month ~~> 35% over 20 yrs "
          ],
          "distributions": [
            {
              "distribution": 0.9982,
              "transition": "Retinopathy_Progression"
            },
            {
              "distribution": 0.0018,
              "transition": "Set_Mild_Kidney_Damage"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_kidney_damage",
            "operator": "==",
            "value": 1
          },
          "remarks": [
            "moderate damage == microalbuminuria",
            "we want ~ 28.8% of patients to hit moderate, with ~35% hitting mild",
            "so 28.8% / 35% == 82%.  1.35% / month ~~> 83% over 10 yrs",
            "10 yrs because kidney damage accelerates as is it increases -",
            "http://www.edren.org/pages/edreninfo/ckd-chronic-renal-failure-and-its-progression.php"
          ],
          "distributions": [
            {
              "distribution": 0.9865,
              "transition": "Set_Mild_Kidney_Damage"
            },
            {
              "distribution": 0.0135,
              "transition": "Set_Moderate_Kidney_Damage"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_kidney_damage",
            "operator": "==",
            "value": 2
          },
          "remarks": [
            "limited data on prevalence of proteinuria, so we assume roughly 14%",
            "(midway between the 28.8% of microalbuminuria and end-stage)",
            "so we want ~ 50% of patients with moderate damage to progress to severe"
          ],
          "distributions": [
            {
              "distribution": 0.994,
              "transition": "Set_Moderate_Kidney_Damage"
            },
            {
              "distribution": 0.006,
              "transition": "Set_Severe_Kidney_Damage"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_kidney_damage",
            "operator": "==",
            "value": 3
          },
          "remarks": [
            "Prevalence of end_stage_renal_disease is 0.78%",
            "where ~14% make it to severe, so we want 0.78/14 = ~ 6% of patients to progress to end-stage"
          ],
          "distributions": [
            {
              "distribution": 0.9994,
              "transition": "Set_Severe_Kidney_Damage"
            },
            {
              "distribution": 0.0006,
              "transition": "Set_End_Stage_Kidney_Damage"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_kidney_damage",
            "operator": "==",
            "value": 4
          },
          "transition": "Set_End_Stage_Kidney_Damage"
        }
      ]
    },
    "Set_Mild_Kidney_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_kidney_damage",
      "value": 1,
      "direct_transition": "Set_Nephropathy"
    },
    "Set_Nephropathy": {
      "type": "SetAttribute",
      "attribute": "nephropathy",
      "value": true,
      "direct_transition": "Mild_Kidney_Damage_Symptom_1"
    },
    "Mild_Kidney_Damage_Symptom_1": {
      "type": "Symptom",
      "symptom": "Hunger",
      "range": {
        "low": 1,
        "high": 100
      },
      "direct_transition": "Mild_Kidney_Damage_Symptom_2"
    },
    "Mild_Kidney_Damage_Symptom_2": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 1,
        "high": 100
      },
      "direct_transition": "Mild_Kidney_Damage_Symptom_3"
    },
    "Mild_Kidney_Damage_Symptom_3": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "range": {
        "low": 1,
        "high": 100
      },
      "direct_transition": "Mild_Kidney_Damage_Symptom_4"
    },
    "Mild_Kidney_Damage_Symptom_4": {
      "type": "Symptom",
      "symptom": "Thirst",
      "range": {
        "low": 1,
        "high": 100
      },
      "direct_transition": "Retinopathy_Progression"
    },
    "Set_Moderate_Kidney_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_kidney_damage",
      "value": 2,
      "direct_transition": "Set_Microalbuminuria"
    },
    "Set_Microalbuminuria": {
      "type": "SetAttribute",
      "attribute": "microalbuminuria",
      "value": true,
      "direct_transition": "Moderate_Kidney_Damage_Symptom_1"
    },
    "Moderate_Kidney_Damage_Symptom_1": {
      "type": "Symptom",
      "symptom": "Hunger",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Moderate_Kidney_Damage_Symptom_2"
    },
    "Moderate_Kidney_Damage_Symptom_2": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Moderate_Kidney_Damage_Symptom_3"
    },
    "Moderate_Kidney_Damage_Symptom_3": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Moderate_Kidney_Damage_Symptom_4"
    },
    "Moderate_Kidney_Damage_Symptom_4": {
      "type": "Symptom",
      "symptom": "Thirst",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Retinopathy_Progression"
    },
    "Set_Severe_Kidney_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_kidney_damage",
      "value": 3,
      "direct_transition": "Set_Proteinuria"
    },
    "Set_Proteinuria": {
      "type": "SetAttribute",
      "attribute": "proteinuria",
      "value": true,
      "direct_transition": "Severe_Kidney_Damage_Symptom_1"
    },
    "Severe_Kidney_Damage_Symptom_1": {
      "type": "Symptom",
      "symptom": "Hunger",
      "range": {
        "low": 40,
        "high": 100
      },
      "direct_transition": "Severe_Kidney_Damage_Symptom_2"
    },
    "Severe_Kidney_Damage_Symptom_2": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 40,
        "high": 100
      },
      "direct_transition": "Severe_Kidney_Damage_Symptom_3"
    },
    "Severe_Kidney_Damage_Symptom_3": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "range": {
        "low": 40,
        "high": 100
      },
      "direct_transition": "Severe_Kidney_Damage_Symptom_4"
    },
    "Severe_Kidney_Damage_Symptom_4": {
      "type": "Symptom",
      "symptom": "Thirst",
      "range": {
        "low": 40,
        "high": 100
      },
      "direct_transition": "Retinopathy_Progression"
    },
    "Set_End_Stage_Kidney_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_kidney_damage",
      "value": 4,
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "end_stage_renal_disease",
            "operator": "==",
            "value": true
          },
          "transition": "End_Stage_Kidney_Damage_Symptom_1"
        },
        {
          "transition": "Set_End_Stage_Renal_Disease"
        }
      ]
    },
    "Set_End_Stage_Renal_Disease": {
      "type": "SetAttribute",
      "attribute": "end_stage_renal_disease",
      "value": true,
      "direct_transition": "Expected_Lifespan_for_ESRD"
    },
    "Expected_Lifespan_for_ESRD": {
      "type": "Death",
      "range": {
        "low": 4,
        "high": 10,
        "unit": "years"
      },
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "46177005",
          "display": "End stage renal disease (disorder)"
        }
      ],
      "remarks": [
        "Life expectency depends on many factors, but for patients > 40 it's generally less than 10 years with dialysis",
        "http://link.springer.com/article/10.1007/s00467-016-3383-8 (Table 2"
      ],
      "direct_transition": "End_Stage_Kidney_Damage_Symptom_1"
    },
    "End_Stage_Kidney_Damage_Symptom_1": {
      "type": "Symptom",
      "symptom": "Hunger",
      "range": {
        "low": 50,
        "high": 100
      },
      "remarks": [
        "Without intervention, 20-40 percent of patients with type 2 diabetes/microalbuminuria, will evolve to macroalbuminuria.",
        "Shlipak, Michael. 'Clinical Evidence Handbook: Diabetic Nephropathy: Preventing Progression - American Family Physician'. www.aafp.org."
      ],
      "direct_transition": "End_Stage_Kidney_Damage_Symptom_2"
    },
    "End_Stage_Kidney_Damage_Symptom_2": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "End_Stage_Kidney_Damage_Symptom_3"
    },
    "End_Stage_Kidney_Damage_Symptom_3": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "End_Stage_Kidney_Damage_Symptom_4"
    },
    "End_Stage_Kidney_Damage_Symptom_4": {
      "type": "Symptom",
      "symptom": "Thirst",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Retinopathy_Progression"
    },
    "Retinopathy_Progression": {
      "type": "Simple",
      "remarks": [
        "In the USA, studies estimate that 28.5–40.3 % of patients with type 2 diabetes had DR, and 4.4–8.2 % of them had VTDR",
        "https://www.ncbi.nlm.nih.gov/pubmed/15078674",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4657234/",
        "https://eandv.biomedcentral.com/articles/10.1186/s40662-015-0026-2",
        "Currently the %s below do not take into consideration any medications the patient may be taking"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_eye_damage",
            "operator": "==",
            "value": 0
          },
          "distributions": [
            {
              "distribution": 0.998,
              "transition": "Neuropathy_Progression"
            },
            {
              "distribution": 0.002,
              "transition": "Set_Mild_Eye_Damage"
            }
          ],
          "remarks": [
            "Prevalence of DR = ~40%, we assume an estimated lifespan of ~20 yrs after diagnosis",
            ".2%/month  over 20 yrs, 1- (.998 ^ (12*20)) = .38 "
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_eye_damage",
            "operator": "==",
            "value": 1
          },
          "distributions": [
            {
              "distribution": 0.9915,
              "transition": "Set_Mild_Eye_Damage"
            },
            {
              "distribution": 0.0085,
              "transition": "Set_Moderate_Eye_Damage"
            }
          ],
          "remarks": [
            "Roughly 10% chance of DR progression per year == 0.85% chance per month",
            "https://eandv.biomedcentral.com/articles/10.1186/s40662-015-0026-2 (Table 3)"
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_eye_damage",
            "operator": "==",
            "value": 2
          },
          "distributions": [
            {
              "distribution": 0.9975,
              "transition": "Set_Moderate_Eye_Damage"
            },
            {
              "distribution": 0.0025,
              "transition": "Set_Severe_Eye_Damage"
            }
          ],
          "remarks": [
            "Roughly 3% progression from NPDR to PDR per year == .25% per month",
            "https://eandv.biomedcentral.com/articles/10.1186/s40662-015-0026-2 (Table 3 again)"
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_eye_damage",
            "operator": "==",
            "value": 3
          },
          "transition": "Set_Severe_Eye_Damage"
        }
      ]
    },
    "Set_Mild_Eye_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_eye_damage",
      "value": 1,
      "direct_transition": "Mild_Eye_Damage_Symptom"
    },
    "Mild_Eye_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Blurred Vision",
      "range": {
        "low": 1,
        "high": 60
      },
      "direct_transition": "Set_Retinopathy"
    },
    "Set_Retinopathy": {
      "type": "SetAttribute",
      "attribute": "retinopathy",
      "value": true,
      "direct_transition": "Neuropathy_Progression"
    },
    "Set_Moderate_Eye_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_eye_damage",
      "value": 2,
      "direct_transition": "Moderate_Eye_Damage_Symptom"
    },
    "Moderate_Eye_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Blurred Vision",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Set_Nonproliferative_Retinopathy"
    },
    "Set_Nonproliferative_Retinopathy": {
      "type": "SetAttribute",
      "attribute": "nonproliferative_retinopathy",
      "value": true,
      "direct_transition": "Chance_of_Macular_Edema"
    },
    "Set_Severe_Eye_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_eye_damage",
      "value": 3,
      "direct_transition": "Severe_Eye_Damage_Symptom"
    },
    "Severe_Eye_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Blurred Vision",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Set_Proliferative_Retinopathy"
    },
    "Set_Proliferative_Retinopathy": {
      "type": "SetAttribute",
      "attribute": "proliferative_retinopathy",
      "value": true,
      "direct_transition": "Chance_of_Macular_Edema"
    },
    "Chance_of_Macular_Edema": {
      "type": "Simple",
      "remarks": [
        "Incidence of DME is very low. Very rough estimate == ~1% per year.",
        "only around 20% of patients will hit this state, so we scale up to about 5% per year among those patients",
        "5% / yr = .4% / month",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4657234/table/Tab5/"
      ],
      "distributed_transition": [
        {
          "distribution": 0.004,
          "transition": "Set_Macular_Edema"
        },
        {
          "distribution": 0.996,
          "transition": "Chance_of_Blindness"
        }
      ]
    },
    "Set_Macular_Edema": {
      "type": "SetAttribute",
      "attribute": "macular_edema",
      "value": true,
      "direct_transition": "Chance_of_Blindness"
    },
    "Chance_of_Blindness": {
      "type": "Simple",
      "remarks": [
        "estimated prevalence of blindness is ~1% in MA; among diabetics we estimate 3%",
        "3% / 30 yrs = ~ 0.01 % / month",
        "http://www.idf.org/sites/default/files/IDF%2520Toolkit_Backgrounder_FINAL.pdf"
      ],
      "distributed_transition": [
        {
          "distribution": 0.0001,
          "transition": "Set_Blindness"
        },
        {
          "distribution": 0.9999,
          "transition": "Neuropathy_Progression"
        }
      ]
    },
    "Set_Blindness": {
      "type": "SetAttribute",
      "attribute": "blindness",
      "value": true,
      "direct_transition": "Neuropathy_Progression"
    },
    "Neuropathy_Progression": {
      "type": "Simple",
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_nerve_damage",
            "operator": "==",
            "value": 0
          },
          "distributions": [
            {
              "distribution": 0.9971,
              "transition": "Loop_back_to_Start"
            },
            {
              "distribution": 0.0029,
              "transition": "Set_Mild_Nerve_Damage"
            }
          ],
          "remarks": [
            "DPN affects as many as 1/2 of all patients with diabetes.",
            "50% over 20 years == ~ 0.29% per month"
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_nerve_damage",
            "operator": "==",
            "value": 1
          },
          "distributions": [
            {
              "distribution": 0.997,
              "transition": "Set_Mild_Nerve_Damage"
            },
            {
              "distribution": 0.003,
              "transition": "Set_Moderate_Nerve_Damage"
            }
          ],
          "remarks": [
            "at/beyond this point I can't find any well-defined #s on progression of diabetic neuropathy",
            "0.3% / month --> 3.5% / yr --> 66% over 30 yrs"
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_nerve_damage",
            "operator": "==",
            "value": 2
          },
          "distributions": [
            {
              "distribution": 0.997,
              "transition": "Set_Moderate_Nerve_Damage"
            },
            {
              "distribution": 0.003,
              "transition": "Set_Severe_Nerve_Damage"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "diabetic_nerve_damage",
            "operator": "==",
            "value": 3
          },
          "transition": "Set_Severe_Nerve_Damage"
        }
      ]
    },
    "Set_Mild_Nerve_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_nerve_damage",
      "value": 1,
      "direct_transition": "Set_Neuropathy"
    },
    "Set_Neuropathy": {
      "type": "SetAttribute",
      "attribute": "neuropathy",
      "value": true,
      "direct_transition": "Mild_Nerve_Damage_Symptom"
    },
    "Mild_Nerve_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Tingling in Hands and Feet",
      "range": {
        "low": 1,
        "high": 80
      },
      "direct_transition": "Loop_back_to_Start"
    },
    "Set_Moderate_Nerve_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_nerve_damage",
      "value": 2,
      "direct_transition": "Moderate_Nerve_Damage_Symptom"
    },
    "Moderate_Nerve_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Tingling in Hands and Feet",
      "range": {
        "low": 20,
        "high": 100
      },
      "direct_transition": "Loop_back_to_Start"
    },
    "Set_Severe_Nerve_Damage": {
      "type": "SetAttribute",
      "attribute": "diabetic_nerve_damage",
      "value": 3,
      "direct_transition": "Severe_Nerve_Damage_Symptom"
    },
    "Severe_Nerve_Damage_Symptom": {
      "type": "Symptom",
      "symptom": "Tingling in Hands and Feet",
      "range": {
        "low": 50,
        "high": 100
      },
      "direct_transition": "Loop_back_to_Start"
    },
    "Loop_back_to_Start": {
      "type": "Simple",
      "direct_transition": "Diabetes_Progression"
    }
  }
}
,
"opioid_addiction":{
  "name": "Opioid Addiction",
  "remarks": [
    "Opioid addiction currently affects about 0.7% of the American population, or about 2.2M people. ",
    "Since the 1990's prescription rates for opioids have increased exponentially. Today, doctors write ",
    "between 50 and 150 opioid prescriptions per 100 people. see: ",
    "http://www.cdc.gov/drugoverdose/data/prescribing.html",
    "Currently the injuries module prescribed opioids at a rate of 25 - 30 per 100 people, but that's ",
    "over a whole lifetime. 0-2 prescriptions are written for opioids for each patient after 1990, ",
    "or about 1 / 25 = 0.04 per year. This is small compared to the total opioid prescriptions written ",
    "each year. This module therefore picks up most of the remaining prescriptions, then evaluates all ",
    "addiction rates using a modified model adapted from Project SAMMI: ",
    "http://projectsammi.github.io/",
    "Prior to 1990 we don't model opioid addiction - prescription rates were far lower and the ",
    "'opioid crisis' of today is seen as beginning in the 90's and 00's."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Guard"
    },
    "Guard": {
      "type": "Guard",
      "remarks": [
        "Data on specific ages is limited but generally below age 15 no source indicates a statistically ",
        "significant % of opioid addiction."
      ],
      "allow": {
        "condition_type": "And",
        "conditions": [
          {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 14,
            "unit": "years"
          },
          {
            "condition_type": "Date",
            "operator": ">=",
            "year": 1990
          }
        ]
      },
      "direct_transition": "General_Population"
    },
    "General_Population": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "remarks": [
        "Project SAMMI originally used a 1-day timestep and modeled opioid addiction over the course of ",
        "one year. Our model runs for much longer - several decades, and we use a 1 month timestep. ",
        "I reduced the incidence of new prescriptions by a factor of 4, and reduced misuse by a factor of 10. ",
        "We need to generate fewer prescriptions since the injuries module regularly prescribes opioids for ",
        "some injuries."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "opioid_prescription",
            "operator": "is not nil",
            "remarks": [
              "This catches the opioids prescribed by the injuries module."
            ]
          },
          "distributions": [
            {
              "distribution": 1,
              "transition": "Directed_Use"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "High"
          },
          "distributions": [
            {
              "distribution": 0.0001,
              "transition": "Enter_Directed_Use"
            },
            {
              "distribution": 0.000003,
              "transition": "Misuse"
            },
            {
              "distribution": 0.999897,
              "transition": "General_Population"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "Middle"
          },
          "distributions": [
            {
              "distribution": 0.0001,
              "transition": "Enter_Directed_Use"
            },
            {
              "distribution": 0.000005,
              "transition": "Misuse"
            },
            {
              "distribution": 0.999895,
              "transition": "General_Population"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Socioeconomic Status",
            "category": "Low"
          },
          "distributions": [
            {
              "distribution": 0.0001,
              "transition": "Enter_Directed_Use"
            },
            {
              "distribution": 0.000008,
              "transition": "Misuse"
            },
            {
              "distribution": 0.999892,
              "transition": "General_Population"
            }
          ]
        }
      ]
    },
    "Enter_Directed_Use": {
      "type": "Simple",
      "remarks": [
        "provide a few different ways that people are prescribed opioids"
      ],
      "distributed_transition": [
        {
          "distribution": 0.333,
          "transition": "Enter_Directed_Use_Condition1"
        },
        {
          "distribution": 0.333,
          "transition": "Enter_Directed_Use_Condition2"
        },
        {
          "distribution": 0.334,
          "transition": "Enter_Directed_Use_Condition3"
        }
      ]
    },
    "Enter_Directed_Use_Condition1": {
      "type": "ConditionOnset",
      "target_encounter": "Enter_Directed_Use_Encounter1",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "196416002",
          "display": "Impacted molars"
        }
      ],
      "direct_transition": "Enter_Directed_Use_Encounter1"
    },
    "Enter_Directed_Use_Encounter1": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Enter_Directed_Use_Condition1",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183452005",
          "display": "Encounter Inpatient"
        }
      ],
      "direct_transition": "Enter_Directed_Use_Procedure1"
    },
    "Enter_Directed_Use_Procedure1": {
      "type": "Procedure",
      "target_encounter": "Enter_Directed_Use_Encounter1",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "65546002",
          "display": "Extraction of wisdom tooth"
        }
      ],
      "direct_transition": "Directed_Use_Prescription1"
    },
    "Directed_Use_Prescription1": {
      "type": "MedicationOrder",
      "target_encounter": "Enter_Directed_Use_Encounter1",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1310197",
          "display": "Acetaminophen 300 MG / HYDROcodone Bitartrate 5 MG [Vicodin]"
        }
      ],
      "direct_transition": "End_Directed_Use_Encounter"
    },
    "Enter_Directed_Use_Condition2": {
      "type": "ConditionOnset",
      "target_encounter": "Enter_Directed_Use_Encounter2",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "82423001",
          "display": "Chronic pain"
        }
      ],
      "direct_transition": "Enter_Directed_Use_Encounter2"
    },
    "Enter_Directed_Use_Encounter2": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Enter_Directed_Use_Condition2",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183452005",
          "display": "Encounter Inpatient"
        }
      ],
      "direct_transition": "Directed_Use_Prescription2"
    },
    "Directed_Use_Prescription2": {
      "type": "MedicationOrder",
      "target_encounter": "Enter_Directed_Use_Encounter2",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049544",
          "display": "oxyCODONE Hydrochloride 15 MG [OxyCONTIN]"
        }
      ],
      "direct_transition": "End_Directed_Use_Encounter"
    },
    "Enter_Directed_Use_Condition3": {
      "type": "ConditionOnset",
      "target_encounter": "Enter_Directed_Use_Encounter3",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "124171000119105",
          "display": "Chronic intractable migraine without aura"
        }
      ],
      "direct_transition": "Enter_Directed_Use_Encounter3"
    },
    "Enter_Directed_Use_Encounter3": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Enter_Directed_Use_Condition3",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 183452005,
          "display": "Encounter Inpatient"
        }
      ],
      "direct_transition": "Directed_Use_Prescription3"
    },
    "Directed_Use_Prescription3": {
      "type": "MedicationOrder",
      "target_encounter": "Enter_Directed_Use_Encounter3",
      "assign_to_attribute": "opioid_prescription",
      "codes": [
        {
          "system": "RxNorm",
          "code": "1049639",
          "display": "Acetaminophen 325 MG / oxyCODONE Hydrochloride 5 MG [Percocet]"
        }
      ],
      "direct_transition": "End_Directed_Use_Encounter"
    },
    "End_Directed_Use_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Directed_Use"
    },
    "Directed_Use": {
      "type": "Delay",
      "remarks": [
        "Project SAMMI modeled addiction rates on a per-day basis. We model ours per-week. The ",
        "formula used for conversion: ",
        "weekly_incidence = 1 - (1 - daily_incidence)^7 "
      ],
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.2381,
          "remarks": [
            "0.03810 return to general population each day, so that's 1 - (1 - 0.0381)^7, or 23.81%/wk"
          ],
          "transition": "End_Prescription_Towards_Gen_Pop"
        },
        {
          "distribution": 0.00028,
          "remarks": [
            "0.004%/day = 0.000280/wk"
          ],
          "transition": "Directed_Use_Overdose"
        },
        {
          "distribution": 0.0215,
          "remarks": [
            "0.95% transition to misuse each day, so that's 1 - (1 - 0.0095)^7, or 6.46%/wk. However, ",
            "this incidence of patients misusing opioid prescriptions came from a particularly opioid- ",
            "heavy city: Worcester, MA. Reducing this incidence by a factor of 3."
          ],
          "transition": "End_Prescription_Towards_Misuse"
        },
        {
          "distribution": 0.74037,
          "transition": "Directed_Use"
        }
      ]
    },
    "End_Prescription_Towards_Gen_Pop": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "opioid_prescription",
      "direct_transition": "Reset_Opioid_var_Towards_Gen_Pop"
    },
    "Reset_Opioid_var_Towards_Gen_Pop": {
      "type": "SetAttribute",
      "attribute": "opioid_prescription",
      "remarks": [
        "no value here means the variable is reset to nil"
      ],
      "direct_transition": "General_Population"
    },
    "End_Prescription_Towards_Misuse": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "opioid_prescription",
      "remarks": [
        "Note that the variable is not reset on this sequence, because we still want to know which medication they were on"
      ],
      "direct_transition": "Misuse"
    },
    "Misuse": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.06793,
          "remarks": [
            "0.01 --> 0.06793"
          ],
          "transition": "Enter_Directed_Use"
        },
        {
          "distribution": 0.1131,
          "remarks": [
            "0.017 --> 0.1131"
          ],
          "transition": "Reset_Opioid_var_Towards_Gen_Pop"
        },
        {
          "distribution": 0.005238,
          "remarks": [
            "0.00075 --> 0.005238"
          ],
          "transition": "Misuse_Overdose"
        },
        {
          "distribution": 0.13187,
          "remarks": [
            "0.02 --> 0.13187"
          ],
          "transition": "Active_Addiction"
        },
        {
          "distribution": 0.681862,
          "transition": "Misuse"
        }
      ]
    },
    "Opioid_Addiction_Symptom1": {
      "type": "Symptom",
      "symptom": "Anxiety",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "Opioid_Addiction_Symptom2"
    },
    "Opioid_Addiction_Symptom2": {
      "type": "Symptom",
      "symptom": "Confusion",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Opioid_Addiction_Symptom3"
    },
    "Opioid_Addiction_Symptom3": {
      "type": "Symptom",
      "symptom": "Cognitive Difficulties",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Opioid_Addiction_Symptom4"
    },
    "Opioid_Addiction_Symptom4": {
      "type": "Symptom",
      "symptom": "Nausea/Vomiting",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Opioid_Addiction_Symptom5"
    },
    "Opioid_Addiction_Symptom5": {
      "type": "Symptom",
      "symptom": "Shortness Constipation Breath",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Opioid_Addiction_Symptom6"
    },
    "Opioid_Addiction_Symptom6": {
      "type": "Symptom",
      "symptom": "Pain Sensitivity",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Opioid_Addiction_Symptom7"
    },
    "Opioid_Addiction_Symptom7": {
      "type": "Symptom",
      "symptom": "Reduced Sex Drive",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Opioid_Addiction_Symptom8"
    },
    "Opioid_Addiction_Symptom8": {
      "type": "Symptom",
      "symptom": "Slurred Speech",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "Opioid_Addiction_Symptom9"
    },
    "Opioid_Addiction_Symptom9": {
      "type": "Symptom",
      "symptom": "Shallow Breathing",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "Opioid_Addiction_Symptom10"
    },
    "Opioid_Addiction_Symptom10": {
      "type": "Symptom",
      "symptom": "Mood Swing",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Active_Addiction"
    },
    "Active_Addiction": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.04125,
          "remarks": [
            "0.006 --> 0.04125"
          ],
          "transition": "Detoxification"
        },
        {
          "distribution": 0.01045,
          "remarks": [
            "0.00150 --> 0.01045"
          ],
          "transition": "Addiction_Overdose"
        },
        {
          "distribution": 0.9483,
          "transition": "Active_Addiction"
        }
      ]
    },
    "Detoxification": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "remarks": [
        "Changed the time scale but not the percentages. These are timestep independent."
      ],
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "Detoxification"
        },
        {
          "distribution": 0.10375,
          "transition": "Active_Addiction"
        },
        {
          "distribution": 0.0425,
          "transition": "Enter_Addiction_Treatment"
        },
        {
          "distribution": 0.10375,
          "transition": "Recovery_Management"
        }
      ]
    },
    "Enter_Addiction_Treatment": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "56876005",
          "display": "Drug rehabilitation and detoxification"
        }
      ],
      "direct_transition": "End_Addiction_Treatment_Encounter"
    },
    "End_Addiction_Treatment_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Addiction_Treatment"
    },
    "Addiction_Treatment": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.02,
          "transition": "Active_Addiction"
        },
        {
          "distribution": 0.94865,
          "transition": "Addiction_Treatment"
        },
        {
          "distribution": 0.03135,
          "transition": "Recovery_Management"
        }
      ]
    },
    "Recovery_Management": {
      "type": "Encounter",
      "encounter_class": "outpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "266707007",
          "display": "Drug addiction therapy"
        }
      ],
      "direct_transition": "End_Recovery_Management_Encounter"
    },
    "End_Recovery_Management_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Recovery_Management_Delay"
    },
    "Recovery_Management_Delay": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "distributed_transition": [
        {
          "distribution": 0.2603,
          "transition": "Active_Addiction"
        },
        {
          "distribution": 0.7397,
          "transition": "Recovery_Management",
          "remarks": [
            "Translated from SAMMI's 1-day version of 99% --> 30-days = 74%"
          ]
        }
      ]
    },
    "Directed_Use_Overdose": {
      "type": "ConditionOnset",
      "target_encounter": "Directed_Use_Overdose_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "55680006",
          "display": "Drug overdose"
        }
      ],
      "direct_transition": "Directed_Use_Overdose_Encounter"
    },
    "Directed_Use_Overdose_Encounter": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Directed_Use_Overdose",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.98747,
          "transition": "End_Directed_Use_Overdose_Encounter"
        },
        {
          "distribution": 0.01253,
          "transition": "Death"
        }
      ]
    },
    "End_Directed_Use_Overdose_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Directed_Use"
    },
    "Misuse_Overdose": {
      "type": "ConditionOnset",
      "target_encounter": "Misuse_Overdose_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "55680006",
          "display": "Drug overdose"
        }
      ],
      "direct_transition": "Misuse_Overdose_Encounter"
    },
    "Misuse_Overdose_Encounter": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Misuse_Overdose",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.98747,
          "transition": "End_Misuse_Overdose_Encounter"
        },
        {
          "distribution": 0.01253,
          "transition": "Death"
        }
      ]
    },
    "End_Misuse_Overdose_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Misuse"
    },
    "Addiction_Overdose": {
      "type": "ConditionOnset",
      "target_encounter": "Addiction_Overdose_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "55680006",
          "display": "Drug overdose"
        }
      ],
      "direct_transition": "Addiction_Overdose_Encounter"
    },
    "Addiction_Overdose_Encounter": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Addiction_Overdose",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency Room Admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.98747,
          "transition": "Addiction_CarePlan_Selector"
        },
        {
          "distribution": 0.01253,
          "transition": "Death"
        }
      ]
    },
    "Addiction_CarePlan_Selector": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "opioid_addiction_careplan",
            "operator": "is nil"
          },
          "transition": "Opioid_Addiction_CarePlan"
        },
        {
          "transition": "End_Addiction_Overdose_Encounter"
        }
      ]
    },
    "Opioid_Addiction_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Addiction_Overdose_Encounter",
      "assign_to_attribute": "opioid_addiction_careplan",
      "reason": "Addiction_Overdose",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "266707007",
          "display": "Drug addiction therapy"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "60112009",
          "display": "Drug addiction counseling"
        },
        {
          "system": "SNOMED-CT",
          "code": "61480009",
          "display": "Drug detoxification"
        }
      ],
      "direct_transition": "End_Addiction_Overdose_Encounter"
    },
    "End_Addiction_Overdose_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Detoxification"
    },
    "Death": {
      "type": "Death",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "55680006",
          "display": "Drug overdose"
        }
      ],
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"osteoarthritis":{
  "name": "Osteoarthritis",
  "remarks": [
    "Osteoarthritis (OA) is a breakdown of cartilage in the joints. It is a chronic condition ",
    "that only worsens with time. OA is more likely in females (2:1) and the risk of OA increases ",
    "with age. OA also accounts for most of the total joint replacements (knees and hips) in the U.S.",
    "Joint replacements are handled by the total_joint_replacement module and triggered by the ",
    "'joint_replacement' attribute.",
    "Information on treatment, prevalence, and incidence of specific arthritis types from the CDC: ",
    "http://www.cdc.gov/arthritis/basics/types.html",
    "Overall prevalence of arthritis: ",
    "http://www.cdc.gov/arthritis/data_statistics/national-statistics.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        " | Arthritis Type | Prevalence | Ratio F:M | ",
        " ------------------------------------------- ",
        " | Osteoarthritis |   0.34000  |    2:1    | ",
        " ------------------------------------------- "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.113,
              "transition": "Delay_Until_Symptoms"
            },
            {
              "distribution": 0.887,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.2267,
              "transition": "Delay_Until_Symptoms"
            },
            {
              "distribution": 0.7733,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Delay_Until_Symptoms": {
      "type": "Delay",
      "range": {
        "low": 10,
        "high": 40,
        "unit": "years"
      },
      "direct_transition": "OA_Symptom1"
    },
    "OA_Symptom1": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "OA_Symptom2"
    },
    "OA_Symptom2": {
      "type": "Symptom",
      "symptom": "Joint Stiffness",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Delay_Until_Arthritis"
    },
    "Delay_Until_Arthritis": {
      "type": "Delay",
      "range": {
        "low": 15,
        "high": 40,
        "unit": "years"
      },
      "direct_transition": "OA_Symptom1_Advances"
    },
    "OA_Symptom1_Advances": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "OA_Symptom2_Advances"
    },
    "OA_Symptom2_Advances": {
      "type": "Symptom",
      "symptom": "Joint Stiffness",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Osteoarthritis"
    },
    "Osteoarthritis": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " OSTEOARTHRITIS                                                       ",
        "======================================================================",
        "Source: http://www.cdc.gov/arthritis/basics/osteoarthritis.htm"
      ],
      "distributed_transition": [
        {
          "distribution": 0.234,
          "transition": "OA_Of_The_Hand"
        },
        {
          "distribution": 0.561,
          "transition": "OA_Of_The_Knee"
        },
        {
          "distribution": 0.205,
          "transition": "OA_Of_The_Hip"
        }
      ]
    },
    "OA_Of_The_Hand": {
      "type": "ConditionOnset",
      "target_encounter": "OA_Diagnosis",
      "assign_to_attribute": "osteoarthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "201834006",
          "display": "Localized, primary osteoarthritis of the hand"
        }
      ],
      "direct_transition": "OA_Diagnosis"
    },
    "OA_Of_The_Knee": {
      "type": "ConditionOnset",
      "target_encounter": "OA_Diagnosis",
      "assign_to_attribute": "osteoarthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "239873007",
          "display": "Osteoarthritis of knee"
        }
      ],
      "direct_transition": "OA_Diagnosis"
    },
    "OA_Of_The_Hip": {
      "type": "ConditionOnset",
      "target_encounter": "OA_Diagnosis",
      "assign_to_attribute": "osteoarthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "239872002",
          "display": "Osteoarthritis of hip"
        }
      ],
      "direct_transition": "OA_Diagnosis"
    },
    "OA_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "osteoarthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "OA_CarePlan"
    },
    "OA_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "OA_Diagnosis",
      "assign_to_attribute": "arthritis_careplan",
      "reason": "osteoarthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Joint mobility exercises"
        },
        {
          "system": "SNOMED-CT",
          "code": "266694003",
          "display": "Heat therapy"
        }
      ],
      "direct_transition": "OA_Pain_Medication"
    },
    "OA_Pain_Medication": {
      "type": "MedicationOrder",
      "target_encounter": "OA_Diagnosis",
      "reason": "osteoarthritis",
      "codes": [
        {
          "system": "RxNorm",
          "code": "849727",
          "display": "Naproxen sodium 220 MG [Aleve]"
        }
      ],
      "remarks": [
        "For knees or hips we can consider joint replacement surgery. However this is not a ",
        "treatment option for arthritis of the hand. The total_joint_replacement module will ",
        "not process a joint replacement surgery until the patient is over 50 years of age.",
        "Source for hip and knee replacement prevalence: ",
        "http://www.cdc.gov/arthritis/data_statistics/arthritis-related-stats.htm ",
        "Estimated prevalence of Osteoarthritis is 34%. ",
        "Estimated prevalence of hip replacements is 0.165% (80% are for OA => 0.132%).",
        "Therefore (0.00132 / (0.34 * 0.205)) => 0.0189 of all hip OA leads to hip replacement.",
        "Estimated prevalence of knee replacements is 0.243% (95% are for OA => 0.231%).",
        "Therefore (0.00231 / (0.34 * 0.561)) => 0.0121 of all knee OA leads to knee replacement."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "OA_Of_The_Knee"
          },
          "distributions": [
            {
              "distribution": 0.0121,
              "transition": "Setup_Knee_Replacement"
            },
            {
              "distribution": 0.9879,
              "transition": "End_Encounter"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "PriorState",
            "name": "OA_Of_The_Hip"
          },
          "distributions": [
            {
              "distribution": 0.0189,
              "transition": "Setup_Hip_Replacement"
            },
            {
              "distribution": 0.9811,
              "transition": "End_Encounter"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 1,
              "transition": "End_Encounter"
            }
          ]
        }
      ]
    },
    "Setup_Knee_Replacement": {
      "type": "SetAttribute",
      "attribute": "joint_replacement",
      "value": "knee",
      "direct_transition": "End_Encounter"
    },
    "Setup_Hip_Replacement": {
      "type": "SetAttribute",
      "attribute": "joint_replacement",
      "value": "hip",
      "direct_transition": "End_Encounter"
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "OA_Symptom1_Ends"
    },
    "OA_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "OA_Symptom2_Ends"
    },
    "OA_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Joint Stiffness",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"osteoporosis":{
  "name": "Osteoporosis",
  "remarks": [
    "This very basic module uses pure prevalence stats to just set osteoporosis on patients based on age/sex",
    "https://www.iofbonehealth.org/facts-statistics",
    "In reality osteoporosis is progressive and gets worse over time, it doesn't suddenly onset one day"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Male"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Female"
        }
      ]
    },
    "Female": {
      "type": "Simple",
      "remarks": [
        "Osteoporosis is estimated to affect 200 million women worldwide",
        "approximately one-tenth of women aged 60, one-fifth of women aged 70, ",
        "two-fifths of women aged 80 and two-thirds of women aged 90",
        "https://www.iofbonehealth.org/facts-statistics"
      ],
      "distributed_transition": [
        {
          "distribution": 0.1,
          "transition": "Onset_Age_60"
        },
        {
          "distribution": 0.1,
          "transition": "Onset_Age_70",
          "remarks": "== 1/5 minus the 1/10 from the previous entry"
        },
        {
          "distribution": 0.2,
          "transition": "Onset_Age_80",
          "remarks": "== 2/5 minus the 1/5 from the previous entry"
        },
        {
          "distribution": 0.2667,
          "transition": "Onset_Age_90",
          "remarks": "== 2/3 minus the 2/5 from the previous entry"
        },
        {
          "distribution": 0.3333,
          "transition": "Terminal"
        }
      ]
    },
    "Male": {
      "type": "Simple",
      "remarks": [
        "statistics for men are not as easy to find as for women",
        "Worldwide, 1 in 3 women over age 50 will experience osteoporotic fractures, as will 1 in 5 men aged over 50",
        "so for this model we scale the %s for women by .6 (.333 * .6 = .2)"
      ],
      "distributed_transition": [
        {
          "distribution": 0.06,
          "transition": "Onset_Age_60"
        },
        {
          "distribution": 0.06,
          "transition": "Onset_Age_70"
        },
        {
          "distribution": 0.12,
          "transition": "Onset_Age_80"
        },
        {
          "distribution": 0.16,
          "transition": "Onset_Age_90"
        },
        {
          "distribution": 0.44,
          "transition": "Terminal"
        }
      ]
    },
    "Onset_Age_60": {
      "type": "Delay",
      "exact": {
        "quantity": 60,
        "unit": "years"
      },
      "direct_transition": "Onset_Osteoporosis"
    },
    "Onset_Age_70": {
      "type": "Delay",
      "exact": {
        "quantity": 70,
        "unit": "years"
      },
      "direct_transition": "Onset_Osteoporosis"
    },
    "Onset_Age_80": {
      "type": "Delay",
      "exact": {
        "quantity": 80,
        "unit": "years"
      },
      "direct_transition": "Onset_Osteoporosis"
    },
    "Onset_Age_90": {
      "type": "Delay",
      "exact": {
        "quantity": 90,
        "unit": "years"
      },
      "direct_transition": "Onset_Osteoporosis"
    },
    "Onset_Osteoporosis": {
      "type": "SetAttribute",
      "attribute": "osteoporosis",
      "value": true,
      "direct_transition": "Osteoporosis_Symptom1"
    },
    "Osteoporosis_Symptom1": {
      "type": "Symptom",
      "symptom": "Decrease in Height",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Wellness_Encounter"
    },
    "Wellness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "64859006",
                "display": "Osteoporosis (disorder)"
              }
            ]
          },
          "transition": "Consider_Medication"
        },
        {
          "transition": "Osteoporosis_Workup"
        }
      ]
    },
    "Osteoporosis_Workup": {
      "type": "Procedure",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "312681000",
          "display": "Bone density scan (procedure)"
        }
      ],
      "direct_transition": "Bone_Density"
    },
    "Bone_Density": {
      "type": "Observation",
      "category": "procedure",
      "codes": [
        {
          "system": "LOINC",
          "code": "38265-5",
          "display": "DXA [T-score] Bone density"
        }
      ],
      "range": {
        "low": -3.8,
        "high": -2.5
      },
      "unit": "{T-score}",
      "remarks": [
        "WHO definition of osteoporosis is a T-score < 2.5",
        "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1963365/"
      ],
      "direct_transition": "Diagnose_Osteoporosis"
    },
    "Diagnose_Osteoporosis": {
      "type": "ConditionOnset",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "64859006",
          "display": "Osteoporosis (disorder)"
        }
      ],
      "direct_transition": "Consider_Medication"
    },
    "Consider_Medication": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">=",
            "year": 1995
          },
          "transition": "Prescribe_Bisphosphate"
        },
        {
          "transition": "Terminal",
          "remarks": "bisphosphates are the best medicine for osteoporosis, but not available until ~1995"
        }
      ]
    },
    "Prescribe_Bisphosphate": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": "904420",
          "display": "Alendronic acid 10 MG [Fosamax]"
        }
      ],
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"pregnancy":{
  "name": "Pregnancy",
  "remarks": [
    "Whenever a female becomes pregnant, the 'pregnant' attribute is set to true ",
    "by the Female Reproduction module. The likelihood of becoming pregnant is ",
    "determined by a wide variety of factors including age, sexual activity, ",
    "and contraceptive use.",
    "Some notable complications NOT modeled in this module:",
    "1. Maternal death (very low incidence in developed countries)",
    "2. Gestational diabetes (because of the complex interplay with the diabetes module)",
    "3. Tobacco, drug, or alcohol use during pregnancy"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Initially_Not_Pregnant"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Initially_Not_Pregnant": {
      "type": "SetAttribute",
      "attribute": "pregnant",
      "value": false,
      "direct_transition": "Initially_No_Children"
    },
    "Initially_No_Children": {
      "type": "SetAttribute",
      "attribute": "number_of_children",
      "value": 0,
      "direct_transition": "Become_Pregnant_Guard"
    },
    "Become_Pregnant_Guard": {
      "type": "Guard",
      "allow": {
        "condition_type": "Attribute",
        "attribute": "pregnant",
        "operator": "==",
        "value": true
      },
      "direct_transition": "Become_Pregnant"
    },
    "Become_Pregnant": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " NORMAL PREGNANCY                                                     ",
        "======================================================================"
      ],
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "72892002",
          "display": "Normal pregnancy"
        }
      ],
      "direct_transition": "Delay_Eight_Weeks"
    },
    "Delay_Eight_Weeks": {
      "type": "Delay",
      "exact": {
        "quantity": 8,
        "unit": "weeks"
      },
      "direct_transition": "Prenatal_Initial_Visit"
    },
    "Prenatal_Initial_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424441002",
          "display": "Prenatal initial visit"
        }
      ],
      "direct_transition": "Pregnancy_Test"
    },
    "Pregnancy_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "252160004",
          "display": "Standard pregnancy test"
        }
      ],
      "direct_transition": "Fetal_Viability_Ultrasound"
    },
    "Fetal_Viability_Ultrasound": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "169230002",
          "display": "Ultrasound scan for fetal viability"
        }
      ],
      "remarks": [
        "Following an initial prenatal visit there are 3 broad outcomes for a pregnancy:",
        "1. Fetal Loss: 1.053M miscarriages --> 17.1% of all pregnancies",
        "2. Induced Abortion: 1.103M induced abortions --> 17.9% of all pregnancies",
        "3. Birth: 3.988M live births --> 65% of all pregnancies",
        "Total pregnancies:  6.155M",
        "Source: http://www.cdc.gov/nchs/data/hestat/pregnancy/2010_pregnancy_rates.htm",
        "In terms of trends, the likelihood of abortion peaks age 20-30, then decreases with age. ",
        "Meanwhile, the likelihood of miscarriage significantly increases with age. 85% will ",
        "miscarriage in the first trimester, the remaining 15% in the second.",
        "|     Age     |  Abortion %  | Miscarriage % | ",
        "|-------------|--------------|---------------| ",
        "|     <20     |    11.4%     |       8%      | ",
        "|    20-24    |    32.7%     |       8%      | ",
        "|    25-29    |    25.9%     |       8%      | ",
        "|    30-34    |    16.8%     |      12%      | ",
        "|    35-39    |     9.2%     |      19%      | ",
        "|    40-44    |     3.6%     |      39%      | ",
        "|     45+     |     3.6%     |      60%      | ",
        "'--------------------------------------------' ",
        "Abortions source: https://www.cdc.gov/mmwr/volumes/65/ss/ss6512a1.htm",
        "Miscarriage source: http://www.advancedfertility.com/age-miscarriage.htm"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 45,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.036,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.51,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.454,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 40,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.036,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.332,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.632,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 35,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.092,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.162,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.746,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 30,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.168,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.102,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.73,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 25,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.259,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.068,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.673,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 20,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.327,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.068,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.605,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.114,
              "transition": "End_Initial_Visit_Towards_Abortion"
            },
            {
              "distribution": 0.068,
              "transition": "Miscarriage_In_First_Trimester"
            },
            {
              "distribution": 0.818,
              "transition": "Pregnancy_CarePlan"
            }
          ]
        }
      ]
    },
    "Pregnancy_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "remarks": [
        "There are MANY activities that could be associated with a pregnancy care plan.",
        "I selected a set of generic activities (physical, educational, psychiatric)",
        "that would be common to most pregnancy care plans."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "134435003",
          "display": "Routine antenatal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "135892000",
          "display": "Antenatal education"
        },
        {
          "system": "SNOMED-CT",
          "code": "713076009",
          "display": "Antenatal risk assessment"
        },
        {
          "system": "SNOMED-CT",
          "code": "312404004",
          "display": "Antenatal blood tests"
        }
      ],
      "assign_to_attribute": "pregnancy_careplan",
      "direct_transition": "Inital_Visit_Fundal_Height"
    },
    "Inital_Visit_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Inital_Visit_Fetal_Heartbeat"
    },
    "Inital_Visit_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "Blood_Typing"
    },
    "Blood_Typing": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "44608003",
          "display": "Blood typing, RH typing"
        }
      ],
      "direct_transition": "Hemoglobin_Test"
    },
    "Hemoglobin_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "104091002",
          "display": "Hemoglobin / Hematocrit / Platelet count"
        }
      ],
      "direct_transition": "Hep_B_Surface_Antigen"
    },
    "Hep_B_Surface_Antigen": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "47758006",
          "display": "Hepatitis B Surface Antigen Measurement"
        }
      ],
      "direct_transition": "HIV_Test"
    },
    "HIV_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "31676001",
          "display": "Human immunodeficiency virus antigen test"
        }
      ],
      "direct_transition": "Chlamydia_Test"
    },
    "Chlamydia_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "310861008",
          "display": "Chlamydia antigen test"
        }
      ],
      "direct_transition": "Gonorrhea_Test"
    },
    "Gonorrhea_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "165829005",
          "display": "Gonorrhea infection test"
        }
      ],
      "direct_transition": "Syphilis_Test"
    },
    "Syphilis_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "269828009",
          "display": "Syphilis infection test"
        }
      ],
      "direct_transition": "Urine_Culture"
    },
    "Urine_Culture": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "117010004",
          "display": "Urine culture"
        }
      ],
      "direct_transition": "Pap_Smear"
    },
    "Pap_Smear": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "90226004",
          "display": "Cytopathology procedure, preparation of smear, genital source"
        }
      ],
      "direct_transition": "Diabetes_Screen"
    },
    "Diabetes_Screen": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "395123002",
          "display": "Urine screening test for diabetes"
        }
      ],
      "direct_transition": "Hep_C_Test"
    },
    "Hep_C_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "104375008",
          "display": "Hepatitis C antibody test"
        }
      ],
      "direct_transition": "Rubella_Screen"
    },
    "Rubella_Screen": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "169690007",
          "display": "Rubella screening"
        }
      ],
      "direct_transition": "Varicella_Test"
    },
    "Varicella_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "104326007",
          "display": "Measurement of Varicella-zoster virus antibody "
        }
      ],
      "direct_transition": "Tuberculosis_Test"
    },
    "Tuberculosis_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "28163009",
          "display": "Skin test for tuberculosis"
        }
      ],
      "direct_transition": "Urine_Protein_Test"
    },
    "Urine_Protein_Test": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "167271000",
          "display": "Urine protein test"
        }
      ],
      "direct_transition": "Physical_Exam"
    },
    "Physical_Exam": {
      "type": "Procedure",
      "target_encounter": "Prenatal_Initial_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "5880005",
          "display": "Physical examination of mother"
        }
      ],
      "direct_transition": "End_Prenatal_Initial_Visit"
    },
    "End_Initial_Visit_Towards_Abortion": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Induced_Abortion"
    },
    "End_Prenatal_Initial_Visit": {
      "type": "EncounterEnd",
      "distributed_transition": [
        {
          "distribution": 0.9999,
          "transition": "Week_12"
        },
        {
          "distribution": 0.0001,
          "transition": "Non_Low_Risk_Pregnancy"
        }
      ]
    },
    "Non_Low_Risk_Pregnancy": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " NON LOW RISK PREGNANCY                                                        ",
        "======================================================================"
      ],
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "47200007",
          "display": "Non-low risk pregnancy"
        }
      ],
      "assign_to_attribute": "non_low_risk_pregnancy",
      "direct_transition": "Non_Low_Risk_Pregnancy_Ends"
    },
    "Non_Low_Risk_Pregnancy_Ends": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "non_low_risk_pregnancy",
      "direct_transition": "Normal_Birth"
    },
    "Week_12": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "direct_transition": "Week_12_Visit"
    },
    "Week_12_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_12_Fundal_Height"
    },
    "Week_12_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_12_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_12_Fetal_Heartbeat"
    },
    "Week_12_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_12_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "Fetal_Aneuploidy_Screen"
    },
    "Fetal_Aneuploidy_Screen": {
      "type": "Procedure",
      "target_encounter": "Week_12_Visit",
      "reason": "Become_Pregnant",
      "remarks": [
        "This is just one option for genetic screening, many options exist but it is unreasonable to represent all options."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "443529005",
          "display": "Screening for chromosomal aneuploidy in prenatal amniotic fluid"
        }
      ],
      "direct_transition": "End_Week_12_Visit"
    },
    "End_Week_12_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_16"
    },
    "Week_16": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "direct_transition": "Week_16_Visit"
    },
    "Week_16_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.038,
          "transition": "Miscarriage_In_Second_Trimester",
          "remarks": [
            "Again, to ensure the total of 17.1% fetal loss the remaining 15% must ",
            "miscarriage now. For simplicity the remaining miscarriages only occur ",
            "in the second trimester. Typically third trimester miscarriages are not ",
            "categorized as 'miscarriages' anyway, but rather 'still births'."
          ]
        },
        {
          "distribution": 0.962,
          "transition": "Fetal_Anatomy_Study"
        }
      ]
    },
    "Fetal_Anatomy_Study": {
      "type": "Procedure",
      "target_encounter": "Week_16_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "271442007",
          "display": "Fetal anatomy study"
        }
      ],
      "direct_transition": "AFP_Test"
    },
    "AFP_Test": {
      "type": "Procedure",
      "target_encounter": "Week_16_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "275833003",
          "display": "Alpha-fetoprotein test"
        }
      ],
      "direct_transition": "Week_16_Fundal_Height"
    },
    "Week_16_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_16_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_16_Fetal_Heartbeat"
    },
    "Week_16_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_16_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_16_Visit"
    },
    "End_Week_16_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_20"
    },
    "Week_20": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "direct_transition": "Week_20_Visit"
    },
    "Week_20_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_20_Fundal_Height"
    },
    "Week_20_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_20_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_20_Fetal_Heartbeat"
    },
    "Week_20_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_20_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_20_Visit"
    },
    "End_Week_20_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_24"
    },
    "Week_24": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "direct_transition": "Week_24_Visit"
    },
    "Week_24_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_24_Fundal_Height"
    },
    "Week_24_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_24_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_24_Fetal_Heartbeat"
    },
    "Week_24_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_24_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_24_Visit"
    },
    "End_Week_24_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_28"
    },
    "Week_28": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "direct_transition": "Week_28_Visit"
    },
    "Week_28_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "RH_NEG",
            "operator": "==",
            "value": true
          },
          "transition": "Antibody_Screen"
        },
        {
          "transition": "Second_Hemoglobin_Test"
        }
      ]
    },
    "Antibody_Screen": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "169673001",
          "display": "Antenatal RhD antibody screening"
        }
      ],
      "direct_transition": "RhoD_Immune_Globulin"
    },
    "RhoD_Immune_Globulin": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "51116004",
          "display": "RhD passive immunization"
        }
      ],
      "direct_transition": "Second_Hemoglobin_Test"
    },
    "Second_Hemoglobin_Test": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "104091002",
          "display": "Hemoglobin / Hematocrit / Platelet count"
        }
      ],
      "direct_transition": "Tdap_Vaccine"
    },
    "Tdap_Vaccine": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "399014008",
          "display": "Vaccination for diphtheria, pertussis, and tetanus"
        }
      ],
      "direct_transition": "Glucose_Screen"
    },
    "Glucose_Screen": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "268556000",
          "display": "Urine screening for glucose"
        }
      ],
      "direct_transition": "Week_28_Fundal_Height"
    },
    "Week_28_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_28_Fetal_Heartbeat"
    },
    "Week_28_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_28_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_28_Visit"
    },
    "End_Week_28_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_32"
    },
    "Week_32": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.08,
          "transition": "Develop_Pre_Eclampsia"
        },
        {
          "distribution": 0.92,
          "transition": "Week_32_Visit"
        }
      ]
    },
    "Develop_Pre_Eclampsia": {
      "type": "ConditionOnset",
      "target_encounter": "Week_32_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "398254007",
          "display": "Preeclampsia"
        }
      ],
      "assign_to_attribute": "pregnancy_complication",
      "direct_transition": "Week_32_Visit"
    },
    "Week_32_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_32_Fundal_Height"
    },
    "Week_32_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_32_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_32_Fetal_Heartbeat"
    },
    "Week_32_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_32_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_32_Visit"
    },
    "End_Week_32_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_36"
    },
    "Week_36": {
      "type": "Delay",
      "exact": {
        "quantity": 4,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.08,
          "transition": "Pre_Eclampsia_Check"
        },
        {
          "distribution": 0.8518,
          "transition": "Week_36_Visit"
        },
        {
          "distribution": 0.0682,
          "transition": "Premature_Birth"
        }
      ]
    },
    "Pre_Eclampsia_Check": {
      "type": "Simple",
      "remarks": [
        "If the patient already has pre-eclampsia we need to end it before giving them eclampsia."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnancy_complication",
            "operator": "is not nil"
          },
          "transition": "Pre_Eclampsia_Becomes_Eclampsia"
        },
        {
          "transition": "Develop_Eclampsia"
        }
      ]
    },
    "Pre_Eclampsia_Becomes_Eclampsia": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "pregnancy_complication",
      "direct_transition": "Develop_Eclampsia"
    },
    "Develop_Eclampsia": {
      "type": "ConditionOnset",
      "target_encounter": "Week_36_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "198992004",
          "display": "Antepartum eclampsia"
        }
      ],
      "assign_to_attribute": "pregnancy_complication",
      "direct_transition": "Week_36_Visit"
    },
    "Week_36_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Group_B_Strep_Test"
    },
    "Group_B_Strep_Test": {
      "type": "Procedure",
      "target_encounter": "Week_36_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "118001005",
          "display": "Streptococcus pneumoniae group B antigen test"
        }
      ],
      "direct_transition": "Week_36_Fundal_Height"
    },
    "Week_36_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_36_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_36_Fetal_Heartbeat"
    },
    "Week_36_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_36_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_36_Visit"
    },
    "End_Week_36_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_38"
    },
    "Week_38": {
      "type": "Delay",
      "exact": {
        "quantity": 2,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.25,
          "transition": "Normal_Birth"
        },
        {
          "distribution": 0.75,
          "transition": "Week_38_Visit"
        }
      ]
    },
    "Week_38_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_38_Fundal_Height"
    },
    "Week_38_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_38_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_38_Fetal_Heartbeat"
    },
    "Week_38_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_38_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_38_Visit"
    },
    "End_Week_38_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_39"
    },
    "Week_39": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.6,
          "transition": "Normal_Birth"
        },
        {
          "distribution": 0.4,
          "transition": "Week_39_Visit"
        }
      ]
    },
    "Premature_Birth": {
      "type": "SetAttribute",
      "attribute": "birth_type",
      "value": "premature",
      "direct_transition": "Birth"
    },
    "Week_39_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_39_Fundal_Height"
    },
    "Week_39_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_39_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_39_Fetal_Heartbeat"
    },
    "Week_39_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_39_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_39_Visit"
    },
    "End_Week_39_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_40"
    },
    "Normal_Birth": {
      "type": "SetAttribute",
      "attribute": "birth_type",
      "value": "normal",
      "direct_transition": "Birth"
    },
    "Week_40": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.7,
          "transition": "Normal_Birth"
        },
        {
          "distribution": 0.3,
          "transition": "Week_40_Visit"
        }
      ]
    },
    "Week_40_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_40_Fundal_Height"
    },
    "Week_40_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_40_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_40_Fetal_Heartbeat"
    },
    "Week_40_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_40_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_40_Visit"
    },
    "End_Week_40_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Week_41"
    },
    "Week_41": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.9,
          "transition": "Normal_Birth"
        },
        {
          "distribution": 0.1,
          "transition": "Week_41_Visit"
        }
      ]
    },
    "Week_41_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "direct_transition": "Week_41_Fundal_Height"
    },
    "Week_41_Fundal_Height": {
      "type": "Procedure",
      "target_encounter": "Week_41_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "274804006",
          "display": "Evaluation of uterine fundal height"
        }
      ],
      "direct_transition": "Week_41_Fetal_Heartbeat"
    },
    "Week_41_Fetal_Heartbeat": {
      "type": "Procedure",
      "target_encounter": "Week_41_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "225158009",
          "display": "Auscultation of the fetal heart"
        }
      ],
      "direct_transition": "End_Week_41_Visit"
    },
    "End_Week_41_Visit": {
      "type": "EncounterEnd",
      "discharge_disposition": {
        "system": "NUBC",
        "code": "02",
        "display": "Transferred to a short term general hospital for inpatient care"
      },
      "direct_transition": "Induced_Birth"
    },
    "Induced_Birth": {
      "type": "SetAttribute",
      "attribute": "birth_type",
      "value": "induced",
      "direct_transition": "Birth"
    },
    "Birth": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " BIRTH                                                                ",
        "======================================================================",
        "Possible 'birth_type' values: 'normal', 'premature', 'induced' ",
        "Unless the birth was elected and intentional (in the case of an induced birth) ",
        "births follow the usual distribution of locations, complications, etc.",
        "A small portion of births (2%) happen at home or on the way to the hospital. For simplicity ",
        "all births in this module happen in a hospital setting. Future versions may add the additional ",
        "complexity of home and BBA births."
      ],
      "direct_transition": "Hospital_Admission_For_Birth"
    },
    "Hospital_Admission_For_Birth": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "Become_Pregnant",
      "remarks": [
        "The birth section of this module is adapted from Jeff Eastman's (https://github.com/jeffeastman) ",
        "initial birth module contributed to Synthea. All remaining probabilities in this section are ",
        "Jeff's estimates."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183460006",
          "display": "Obstetric emergency hospital admission"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.117,
          "transition": "Spontaneous_Vaginal_Delivery"
        },
        {
          "distribution": 0.7246,
          "transition": "Birth_Intervention"
        },
        {
          "distribution": 0.0736,
          "transition": "Assisted_Delivery"
        },
        {
          "distribution": 0.0025,
          "transition": "Spontaneous_Breech"
        },
        {
          "distribution": 0.0823,
          "transition": "Elected_CS"
        }
      ]
    },
    "Spontaneous_Vaginal_Delivery": {
      "type": "Simple",
      "direct_transition": "Give_Birth"
    },
    "Birth_Intervention": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.24,
          "transition": "Induction"
        },
        {
          "distribution": 0.2794,
          "transition": "Epidural"
        },
        {
          "distribution": 0.1245,
          "transition": "Augmentation"
        },
        {
          "distribution": 0.3561,
          "transition": "Episiotomy"
        }
      ]
    },
    "Induction": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "31208007",
          "display": "Medical induction of labor"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.8341,
          "transition": "Give_Birth"
        },
        {
          "distribution": 0.1659,
          "transition": "Emergency_CS"
        }
      ]
    },
    "Epidural": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "18946005",
          "display": "Epidural anesthesia"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.8341,
          "transition": "Spontaneous_Vaginal_Delivery"
        },
        {
          "distribution": 0.1659,
          "transition": "Emergency_CS"
        }
      ]
    },
    "Augmentation": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "237001001",
          "display": "Augmentation of labor"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.8341,
          "transition": "Spontaneous_Vaginal_Delivery"
        },
        {
          "distribution": 0.1659,
          "transition": "Emergency_CS"
        }
      ]
    },
    "Episiotomy": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "85548006",
          "display": "Episiotomy"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.8341,
          "transition": "Spontaneous_Vaginal_Delivery"
        },
        {
          "distribution": 0.1659,
          "transition": "Emergency_CS"
        }
      ]
    },
    "Assisted_Delivery": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "236974004",
          "display": "Instrumental delivery"
        }
      ],
      "direct_transition": "Give_Birth"
    },
    "Spontaneous_Breech": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "177157003",
          "display": "Spontaneous breech delivery"
        }
      ],
      "direct_transition": "Give_Birth"
    },
    "Elected_CS": {
      "type": "Simple",
      "direct_transition": "Give_Birth"
    },
    "Emergency_CS": {
      "type": "SetAttribute",
      "attribute": "birth_type",
      "value": "induced",
      "remarks": [
        "By the time the patient reaches this state the 'birth_type' attribute should already ",
        "be set to 'induced'. This is to catch the emergency CS procedure that come from any ",
        "complications during childbirth."
      ],
      "direct_transition": "Give_Birth"
    },
    "Give_Birth": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "birth_type",
            "operator": "==",
            "value": "normal"
          },
          "transition": "Normal_Birth_Procedure"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "birth_type",
            "operator": "==",
            "value": "premature"
          },
          "transition": "Premature_Birth_Procedure"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "birth_type",
            "operator": "==",
            "value": "induced"
          },
          "transition": "Induced_Birth_Procedure"
        }
      ]
    },
    "Normal_Birth_Procedure": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "66348005",
          "display": "Childbirth"
        }
      ],
      "direct_transition": "Normal_Pregnancy_Completion"
    },
    "Premature_Birth_Procedure": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "65588006",
          "display": "Premature birth of newborn"
        }
      ],
      "direct_transition": "Normal_Pregnancy_Completion"
    },
    "Induced_Birth_Procedure": {
      "type": "Procedure",
      "target_encounter": "Hospital_Admission_For_Birth",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "11466000",
          "display": "Cesarean section"
        }
      ],
      "direct_transition": "Normal_Pregnancy_Completion"
    },
    "Miscarriage_In_First_Trimester": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " MISCARRIAGES                                                         ",
        "======================================================================"
      ],
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "19169002",
          "display": "Miscarriage in first trimester"
        }
      ],
      "assign_to_attribute": "miscarriage",
      "distributed_transition": [
        {
          "distribution": 0.6,
          "transition": "Early_Uknown_Complication"
        },
        {
          "distribution": 0.285,
          "transition": "Blighted_Ovum"
        },
        {
          "distribution": 0.115,
          "transition": "End_Initial_Visit_Towards_Ectopic_Pregnancy"
        }
      ]
    },
    "End_Initial_Visit_Towards_Ectopic_Pregnancy": {
      "type": "EncounterEnd",
      "direct_transition": "Ectopic_Pregnancy"
    },
    "Miscarriage_In_Second_Trimester": {
      "type": "ConditionOnset",
      "target_encounter": "Week_15_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "85116003",
          "display": "Miscarriage in second trimester"
        }
      ],
      "assign_to_attribute": "miscarriage",
      "distributed_transition": [
        {
          "distribution": 0.6,
          "transition": "Late_Fetal_Chromosomal_Anomaly"
        },
        {
          "distribution": 0.25,
          "transition": "Uterine_Anomaly"
        },
        {
          "distribution": 0.15,
          "transition": "Unknown_Complication"
        }
      ]
    },
    "Early_Uknown_Complication": {
      "type": "ConditionOnset",
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "156073000",
          "display": "Fetus with unknown complication"
        }
      ],
      "assign_to_attribute": "fatal_pregnancy_complication",
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Blighted_Ovum": {
      "type": "ConditionOnset",
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "35999006",
          "display": "Blighted ovum"
        }
      ],
      "assign_to_attribute": "fatal_pregnancy_complication",
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Ectopic_Pregnancy": {
      "type": "ConditionOnset",
      "target_encounter": "Prenatal_Initial_Visit",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "79586000",
          "display": "Tubal pregnancy"
        }
      ],
      "assign_to_attribute": "fatal_pregnancy_complication",
      "direct_transition": "Wait_For_Ectopic_Pregnancy_Encounter"
    },
    "Wait_For_Ectopic_Pregnancy_Encounter": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Ectopic_Pregnancy_Encounter"
    },
    "Ectopic_Pregnancy_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "Ectopic_Pregnancy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "305408004",
          "display": "Admission to surgical department"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.5,
          "transition": "Methotrexate_Injection",
          "remarks": [
            "This distribution is set to 50/50 for now as there is no available ",
            "data regarding this distribution. "
          ]
        },
        {
          "distribution": 0.5,
          "transition": "Ectopic_Pregnancy_Surgery_Procedure"
        }
      ]
    },
    "Methotrexate_Injection": {
      "type": "Procedure",
      "target_encounter": "Ectopic_Pregnancy_Encounter",
      "reason": "Ectopic_Pregnancy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "236931002",
          "display": "Methotrexate injection into tubal pregnancy"
        }
      ],
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Ectopic_Pregnancy_Surgery_Procedure": {
      "type": "Procedure",
      "target_encounter": "Ectopic_Pregnancy_Encounter",
      "reason": "Ectopic_Pregnancy",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "445912000",
          "display": "Excision of fallopian tube and surgical removal of ectopic pregnancy"
        }
      ],
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Late_Fetal_Chromosomal_Anomaly": {
      "type": "ConditionOnset",
      "target_encounter": "Week_15_Visit",
      "assign_to_attribute": "fatal_pregnancy_complication",
      "remarks": [
        "This is a separate state due to the limitation that a ConditionOnset must occur ",
        "before or concurrently with its target_encounter."
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "267253006",
          "display": "Fetus with chromosomal abnormality"
        }
      ],
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Uterine_Anomaly": {
      "type": "ConditionOnset",
      "target_encounter": "Week_15_Visit",
      "assign_to_attribute": "fatal_pregnancy_complication",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "37849005",
          "display": "Congenital uterine anomaly"
        }
      ],
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "Unknown_Complication": {
      "type": "ConditionOnset",
      "target_encounter": "Week_15_Visit",
      "assign_to_attribute": "fatal_pregnancy_complication",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "609496007",
          "display": "Complication occuring during pregnancy"
        }
      ],
      "direct_transition": "End_Miscarriage_Encounter"
    },
    "End_Miscarriage_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Miscarriage_Followup_Encounter"
    },
    "Wait_For_Miscarriage_Followup_Encounter": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Miscarriage_Followup_Encounter"
    },
    "Miscarriage_Followup_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "fatal_pregnancy_complication",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "RH_NEG",
            "operator": "==",
            "value": true
          },
          "transition": "RhoD_Immune_Globulin_Post_Miscarriage"
        },
        {
          "transition": "Physical_Exam_Post_Miscarriage"
        }
      ]
    },
    "RhoD_Immune_Globulin_Post_Miscarriage": {
      "type": "Procedure",
      "target_encounter": "Miscarriage_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "51116004",
          "display": "RhD passive immunization"
        }
      ],
      "direct_transition": "Physical_Exam_Post_Miscarriage"
    },
    "Physical_Exam_Post_Miscarriage": {
      "type": "Procedure",
      "target_encounter": "Miscarriage_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "5880005",
          "display": "Physical examination"
        }
      ],
      "direct_transition": "Depression_Screening_Post_Miscarriage"
    },
    "Depression_Screening_Post_Miscarriage": {
      "type": "Procedure",
      "target_encounter": "Miscarriage_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "171207006",
          "display": "Depression screening"
        }
      ],
      "direct_transition": "Miscarriage_Fatal_Pregnancy_Complication_Ends"
    },
    "Miscarriage_Fatal_Pregnancy_Complication_Ends": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "fatal_pregnancy_complication",
      "direct_transition": "End_Miscarriage_Followup_Encounter"
    },
    "End_Miscarriage_Followup_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Miscarriage_Ends"
    },
    "Wait_For_Induced_Abortion": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " INDUCED ABORTIONS                                                    ",
        "======================================================================"
      ],
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Induced_Abortion_Encounter"
    },
    "Induced_Abortion_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "270427003",
          "display": "Patient-initiated encounter"
        }
      ],
      "direct_transition": "Induced_Abortion_Therapy"
    },
    "Induced_Abortion_Therapy": {
      "type": "Procedure",
      "target_encounter": "Induced_Abortion_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "10383002",
          "display": "Counseling for termination of pregnancy"
        }
      ],
      "direct_transition": "Induced_Abortion_Procedure"
    },
    "Induced_Abortion_Procedure": {
      "type": "Procedure",
      "target_encounter": "Induced_Abortion_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "714812005",
          "display": "Induced termination of pregnancy"
        }
      ],
      "direct_transition": "End_Induced_Abortion_Encounter"
    },
    "End_Induced_Abortion_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_For_Abortion_Followup_Encounter"
    },
    "Wait_For_Abortion_Followup_Encounter": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 3,
        "unit": "weeks"
      },
      "direct_transition": "Abortion_Followup_Encounter"
    },
    "Abortion_Followup_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "424619006",
          "display": "Prenatal visit"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "RH_NEG",
            "operator": "==",
            "value": true
          },
          "transition": "RhoD_Immune_Globulin_Post_Abortion"
        },
        {
          "transition": "Pregnancy_Termination_Care"
        }
      ]
    },
    "RhoD_Immune_Globulin_Post_Abortion": {
      "type": "Procedure",
      "target_encounter": "Abortion_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "51116004",
          "display": "RhD passive immunization"
        }
      ],
      "direct_transition": "Pregnancy_Termination_Care"
    },
    "Pregnancy_Termination_Care": {
      "type": "Procedure",
      "target_encounter": "Abortion_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "386394001",
          "display": "Pregnancy termination care"
        }
      ],
      "direct_transition": "Physical_Exam_Post_Abortion"
    },
    "Physical_Exam_Post_Abortion": {
      "type": "Procedure",
      "target_encounter": "Abortion_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "5880005",
          "display": "Physical exam following abortion"
        }
      ],
      "direct_transition": "Depression_Screening_Post_Abortion"
    },
    "Depression_Screening_Post_Abortion": {
      "type": "Procedure",
      "target_encounter": "Abortion_Followup_Encounter",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "171207006",
          "display": "Depression screening"
        }
      ],
      "direct_transition": "End_Abortion_Followup_Encounter"
    },
    "End_Abortion_Followup_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Abortion_Ends"
    },
    "Normal_Pregnancy_Completion": {
      "type": "Counter",
      "action": "increment",
      "attribute": "number_of_children",
      "remarks": [
        "======================================================================",
        " PREGNANCY COMPLETION                                                 ",
        "======================================================================",
        "A pregnancy resulting in live birth increments the 'number_of_children' ",
        "counter. This allows us to track how many children are born to each mother."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "pregnancy_complication",
            "operator": "is not nil"
          },
          "transition": "Pregnancy_Complication_Ends"
        },
        {
          "transition": "Pregnancy_CarePlan_Ends"
        }
      ]
    },
    "Pregnancy_Complication_Ends": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "pregnancy_complication",
      "direct_transition": "Unset_Pregnancy_Complication_Attribute"
    },
    "Unset_Pregnancy_Complication_Attribute": {
      "type": "SetAttribute",
      "attribute": "pregnancy_complication",
      "direct_transition": "Pregnancy_CarePlan_Ends"
    },
    "Pregnancy_CarePlan_Ends": {
      "type": "CarePlanEnd",
      "referenced_by_attribute": "pregnancy_careplan",
      "direct_transition": "End_Birth_Encounter"
    },
    "End_Birth_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Normal_Pregnancy_Ends"
    },
    "Normal_Pregnancy_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Become_Pregnant",
      "direct_transition": "Six_Weeks_After_Birth"
    },
    "Miscarriage_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Become_Pregnant",
      "direct_transition": "Unset_Pregnant_Attribute"
    },
    "Abortion_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Become_Pregnant",
      "direct_transition": "Unset_Pregnant_Attribute"
    },
    "Six_Weeks_After_Birth": {
      "type": "Delay",
      "exact": {
        "quantity": 6,
        "unit": "weeks"
      },
      "direct_transition": "Postnatal_Visit"
    },
    "Postnatal_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "169762003",
          "display": "Postnatal visit"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "RH_NEG",
            "operator": "==",
            "value": true
          },
          "transition": "RhoD_Immune_Globulin_Post_Birth"
        },
        {
          "transition": "Physical_Exam_Post_Birth"
        }
      ]
    },
    "RhoD_Immune_Globulin_Post_Birth": {
      "type": "Procedure",
      "target_encounter": "Postnatal_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "51116004",
          "display": "RhD passive immunization"
        }
      ],
      "direct_transition": "Physical_Exam_Post_Birth"
    },
    "Physical_Exam_Post_Birth": {
      "type": "Procedure",
      "target_encounter": "Postnatal_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "5880005",
          "display": "Physical examination following birth"
        }
      ],
      "direct_transition": "Depression_Screening_Post_Birth"
    },
    "Depression_Screening_Post_Birth": {
      "type": "Procedure",
      "target_encounter": "Postnatal_Visit",
      "reason": "Become_Pregnant",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "171207006",
          "display": "Depression screening"
        }
      ],
      "direct_transition": "End_Postnatal_Visit"
    },
    "End_Postnatal_Visit": {
      "type": "EncounterEnd",
      "direct_transition": "Unset_Pregnant_Attribute"
    },
    "Unset_Pregnant_Attribute": {
      "type": "SetAttribute",
      "attribute": "pregnant",
      "value": false,
      "direct_transition": "Become_Pregnant_Guard"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"primary_atrophic_hypothyroidism":{
  "name": "Primary atrophic hypothyroidism",
  "remarks": [
    "Hypothyroidism is a disorder of the endocrine system in which the thyroid gland does not produce enough thyroid hormone. Diagnosed by lab panel, and treated with synthroid."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Age delay"
    },
    "Terminal": {
      "type": "Terminal"
    },
    "Age delay": {
      "type": "Delay",
      "range": {
        "low": 50,
        "high": 75,
        "unit": "years"
      },
      "remarks": [
        "common onset of primary atrophic hypothyroidism does not occer till after 50 years of age.",
        ""
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "transition": "Cold Symptom",
              "distribution": 0.048
            },
            {
              "transition": "Terminal",
              "distribution": 0.952
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "transition": "Cold Symptom",
              "distribution": 0.009
            },
            {
              "transition": "Terminal",
              "distribution": 0.991
            }
          ]
        }
      ]
    },
    "Hypothyroid Condition Onset": {
      "type": "ConditionOnset",
      "target_encounter": "Hypothyroidism encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 40930008,
          "display": "Hypothyroidism (disorder)"
        }
      ],
      "direct_transition": "Hypothyroidism encounter"
    },
    "encounter end": {
      "type": "EncounterEnd",
      "direct_transition": "Terminal"
    },
    "Synthroid Medication Order": {
      "type": "MedicationOrder",
      "codes": [
        {
          "system": "RxNorm",
          "code": 966222,
          "display": "Levothyroxine Sodium 0.075 MG Oral Tablet"
        }
      ],
      "direct_transition": "encounter end",
      "prescription": {
        "dosage": {
          "amount": 1,
          "frequency": 1,
          "period": 1,
          "unit": "days"
        },
        "duration": {
          "quantity": 60,
          "unit": "days"
        },
        "refills": 6
      }
    },
    "Lab Panel Results": {
      "type": "DiagnosticReport",
      "codes": [
        {
          "system": "LOINC",
          "code": "24348-5",
          "display": "Free T4 and TSH panel - Serum or Plasma"
        }
      ],
      "observations": [
        {
          "category": "laboratory",
          "unit": "ng/dl",
          "codes": [
            {
              "system": "LOINC",
              "code": "3024-7",
              "display": "Thyroxine (T4) free [Mass/volume] in Serum or Plasma"
            }
          ],
          "range": {
            "low": 0.1,
            "high": 0.4
          }
        },
        {
          "category": "laboratory",
          "unit": "m[IU]/L",
          "codes": [
            {
              "system": "LOINC",
              "code": "3016-3",
              "display": "Thyrotropin [Units/volume] in Serum or Plasma"
            }
          ],
          "range": {
            "low": 2,
            "high": 5
          }
        }
      ],
      "direct_transition": "Synthroid Medication Order"
    },
    "Cold Symptom": {
      "type": "Symptom",
      "symptom": "cold intolerance",
      "cause": "",
      "direct_transition": "Decreased Appetite",
      "range": {
        "low": 1,
        "high": 20
      }
    },
    "Decreased Appetite": {
      "type": "Symptom",
      "symptom": "decreased appetite",
      "cause": "",
      "direct_transition": "Weight Gain",
      "range": {
        "low": 1,
        "high": 20
      }
    },
    "Weight Gain": {
      "type": "Symptom",
      "symptom": "weight gain",
      "cause": "",
      "direct_transition": "Fatigue Symptom",
      "range": {
        "low": 1,
        "high": 20
      }
    },
    "Fatigue Symptom": {
      "type": "Symptom",
      "symptom": "fatigue",
      "cause": "",
      "direct_transition": "Hypothyroid Condition Onset",
      "range": {
        "low": 1,
        "high": 20
      }
    },
    "Hypothyroidism encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 185345009,
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "Lab Panel Results"
    }
  }
}
,
"rheumatoid_arthritis":{
  "name": "Rheumatoid Arthritis",
  "remarks": [
    "Rheumatoid arthritis (RA) is a chronic condition where joints and other organs are ",
    "attacked by the body's own immune system. RA is treated aggressively and about 75% ",
    "of cases go into remission within 5 years.",
    "Information on treatment, prevalence, and incidence of specific arthritis types from the CDC: ",
    "http://www.cdc.gov/arthritis/basics/types.html",
    "Overall prevalence of arthritis: ",
    "http://www.cdc.gov/arthritis/data_statistics/national-statistics.html"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        " | Arthritis Type | Prevalence | Ratio F:M | ",
        " ------------------------------------------- ",
        " | Rheumatoid     |   0.01000  |    1:1    | ",
        " ------------------------------------------- "
      ],
      "distributed_transition": [
        {
          "distribution": 0.01,
          "transition": "Delay_Until_Arthritis"
        },
        {
          "distribution": 0.99,
          "transition": "Terminal"
        }
      ]
    },
    "Delay_Until_Arthritis": {
      "type": "Delay",
      "range": {
        "low": 25,
        "high": 80,
        "unit": "years"
      },
      "direct_transition": "RA_Symptom1"
    },
    "RA_Symptom1": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "RA_Symptom2"
    },
    "RA_Symptom2": {
      "type": "Symptom",
      "symptom": "Joint Stiffness",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "RA_Symptom3"
    },
    "RA_Symptom3": {
      "type": "Symptom",
      "symptom": "Joint Swelling",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "RA_Symptom4"
    },
    "RA_Symptom4": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "RA_Symptom5"
    },
    "RA_Symptom5": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 20
      },
      "direct_transition": "Rheumatoid_Arthritis"
    },
    "Rheumatoid_Arthritis": {
      "type": "ConditionOnset",
      "remarks": [
        "======================================================================",
        " RHEUMATOID ARTHRITIS                                                 ",
        "======================================================================",
        "Source: http://www.cdc.gov/arthritis/basics/rheumatoid.htm"
      ],
      "target_encounter": "RA_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "69896004",
          "display": "Rheumatoid arthritis"
        }
      ],
      "direct_transition": "RA_Diagnosis"
    },
    "RA_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Rheumatoid_Arthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "RA_CarePlan"
    },
    "RA_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "RA_Diagnosis",
      "assign_to_attribute": "ra_careplan",
      "reason": "Rheumatoid_Arthritis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "872781000000100",
          "display": "Musculoskeletal care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "183301007",
          "display": "Physical exercises"
        },
        {
          "system": "SNOMED-CT",
          "code": "229580007",
          "display": "Ice therapy"
        },
        {
          "system": "SNOMED-CT",
          "code": "226234005",
          "display": "Healthy diet"
        }
      ],
      "direct_transition": "RA_Nonopioid_Pain_Medication"
    },
    "RA_Nonopioid_Pain_Medication": {
      "type": "MedicationOrder",
      "target_encounter": "RA_Diagnosis",
      "reason": "Rheumatoid_Arthritis",
      "remarks": [
        "A stronger NSAID pain reliever than the basic Aleve."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "849437",
          "display": "Naproxen sodium 550 MG [Anaprox]"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Date",
            "operator": ">=",
            "year": 1990
          },
          "transition": "DMARD",
          "remarks": [
            "Aggressive treatment using DMARDs didn't start until the 1990's."
          ]
        },
        {
          "transition": "Corticosteroid"
        }
      ]
    },
    "DMARD": {
      "type": "MedicationOrder",
      "target_encounter": "RA_Diagnosis",
      "reason": "Rheumatoid_Arthritis",
      "remarks": [
        "Disease-Modifying Anti-Rheumatic Drugs (DMARDs) inhibit or halt the progression ",
        "of rheumatoid arthritis. Although there are side effects, prompt treatment with DMARDs ",
        "can put RA into remission before more serious damage occurs. Typical treatment with ",
        "DMARDs is 40-50 months. See: https://www.ncbi.nlm.nih.gov/pubmed/10813279"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "575020",
          "display": "Methotrexate 10 MG [Trexall]"
        }
      ],
      "direct_transition": "Encounter_Ends_After_DMARD"
    },
    "Encounter_Ends_After_DMARD": {
      "type": "EncounterEnd",
      "direct_transition": "DMARD_Treatment_Period"
    },
    "DMARD_Treatment_Period": {
      "type": "Delay",
      "range": {
        "low": 40,
        "high": 60,
        "unit": "months"
      },
      "direct_transition": "End_DMARD"
    },
    "End_DMARD": {
      "type": "MedicationEnd",
      "medication_order": "DMARD",
      "distributed_transition": [
        {
          "distribution": 0.75,
          "transition": "RA_Ends",
          "remarks": [
            "Treatment with DMARDs is fairly successful - 75% of cases go into remission."
          ]
        },
        {
          "distribution": 0.25,
          "transition": "Living_With_RA"
        }
      ]
    },
    "Corticosteroid": {
      "type": "MedicationOrder",
      "target_encounter": "RA_Diagnosis",
      "reason": "Rheumatoid_Arthritis",
      "remarks": [
        "When introduced in higher levels than those produced by the body, corticosteroids ",
        "inhibit inflammation. However, doctors prefer to use these for as short a time period ",
        "as possible to avoid dangerous side effects."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "567645",
          "display": "predniSONE 2.5 MG [Deltasone]"
        }
      ],
      "direct_transition": "Encounter_Ends_After_Corticosteroids"
    },
    "Encounter_Ends_After_Corticosteroids": {
      "type": "EncounterEnd",
      "direct_transition": "Corticosteroid_Treatment"
    },
    "Corticosteroid_Treatment": {
      "type": "Delay",
      "range": {
        "low": 2,
        "high": 4,
        "unit": "weeks"
      },
      "direct_transition": "End_Corticosteroid"
    },
    "End_Corticosteroid": {
      "type": "MedicationEnd",
      "medication_order": "Corticosteroid",
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "RA_Ends",
          "remarks": [
            "Although treatment with DMARDs is far more successful, some patients with mild ",
            "RA can go into remission after only basic treatment."
          ]
        },
        {
          "distribution": 0.8,
          "transition": "Living_With_RA"
        }
      ]
    },
    "Living_With_RA": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 15,
        "unit": "years"
      },
      "remarks": [
        "About 25% of severe RA cases result in total joint replacement. Source: ",
        "http://www.uptodate.com/contents/total-joint-replacement-for-severe-rheumatoid-arthritis"
      ],
      "distributed_transition": [
        {
          "distribution": 0.125,
          "transition": "Setup_Knee_Replacement"
        },
        {
          "distribution": 0.125,
          "transition": "Setup_Hip_Replacement"
        },
        {
          "distribution": 0.75,
          "transition": "Terminal"
        }
      ]
    },
    "Setup_Knee_Replacement": {
      "type": "SetAttribute",
      "attribute": "joint_replacement",
      "value": "knee",
      "direct_transition": "Terminal"
    },
    "Setup_Hip_Replacement": {
      "type": "SetAttribute",
      "attribute": "joint_replacement",
      "value": "hip",
      "direct_transition": "Terminal"
    },
    "RA_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Rheumatoid_Arthritis",
      "direct_transition": "End_RA_CarePlan"
    },
    "End_RA_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "RA_CarePlan",
      "direct_transition": "End_RA_Nonopioid"
    },
    "End_RA_Nonopioid": {
      "type": "MedicationEnd",
      "medication_order": "RA_Nonopioid_Pain_Medication",
      "direct_transition": "RA_Symptom1_Ends"
    },
    "RA_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Joint Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "RA_Symptom2_Ends"
    },
    "RA_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Joint Stiffness",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "RA_Symptom3_Ends"
    },
    "RA_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Joint Swelling",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "RA_Symptom4_Ends"
    },
    "RA_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "RA_Symptom5_Ends"
    },
    "RA_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"self_harm":{
  "name": "Self Harm",
  "remarks": [
    "In the U.S., suicides occur at a rate of 12.93/100k people. However, suicide attempts occur ",
    "at approximately 12x this rate. The incidence of attempts and completed suicides varies ",
    "greatly depending on race, age, and gender. The following factors influence the likelihood ",
    "of suicide in this module: ",
    "Race   - White males (esp. middle age or older) account for 7/10 suicides ",
    "Gender - Females attempt suicide 3x as often as males, but males complete 3.5x as often ",
    "Age    - In general, the older you get the more likely you are to commit suicide ",
    "source: https://afsp.org/about-suicide/suicide-statistics/",
    "A Harvard University study on attempted suicides shed additional light on the incidence, ",
    "recurrence, and outcomes of suicide attempts. See: ",
    "https://www.hsph.harvard.edu/means-matter/means-matter/survival/"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        "Initial breakdown by gender and race. For simplicity, grouping race into only 3 categories: ",
        "white, hispanic, and the rest. For the rest, I averaged the incidence rates: (6.3 + 5.9 + 5.5) / 3 = 5.9 ",
        "The assumption here is that all races have the same relative ratios of attempts to completions (12:1).",
        "Females ATTEMPT suicide 3x as often as males, but males complete 3.5x as often. If the death rate ",
        "is 12.93/100k and attempt rates are estimated at 12x that number, then the average ATTEMPT rates ",
        "for males and females, by race, are: ",
        "| Race   | Completion Rate | Attempt Rates (12x) | Female Incidence (75%) | Male Incidence (25%) | ",
        "-------------------------------------------------------------------------------------------------- ",
        "| White  |     0.000147    |       0.001764      |        0.001323        |       0.000441       | ",
        "| Native |     0.000109    |       0.001308      |        0.000981        |       0.000327       | ",
        "| Rest   |     0.000059    |       0.000708      |        0.000531        |       0.000177       | ",
        "-------------------------------------------------------------------------------------------------- "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Gender",
                "gender": "M"
              },
              {
                "condition_type": "Race",
                "race": "White"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.000441,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.999559,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Gender",
                "gender": "M"
              },
              {
                "condition_type": "Race",
                "race": "Native"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.000327,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.999673,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M",
            "remarks": [
              "This catches males of any other race."
            ]
          },
          "distributions": [
            {
              "distribution": 0.000177,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.999823,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Gender",
                "gender": "F"
              },
              {
                "condition_type": "Race",
                "race": "White"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.001323,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.998677,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Gender",
                "gender": "F"
              },
              {
                "condition_type": "Race",
                "race": "Native"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.000981,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.999019,
              "transition": "Terminal"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F",
            "remarks": [
              "This catches females of any other race."
            ]
          },
          "distributions": [
            {
              "distribution": 0.000531,
              "transition": "Attempted_Suicide_Incidence_By_Age"
            },
            {
              "distribution": 0.999469,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Attempted_Suicide_Incidence_By_Age": {
      "type": "Simple",
      "remarks": [
        "Instead of using the incidence rates out of 100k, using the relative proportions ",
        "of the age-adjusted incidence rates. Adjusted these to the following values: ",
        "<20      3.2 / 89.3  => 0.036 ",
        "20-34   14.8 / 89.3  => 0.166 ",
        "35-44   16.6 / 89.3  => 0.186 ",
        "45-64   19.2 / 89.3  => 0.215 ",
        "65-84   16.2 / 89.3  => 0.181 ",
        "85+     19.3 / 89.3  => 0.216 ",
        "----------------------------- ",
        "Total:  89.3 / 89.3  => 1.000 "
      ],
      "distributed_transition": [
        {
          "distribution": 0.036,
          "transition": "Delay_Until_Teens"
        },
        {
          "distribution": 0.166,
          "transition": "Delay_Until_20_34"
        },
        {
          "distribution": 0.186,
          "transition": "Delay_Until_35_44"
        },
        {
          "distribution": 0.215,
          "transition": "Delay_Until_45_64"
        },
        {
          "distribution": 0.181,
          "transition": "Delay_Until_65_84"
        },
        {
          "distribution": 0.216,
          "transition": "Delay_Until_85_Plus"
        }
      ]
    },
    "Delay_Until_Teens": {
      "type": "Delay",
      "range": {
        "low": 15,
        "high": 19,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Delay_Until_20_34": {
      "type": "Delay",
      "range": {
        "low": 20,
        "high": 34,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Delay_Until_35_44": {
      "type": "Delay",
      "range": {
        "low": 35,
        "high": 44,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Delay_Until_45_64": {
      "type": "Delay",
      "range": {
        "low": 45,
        "high": 64,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Delay_Until_65_84": {
      "type": "Delay",
      "range": {
        "low": 64,
        "high": 84,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Delay_Until_85_Plus": {
      "type": "Delay",
      "range": {
        "low": 85,
        "high": 90,
        "unit": "years"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Attempts_Suicide": {
      "type": "Simple",
      "remarks": [
        "It's difficult to find accurate statistics for how many people actually attempt suicide since ",
        "those who attempt suicide often don't seek medical attention afterwards. Therefore, the attempts ",
        "modeled in this module are considered severe enough to merit medical attention.",
        "Males COMPLETE suicide 3.5x as often as females do. Suicides have a 7% completion rate overall."
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.0546,
              "transition": "Fatal_Attempt"
            },
            {
              "distribution": 0.9454,
              "transition": "Non_Fatal_Attempt"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "distributions": [
            {
              "distribution": 0.0156,
              "transition": "Fatal_Attempt"
            },
            {
              "distribution": 0.9844,
              "transition": "Non_Fatal_Attempt"
            }
          ]
        }
      ]
    },
    "Non_Fatal_Attempt": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " NON-FATAL                                                            ",
        "======================================================================",
        "Most commonly this is from poisoning (overdose), suffocation, or cutting. Less than 1% of all ",
        "non-fatal attempts involve firearms, so omitting that option altogether. The distributions here ",
        "are based on the Harvard University study, see: ",
        "https://www.hsph.harvard.edu/means-matter/basic-suicide-facts/how/"
      ],
      "distributed_transition": [
        {
          "distribution": 0.64,
          "transition": "Attempt_By_Poisoning"
        },
        {
          "distribution": 0.19,
          "transition": "Attempt_By_Cutting"
        },
        {
          "distribution": 0.17,
          "transition": "Attempt_By_Suffocation"
        }
      ]
    },
    "Attempt_By_Poisoning": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Attempted_Suicide",
      "assign_to_attribute": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "86849004",
          "display": "Suicidal deliberate poisoning"
        }
      ],
      "direct_transition": "ED_Visit_For_Attempted_Suicide"
    },
    "Attempt_By_Cutting": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Attempted_Suicide",
      "assign_to_attribute": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "287185009",
          "display": "Attempted suicide - cut/stab"
        }
      ],
      "direct_transition": "ED_Visit_For_Attempted_Suicide"
    },
    "Attempt_By_Suffocation": {
      "type": "ConditionOnset",
      "target_encounter": "ED_Visit_For_Attempted_Suicide",
      "assign_to_attribute": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "287182007",
          "display": "Attempted suicide - suffocation"
        }
      ],
      "direct_transition": "ED_Visit_For_Attempted_Suicide"
    },
    "ED_Visit_For_Attempted_Suicide": {
      "type": "Encounter",
      "encounter_class": "emergency",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "50849002",
          "display": "Emergency room admission"
        }
      ],
      "direct_transition": "Psychiatric_Evaluation"
    },
    "Psychiatric_Evaluation": {
      "type": "Procedure",
      "target_encounter": "ED_Visit_For_Attempted_Suicide",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "90407005",
          "display": "Evaluation of psychiatric state of patient"
        }
      ],
      "direct_transition": "Short_Hospital_Stay"
    },
    "Short_Hospital_Stay": {
      "type": "Procedure",
      "target_encounter": "ED_Visit_For_Attempted_Suicide",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "74857009",
          "display": "Hospital admission, short-term, 24 hours"
        }
      ],
      "duration": {
        "low": 24,
        "high": 72,
        "unit": "hours"
      },
      "direct_transition": "End_Attempted_Suicide_Observation_Period"
    },
    "End_Attempted_Suicide_Observation_Period": {
      "type": "EncounterEnd",
      "direct_transition": "End_Suicide_Attempt"
    },
    "End_Suicide_Attempt": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "suicide_attempt",
      "direct_transition": "Delay_Until_Outpatient_Followup"
    },
    "Delay_Until_Outpatient_Followup": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 7,
        "unit": "days"
      },
      "direct_transition": "Attempted_Suicide_Followup"
    },
    "Attempted_Suicide_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Suicide_CarePlan_Selector"
    },
    "Suicide_CarePlan_Selector": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "suicide_careplan",
            "operator": "is nil"
          },
          "transition": "Suicide_CarePlan"
        },
        {
          "transition": "Followup_Psychiatric_Evaluation"
        }
      ]
    },
    "Suicide_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Attempted_Suicide_Followup",
      "assign_to_attribute": "suicide_careplan",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183401008",
          "display": "Anti-suicide psychotherapy"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "784051000000106",
          "display": "Depression care management"
        },
        {
          "system": "SNOMED-CT",
          "code": "415665002",
          "display": "Suicide prevention"
        },
        {
          "system": "SNOMED-CT",
          "code": "10029008",
          "display": "Suicide precautions"
        }
      ],
      "direct_transition": "Followup_Psychiatric_Evaluation"
    },
    "Followup_Psychiatric_Evaluation": {
      "type": "Procedure",
      "target_encounter": "Attempted_Suicide_Followup",
      "reason": "suicide_attempt",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "88848003",
          "display": "Psychiatric follow-up"
        }
      ],
      "direct_transition": "End_Followup_Encounter"
    },
    "End_Followup_Encounter": {
      "type": "EncounterEnd",
      "remarks": [
        "From the Harvard University study on suicide attempts: ",
        " 7% are fatal ",
        "70% do not attempt suicide again ",
        "23% reattempt at some point "
      ],
      "distributed_transition": [
        {
          "distribution": 0.753,
          "transition": "Terminal"
        },
        {
          "distribution": 0.247,
          "transition": "Delay_Until_Next_Attempt"
        }
      ]
    },
    "Delay_Until_Next_Attempt": {
      "type": "Delay",
      "remarks": [
        "It's unclear what a typical amount of time is between suicide attempts. Leaving  this as ",
        "a broad range from 0.5 - 3 years."
      ],
      "range": {
        "low": 6,
        "high": 36,
        "unit": "months"
      },
      "direct_transition": "Attempts_Suicide"
    },
    "Fatal_Attempt": {
      "type": "Simple",
      "remarks": [
        "======================================================================",
        " FATAL                                                                ",
        "======================================================================",
        "The most common methods of fatal suicide are: ",
        "49.9% by firearms ",
        "26.7% by suffocation or hanging (includes CO from motor vehicles)",
        "15.9% by poisoning ",
        " 7.5% by other means (vehicular, drowning, falls, etc.)"
      ],
      "distributed_transition": [
        {
          "distribution": 0.499,
          "transition": "Suicide_By_Firearm"
        },
        {
          "distribution": 0.267,
          "transition": "Suicide_By_Suffocation"
        },
        {
          "distribution": 0.159,
          "transition": "Suicide_By_Poisoning"
        },
        {
          "distribution": 0.075,
          "transition": "Suicide_By_Other_Means"
        }
      ]
    },
    "Suicide_By_Firearm": {
      "type": "ConditionOnset",
      "target_encounter": "Autopsy_Encounter",
      "assign_to_attribute": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "287193009",
          "display": "Suicide - firearms"
        }
      ],
      "direct_transition": "Death"
    },
    "Suicide_By_Suffocation": {
      "type": "ConditionOnset",
      "target_encounter": "Autopsy_Encounter",
      "assign_to_attribute": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "287191006",
          "display": "Suicide - suffocation"
        }
      ],
      "direct_transition": "Death"
    },
    "Suicide_By_Poisoning": {
      "type": "ConditionOnset",
      "target_encounter": "Autopsy_Encounter",
      "assign_to_attribute": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "86849004",
          "display": "Suicidal deliberate poisoning"
        }
      ],
      "direct_transition": "Death"
    },
    "Suicide_By_Other_Means": {
      "type": "ConditionOnset",
      "target_encounter": "Autopsy_Encounter",
      "assign_to_attribute": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "44301001",
          "display": "Suicide"
        }
      ],
      "direct_transition": "Death"
    },
    "Death": {
      "type": "Death",
      "referenced_by_attribute": "suicide",
      "direct_transition": "Autopsy_Encounter"
    },
    "Autopsy_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185347001",
          "display": "Encounter for problem"
        }
      ],
      "direct_transition": "Autopsy_Examination"
    },
    "Autopsy_Examination": {
      "type": "Procedure",
      "target_encounter": "Autopsy_Encounter",
      "reason": "suicide",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "29240004",
          "display": "Autopsy examination"
        }
      ],
      "direct_transition": "End_Suicide"
    },
    "End_Suicide": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "suicide",
      "direct_transition": "Terminal"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"sexual_activity":{
  "name": "Sexual Activity",
  "remarks": [
    "This module models the sexual activity of males and females from puberty ",
    "to old age. Most of the incidence in this module is based on a recent study ",
    "from Indiana University: http://www.nationalsexstudy.indiana.edu/graph.html",
    "This module operates on the assumption that these incidences for human sexual ",
    "activity have remained similar throughout modern history.",
    "No consideration is given to the age, race, socioeconomic status, or marriage ",
    "status of the patient. This complexity could be added."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Initially_Inactive"
    },
    "Initially_Inactive": {
      "type": "SetAttribute",
      "remarks": [
        "Initially, everyone is not sexually active. I hope."
      ],
      "attribute": "sexually_active",
      "value": false,
      "direct_transition": "Delay_For_Sexual_Activity"
    },
    "Delay_For_Sexual_Activity": {
      "type": "Delay",
      "remarks": [
        "There is no data on sexual activity before the age of 14."
      ],
      "exact": {
        "quantity": 14,
        "unit": "years"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Male_Sexual_Activity"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Female_Sexual_Activity"
        }
      ]
    },
    "Female_Sexual_Activity": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " FEMALE SEXUAL ACTIVITY                                               ",
        "======================================================================",
        "Sexual activity is modeled on a yearly basis, matching the Indiana University ",
        "study. The incidences used here match the 'Vaginal Intercourse' numbers from ",
        "the study."
      ],
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 16,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.11,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.89,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.7,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 20,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.62,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.38,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 25,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.8,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.2,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 30,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.87,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.13,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 40,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.74,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.26,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 50,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.7,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.3,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 60,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.51,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.49,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 70,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.42,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.58,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 70,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.22,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.78,
              "transition": "Not_Sexually_Active"
            }
          ]
        }
      ]
    },
    "Male_Sexual_Activity": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " MALE SEXUAL ACTIVITY                                                 ",
        "======================================================================",
        "Also matching the 'Vaginal Intercourse' numbers from the study."
      ],
      "exact": {
        "quantity": 1,
        "unit": "years"
      },
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 16,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.09,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.91,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.3,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.7,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 20,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.53,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.47,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 25,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.63,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.37,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 30,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.86,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.14,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 40,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.85,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.15,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 50,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.74,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.26,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 60,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.58,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.42,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 70,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.54,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.46,
              "transition": "Not_Sexually_Active"
            }
          ]
        },
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 70,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.43,
              "transition": "Sexually_Active"
            },
            {
              "distribution": 0.57,
              "transition": "Not_Sexually_Active"
            }
          ]
        }
      ]
    },
    "Sexually_Active": {
      "type": "SetAttribute",
      "attribute": "sexually_active",
      "value": true,
      "direct_transition": "Old_Age_Check"
    },
    "Not_Sexually_Active": {
      "type": "SetAttribute",
      "attribute": "sexually_active",
      "value": false,
      "direct_transition": "Old_Age_Check"
    },
    "Old_Age_Check": {
      "type": "Simple",
      "remarks": [
        "Once patients reach 70+ years old, their sexual activity no longer changes.",
        "Those who are still sexually active at 70 years old stay that way ;). Most will ",
        "remain sexually inactive for the rest of their lives :| ."
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": ">=",
            "quantity": 70,
            "unit": "years"
          },
          "transition": "Terminal"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "transition": "Male_Sexual_Activity"
        },
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "F"
          },
          "transition": "Female_Sexual_Activity"
        }
      ]
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"sinusitis":{
  "name": "Sinusitis",
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Potential_Onset"
    },
    "Potential_Onset": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "remarks": [
        "Sinusitis, also called rhinosinusitis, affects about 1 in 8 adults annually",
        "http://www.entnet.org/content/sinusitis",
        "Although sinus infections are the fifth leading reason for antibiotic prescriptions, 90 to 98 percent of cases are caused by viruses,",
        "http://www.idsociety.org/2012_Rhinosinusitis_Guidelines/",
        "While 15 percent of the population self-reports chronic sinusitis, only an estimated 2 to 3 percent of doctors’ visits are for the disease",
        "http://labblog.uofmhealth.org/rounds/chronic-sinusitis-rarer-than-most-providers-and-patients-believe"
      ],
      "distributed_transition": [
        {
          "distribution": 0.009,
          "transition": "Viral_Infection_Starts"
        },
        {
          "distribution": 0.0005,
          "transition": "Bacterial_Infection_Starts"
        },
        {
          "distribution": 0.0005,
          "transition": "Inflammation_Starts"
        },
        {
          "distribution": 0.99,
          "transition": "Potential_Onset"
        }
      ]
    },
    "Viral_Infection_Starts": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sinusitis Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "444814009",
          "display": "Viral sinusitis (disorder)"
        }
      ],
      "direct_transition": "Symptom_of_Infection"
    },
    "Bacterial_Infection_Starts": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sinusitis Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "75498004",
          "display": "Acute bacterial sinusitis (disorder)"
        }
      ],
      "direct_transition": "Symptom_of_Infection"
    },
    "Symptom_of_Infection": {
      "type": "Symptom",
      "symptom": "Sinus Pain",
      "range": {
        "low": 50,
        "high": 80
      },
      "direct_transition": "Common_Symptom"
    },
    "Inflammation_Starts": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sinusitis Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "36971009",
          "display": "Sinusitis (disorder)"
        }
      ],
      "direct_transition": "Symptom_of_Inflammation"
    },
    "Symptom_of_Inflammation": {
      "type": "Symptom",
      "symptom": "Sinus Pain",
      "range": {
        "low": 30,
        "high": 50
      },
      "direct_transition": "Common_Symptom"
    },
    "Common_Symptom": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Common_Symptom1"
    },
    "Common_Symptom1": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 25
      },
      "direct_transition": "Common_Symptom2"
    },
    "Common_Symptom2": {
      "type": "Symptom",
      "symptom": "Headache",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom3"
    },
    "Common_Symptom3": {
      "type": "Symptom",
      "symptom": "Nasal Discharge",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom4"
    },
    "Common_Symptom4": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom5"
    },
    "Common_Symptom5": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom6"
    },
    "Common_Symptom6": {
      "type": "Symptom",
      "symptom": "Facial Swelling",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom7"
    },
    "Common_Symptom7": {
      "type": "Symptom",
      "symptom": "Pain with Bright Lights",
      "range": {
        "low": 25,
        "high": 50
      },
      "direct_transition": "Wait_to_see_Dr"
    },
    "Wait_to_see_Dr": {
      "type": "Delay",
      "range": {
        "low": 5,
        "high": 10,
        "unit": "days"
      },
      "direct_transition": "Doctor_Visit"
    },
    "Doctor_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Sinusitis Condition",
      "remarks": [
        "Antibiotics are overprescribed for sinus infections"
      ],
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "distributed_transition": [
        {
          "distribution": 0.8,
          "transition": "End_Encounter"
        },
        {
          "distribution": 0.2,
          "transition": "Prescribe_Antibiotic"
        }
      ]
    },
    "Prescribe_Antibiotic": {
      "type": "MedicationOrder",
      "remarks": [
        "https://www.drugs.com/dosage/amoxicillin.html#Usual_Adult_Dose_for_Sinusitis"
      ],
      "target_encounter": "Doctor_Visit",
      "reason": "Sinusitis Condition",
      "codes": [
        {
          "system": "RxNorm",
          "code": "824184",
          "display": " Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Wait_for_condition_to_resolve"
    },
    "Wait_for_condition_to_resolve": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 4,
        "unit": "weeks"
      },
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "And",
            "conditions": [
              {
                "condition_type": "Active Medication",
                "codes": [
                  {
                    "system": "RxNorm",
                    "code": "824184",
                    "display": " Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "75498004",
                    "display": "Acute bacterial sinusitis (disorder)"
                  }
                ]
              }
            ]
          },
          "transition": "Sinusitis_Ends"
        },
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "444814009",
                "display": "Viral sinusitis (disorder)"
              }
            ]
          },
          "transition": "Sinusitis_Ends"
        },
        {
          "transition": "Chronic_Sinusitis_Continues"
        }
      ]
    },
    "Sinusitis_Ends": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "Sinusitis Condition",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "codes": [
              {
                "system": "RxNorm",
                "code": "824184",
                "display": " Amoxicillin 250 MG / Clavulanate 125 MG [Augmentin]"
              }
            ]
          },
          "transition": "End_Antibiotic"
        },
        {
          "transition": "Symptom1_Subsides"
        }
      ]
    },
    "End_Antibiotic": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Antibiotic",
      "direct_transition": "Symptom1_Subsides"
    },
    "Symptom1_Subsides": {
      "type": "Symptom",
      "symptom": "Sinus Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom2_Subsides"
    },
    "Symptom2_Subsides": {
      "type": "Symptom",
      "symptom": "Nasal Congestion",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom3_Subsides"
    },
    "Symptom3_Subsides": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom4_Subsides"
    },
    "Symptom4_Subsides": {
      "type": "Symptom",
      "symptom": "Headache",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom5_Subsides"
    },
    "Symptom5_Subsides": {
      "type": "Symptom",
      "symptom": "Nasal Discharge",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom6_Subsides"
    },
    "Symptom6_Subsides": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom7_Subsides"
    },
    "Symptom7_Subsides": {
      "type": "Symptom",
      "symptom": "Cough",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom8_Subsides"
    },
    "Symptom8_Subsides": {
      "type": "Symptom",
      "symptom": "Facial Swelling",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom9_Subsides"
    },
    "Symptom9_Subsides": {
      "type": "Symptom",
      "symptom": "Pain with Bright Lights",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Potential_Onset"
    },
    "Chronic_Sinusitis_Continues": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "weeks"
      },
      "distributed_transition": [
        {
          "distribution": 0.1,
          "transition": "Sinusitis_Ends"
        },
        {
          "distribution": 0.75,
          "transition": "Chronic_Sinusitis_Continues"
        },
        {
          "distribution": 0.15,
          "transition": "Chronic_Symptoms_Worsen"
        }
      ]
    },
    "Chronic_Symptoms_Worsen": {
      "type": "Symptom",
      "symptom": "Sinus Pain",
      "range": {
        "low": 70,
        "high": 130
      },
      "direct_transition": "Chronic_Sinusitis_Followup"
    },
    "Chronic_Sinusitis_Followup": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Sinusitis Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "40055000",
                "display": "Chronic sinusitis (disorder)"
              }
            ]
          },
          "distributions": [
            {
              "distribution": 0.95,
              "transition": "Chronic_Sinusitis_Followup_without_action"
            },
            {
              "distribution": 0.05,
              "transition": "Sinus_Surgery"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.95,
              "transition": "Diagnose_Chronic_Sinusitis"
            },
            {
              "distribution": 0.05,
              "transition": "Sinus_Surgery"
            }
          ]
        }
      ]
    },
    "Diagnose_Chronic_Sinusitis": {
      "type": "ConditionOnset",
      "target_encounter": "Chronic_Sinusitis_Followup",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "40055000",
          "display": "Chronic sinusitis (disorder)"
        }
      ],
      "direct_transition": "End_Chronic_Followup"
    },
    "End_Chronic_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Chronic_Sinusitis_Continues"
    },
    "Sinus_Surgery": {
      "type": "Procedure",
      "target_encounter": "Chronic_Sinusitis_Followup",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "112790001",
          "display": "Nasal sinus endoscopy (procedure)"
        }
      ],
      "direct_transition": "End_Surgery_Encounter"
    },
    "End_Surgery_Encounter": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "40055000",
                "display": "Chronic sinusitis (disorder)"
              }
            ]
          },
          "transition": "Chronic_Sinusisitis_Ends"
        },
        {
          "transition": "Sinusitis_Ends"
        }
      ]
    },
    "Chronic_Sinusisitis_Ends": {
      "type": "ConditionEnd",
      "condition_onset": "Diagnose_Chronic_Sinusitis",
      "direct_transition": "Sinusitis_Ends"
    },
    "Chronic_Sinusitis_Followup_without_action": {
      "type": "EncounterEnd",
      "direct_transition": "Chronic_Sinusitis_Continues"
    }
  }
}
,
"sore_throat":{
  "name": "Sore Throat",
  "remarks": [
    "Covers both bacterial and viral sore throat. Focuses on strep for bacterial, although gonorrhea and syphilis are also causes.",
    "Viral sore throats are caused by cold, flu, coxsackie virus, mononucleosis.",
    "Primary references:",
    "http://www.medicinenet.com/sore_throat_virus_or_strep/views.htm",
    "http://emedicine.medscape.com/article/225362-overview"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Potential_Infection"
    },
    "Potential_Infection": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "remarks": [
        "Each year, pharyngitis is responsible for more than 40 million visits to health care providers. ",
        "Most children and adults experience 3-5 viral upper respiratory tract infections (including pharyngitis) per year.",
        "Viral pharyngitis affects both children and adults, but it is more common in children.",
        "Approximately 10% of children seen by medical care providers each year have pharyngitis, and 25-50% of these children have GABHS pharyngitis.",
        "only about 5%-10% of sore throats are caused by a bacterial infection"
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 15,
            "unit": "years"
          },
          "distributions": [
            {
              "distribution": 0.00583,
              "transition": "Acquire_Viral_Infection"
            },
            {
              "distribution": 0.00292,
              "transition": "Acquire_Bacterial_Infection",
              "remarks": [
                "Bacterial is more common in children than in adults. Assume viral is only 2x as likely as bacterial for children"
              ]
            },
            {
              "distribution": 0.9913,
              "transition": "Potential_Infection"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.005,
              "transition": "Acquire_Viral_Infection"
            },
            {
              "distribution": 0.000875,
              "transition": "Acquire_Bacterial_Infection",
              "remarks": [
                "[in adults] only about 5%-10% of sore throats are caused by a bacterial infection"
              ]
            },
            {
              "distribution": 0.9942,
              "transition": "Potential_Infection"
            }
          ]
        }
      ]
    },
    "Acquire_Viral_Infection": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sore Throat Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "195662009",
          "display": "Acute viral pharyngitis (disorder)"
        }
      ],
      "direct_transition": "Viral_Symptom_1"
    },
    "Viral_Symptom_1": {
      "type": "Symptom",
      "symptom": "Cough",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Viral_Symptom_2"
    },
    "Viral_Symptom_2": {
      "type": "Symptom",
      "symptom": "Swollen Lymph Nodes",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Viral_Symptom_3"
    },
    "Viral_Symptom_3": {
      "type": "Symptom",
      "symptom": "Swollen Tonsils",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_1"
    },
    "Common_Symptom_1": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_2"
    },
    "Common_Symptom_2": {
      "type": "Symptom",
      "symptom": "Difficulty Swallowing",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_3"
    },
    "Common_Symptom_3": {
      "type": "Symptom",
      "symptom": "Runny/Stuffy Nose",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_4"
    },
    "Common_Symptom_4": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_5"
    },
    "Common_Symptom_5": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_6"
    },
    "Common_Symptom_6": {
      "type": "Symptom",
      "symptom": "Body Aches",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Common_Symptom_7"
    },
    "Common_Symptom_7": {
      "type": "Symptom",
      "symptom": "Decreased Appetite",
      "range": {
        "low": 0,
        "high": 50
      },
      "direct_transition": "Symptoms_dont_resolve"
    },
    "Acquire_Bacterial_Infection": {
      "type": "ConditionOnset",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sore Throat Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "43878008",
          "display": "Streptococcal sore throat (disorder)"
        }
      ],
      "direct_transition": "Bacterial_Symptom_1"
    },
    "Bacterial_Symptom_1": {
      "type": "Symptom",
      "symptom": "Cough",
      "exact": {
        "quantity": 0
      },
      "remarks": [
        "Strep generally does not present with cough"
      ],
      "direct_transition": "Bacterial_Symptom_2"
    },
    "Bacterial_Symptom_2": {
      "type": "Symptom",
      "symptom": "Swollen Lymph Nodes",
      "range": {
        "low": 20,
        "high": 70
      },
      "remarks": [
        "Strep generally presents with swollen lymph nodes"
      ],
      "direct_transition": "Bacterial_Symptom_3"
    },
    "Bacterial_Symptom_3": {
      "type": "Symptom",
      "symptom": "Swollen Tonsils",
      "range": {
        "low": 20,
        "high": 70
      },
      "direct_transition": "Common_Symptom_1"
    },
    "Symptoms_dont_resolve": {
      "type": "Delay",
      "range": {
        "low": 1,
        "high": 5,
        "unit": "days"
      },
      "direct_transition": "Doctor_Visit"
    },
    "Doctor_Visit": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "Sore Throat Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "43878008",
                "display": "Streptococcal sore throat (disorder)"
              }
            ]
          },
          "transition": "Take_Temperature_High",
          "remarks": [
            "high fever is a hallmark of strep throat  http://www.webmd.com/cold-and-flu/news/20131104/two-questions-may-rule-out-strep-throat"
          ]
        },
        {
          "transition": "Take_Temperature_Low"
        }
      ]
    },
    "Take_Temperature_High": {
      "type": "Observation",
      "category": "vital-signs",
      "range": {
        "low": 37.2,
        "high": 39.4
      },
      "remarks": [
        "37.2 - 39.4 Celsius == 99 - 103 Fahrenheit"
      ],
      "unit": "Cel",
      "codes": [
        {
          "system": "LOINC",
          "code": "8331-1",
          "display": "Oral temperature"
        }
      ],
      "direct_transition": "Determine_if_Bacterial"
    },
    "Take_Temperature_Low": {
      "type": "Observation",
      "category": "vital-signs",
      "range": {
        "low": 37,
        "high": 38
      },
      "remarks": [
        "37.0 - 38.0 Celsius == 98.6 - 100.4 Fahrenheit"
      ],
      "unit": "Cel",
      "codes": [
        {
          "system": "LOINC",
          "code": "8331-1",
          "display": "Oral temperature"
        }
      ],
      "direct_transition": "Determine_if_Bacterial"
    },
    "Determine_if_Bacterial": {
      "type": "Simple",
      "remarks": [
        "the Centor criteria are used to determine if a sore throat is bacterial",
        "http://www.mdcalc.com/modified-centor-score-for-strep-pharyngitis/",
        "modified slightly here to account for our simpler logic",
        "(we can't do -1 for age > 44 so we do +1 for age <= 44, and require an extra +1)"
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "At Least",
            "minimum": 5,
            "conditions": [
              {
                "condition_type": "Symptom",
                "symptom": "Cough",
                "operator": "<",
                "value": 30
              },
              {
                "condition_type": "Symptom",
                "symptom": "Swollen Lymph Nodes",
                "operator": ">",
                "value": 30
              },
              {
                "condition_type": "Symptom",
                "symptom": "Swollen Tonsils",
                "operator": ">",
                "value": 30
              },
              {
                "condition_type": "Observation",
                "codes": [
                  {
                    "system": "LOINC",
                    "code": "8331-1",
                    "display": "Oral temperature"
                  }
                ],
                "operator": ">",
                "value": 38
              },
              {
                "condition_type": "Age",
                "operator": "<",
                "quantity": 15,
                "unit": "years"
              },
              {
                "condition_type": "Age",
                "operator": "<=",
                "quantity": 44,
                "unit": "years"
              }
            ]
          },
          "transition": "Prescribe_Antibiotics"
        },
        {
          "condition": {
            "condition_type": "At Least",
            "minimum": 3,
            "conditions": [
              {
                "condition_type": "Symptom",
                "symptom": "Cough",
                "operator": "<",
                "value": 30
              },
              {
                "condition_type": "Symptom",
                "symptom": "Swollen Lymph Nodes",
                "operator": ">",
                "value": 30
              },
              {
                "condition_type": "Symptom",
                "symptom": "Swollen Tonsils",
                "operator": ">",
                "value": 30
              },
              {
                "condition_type": "Observation",
                "codes": [
                  {
                    "system": "LOINC",
                    "code": "8331-1",
                    "display": "Oral temperature"
                  }
                ],
                "operator": ">",
                "value": 38
              },
              {
                "condition_type": "Age",
                "operator": "<",
                "quantity": 15,
                "unit": "years"
              },
              {
                "condition_type": "Age",
                "operator": "<=",
                "quantity": 44,
                "unit": "years"
              }
            ]
          },
          "transition": "Throat_Culture"
        },
        {
          "transition": "End_Encounter"
        }
      ]
    },
    "Prescribe_Antibiotics": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 18,
            "unit": "years"
          },
          "transition": "Prescribe_Antibiotics_Child"
        },
        {
          "transition": "Prescribe_Antibiotics_Adult"
        }
      ]
    },
    "Prescribe_Antibiotics_Child": {
      "type": "MedicationOrder",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sore Throat Antibiotic",
      "reason": "Sore Throat Condition",
      "remarks": [
        "if we eventually add Penicillin allergies, we'll need a conditional to prescribe amoxicillin instead"
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "834060",
          "display": "Penicillin V Potassium 250 MG"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Prescribe_Antibiotics_Adult": {
      "type": "MedicationOrder",
      "target_encounter": "Doctor_Visit",
      "assign_to_attribute": "Sore Throat Antibiotic",
      "reason": "Sore Throat Condition",
      "codes": [
        {
          "system": "RxNorm",
          "code": "834101",
          "display": "Penicillin V Potassium 500 MG"
        }
      ],
      "direct_transition": "End_Encounter"
    },
    "Throat_Culture": {
      "type": "Procedure",
      "target_encounter": "Doctor_Visit",
      "reason": "Sore Throat Condition",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "117015009",
          "display": "Throat culture (procedure) "
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "43878008",
                "display": "Streptococcal sore throat (disorder)"
              }
            ]
          },
          "transition": "Prescribe_Antibiotics",
          "remarks": [
            "assuming here for simplicity that the test is 100% accurate. real world it's more like 90-95%"
          ]
        },
        {
          "transition": "End_Encounter"
        }
      ]
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Time_Passes"
    },
    "Time_Passes": {
      "type": "Delay",
      "range": {
        "low": 7,
        "high": 14,
        "unit": "days"
      },
      "direct_transition": "Symptom_1_Ends"
    },
    "Symptom_1_Ends": {
      "type": "Symptom",
      "symptom": "Cough",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_2_Ends"
    },
    "Symptom_2_Ends": {
      "type": "Symptom",
      "symptom": "Swollen Lymph Nodes",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_3_Ends"
    },
    "Symptom_3_Ends": {
      "type": "Symptom",
      "symptom": "Swollen Tonsils",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_4_Ends"
    },
    "Symptom_4_Ends": {
      "type": "Symptom",
      "symptom": "Difficulty Swallowing",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_5_Ends"
    },
    "Symptom_5_Ends": {
      "type": "Symptom",
      "symptom": "Sore Throat",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_6_Ends"
    },
    "Symptom_6_Ends": {
      "type": "Symptom",
      "symptom": "Runny/Stuffy Nose",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_7_Ends"
    },
    "Symptom_7_Ends": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_8_Ends"
    },
    "Symptom_8_Ends": {
      "type": "Symptom",
      "symptom": "Fatigue",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_9_Ends"
    },
    "Symptom_9_Ends": {
      "type": "Symptom",
      "symptom": "Body Aches",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Symptom_10_Ends"
    },
    "Symptom_10_Ends": {
      "type": "Symptom",
      "symptom": "Decreased Appetite",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "Condition_Resolves"
    },
    "Condition_Resolves": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "Sore Throat Condition",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Medication",
            "referenced_by_attribute": "Sore Throat Antibiotic"
          },
          "transition": "End_Antibiotics"
        },
        {
          "transition": "Potential_Infection"
        }
      ]
    },
    "End_Antibiotics": {
      "type": "MedicationEnd",
      "referenced_by_attribute": "Sore Throat Antibiotic",
      "direct_transition": "Potential_Infection"
    }
  }
}
,
"total_joint_replacement/functional_status_assessments":{
  "name": "Functional Status Assessments",
  "remarks": [
    "This is a submodule that includes the possible assessments a patient will go through prior to and following either a total knee replacement or a total hip replacement.\n"
  ],
  "states": {
    "KOOS_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "72091-2",
          "display": "Knee injury and Osteoarthritis Outcome Score [KOOS]"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72101-9",
              "display": "Symptoms score [KOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72102-7",
              "display": "Pain score [KOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72100-1",
              "display": "Activities of daily living score [KOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72099-5",
              "display": "Sport-recreation score [KOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72098-7",
              "display": "Quality of life score [KOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        }
      ],
      "direct_transition": "KOOS_Attribute_Set",
      "remarks": [
        "Five different subscales are scored separately: KOOS Pain (9 items); KOOS Symptoms (7 items); KOOS ADL (17 items); KOOS Sport/Rec (5 items); KOOS QOL (4 items). Each item has five possible answer options scored from 0 (No Problems) to 4 (Extreme Problems), and the scores are transformed to a 0–100 scale, with zero representing extreme knee problems and 100 representing no knee problems.",
        "http://www.koos.nu"
      ]
    },
    "PROMIS10_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "61576-5",
          "display": "PROMIS short form - global - version 1.1"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71972-4",
              "display": "PROMIS-10 Global Physical Health (GPH) score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71970-8",
              "display": "PROMIS-10 Global Mental Health (GMH) score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        }
      ],
      "direct_transition": "PROMIS10_Attribute_Set",
      "remarks": [
        "Two different subscales are scored separately: Global Mental Health and Global Physical Health. Each have a score between 4 - 20."
      ]
    },
    "HOOS_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "72092-0",
          "display": "Hip Dysfunction and Osteoarthritis Outcome Score [HOOS]"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72096-1",
              "display": "Symptoms score [HOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72097-9",
              "display": "Pain score [HOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72095-3",
              "display": "Activities of daily living score [HOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72094-6",
              "display": "Sport-recreation score [HOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72093-8",
              "display": "Quality of life score [HOOS]"
            }
          ],
          "range": {
            "low": 0,
            "high": 100
          }
        }
      ],
      "direct_transition": "HOOS_Attribute_Set",
      "remarks": [
        "Five different subscales are scored separately: HOOS Pain (9 items); HOOS Symptoms (7 items); HOOS ADL (17 items); HOOS Sport/Rec (5 items); HOOS QOL (4 items). The scores are transformed to a 0–100 scale, with zero representing extreme knee problems and 100 representing no knee problems.",
        "http://www.koos.nu"
      ]
    },
    "Joint_Replacement_Assessment_Terminal": {
      "type": "Terminal"
    },
    "VR36_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "71933-6",
          "display": "Veterans Rand health survey - 36 item (VR-36)"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71973-2",
              "display": "VR-36 Mental health (MH) score - oblique method"
            }
          ],
          "range": {
            "low": 5,
            "high": 30
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71974-0",
              "display": "VR-36 Role emotion (RE) score - oblique method"
            }
          ],
          "range": {
            "low": 3,
            "high": 15
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71975-7",
              "display": "VR-36 Social functioning (SF) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 10
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71976-5",
              "display": "VR-36 Vitality (VT) score - oblique method"
            }
          ],
          "range": {
            "low": 4,
            "high": 24
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71977-3",
              "display": "VR-36 General health (GH) score - oblique method"
            }
          ],
          "range": {
            "low": 5,
            "high": 25
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71978-1",
              "display": "VR-36 Bodily pain (BP) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 12
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71979-9",
              "display": "VR-36 Role physical (RP) score - oblique method"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71980-7",
              "display": "VR-36 Physical functioning (PF) score - oblique method"
            }
          ],
          "range": {
            "low": 10,
            "high": 30
          }
        }
      ],
      "direct_transition": "VR36_Attribute_Set",
      "remarks": [
        "Eight different subscales are scored separately: Mental Health, Role Emotion, Social Functioning, Vitality, General Health, Bodily Pain, Role Physical, and Physical Functioning. Each have a score between 4 - 20."
      ]
    },
    "PROMIS29_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "62337-1",
          "display": "PROMIS item bank - 29 profile"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71956-7",
              "display": "PROMIS-29 Sleep disturbance score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71958-3",
              "display": "PROMIS-29 Satisfaction with participation in social roles score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71960-9",
              "display": "PROMIS-29 Physical function score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71962-5",
              "display": "PROMIS-29 Pain interference score"
            }
          ],
          "exact": {
            "quantity": 1
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71964-1",
              "display": "PROMIS-29 Fatigue score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71966-6",
              "display": "PROMIS-29 Depression score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "71968-2",
              "display": "PROMIS-29 Anxiety score"
            }
          ],
          "range": {
            "low": 4,
            "high": 20
          }
        }
      ],
      "direct_transition": "PROMIS29_Attribute_Set",
      "remarks": [
        "Seven different subscales are scored separately: Sleep Disturbance, Satisfaction with Participation in Social Roles,",
        "Physical Function, Pain Interference, Fatigue, Depression, and Anxiety. Each have a score between 4 - 20."
      ]
    },
    "Initial": {
      "type": "Initial",
      "conditional_transition": [
        {
          "transition": "Perform_Functional_Status_Assessment_Knee",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "knee"
          }
        },
        {
          "transition": "Perform_Functional_Status_Assessment_Hip",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "hip"
          }
        },
        {
          "transition": "Joint_Replacement_Assessment_Terminal"
        }
      ]
    },
    "Perform_Functional_Status_Assessment_Knee": {
      "type": "Simple",
      "remarks": [
        "Possible assessment options obtained from:",
        "https://ecqi.healthit.gov/ecqm/measures/cms066v7"
      ],
      "conditional_transition": [
        {
          "transition": "KOOS_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "KOOS"
          }
        },
        {
          "transition": "PROMIS10_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "PROMIS-10"
          }
        },
        {
          "transition": "VR12_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "VR-12"
          }
        },
        {
          "transition": "First_FSA_Knee"
        }
      ]
    },
    "Perform_Functional_Status_Assessment_Hip": {
      "type": "Simple",
      "remarks": [
        "Possible assessment options obtained from:",
        "https://ecqi.healthit.gov/ecqm/measures/cms056v5"
      ],
      "conditional_transition": [
        {
          "transition": "HOOS_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "HOOS"
          }
        },
        {
          "transition": "PROMIS10_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "PROMIS-10"
          }
        },
        {
          "transition": "PROMIS29_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "PROMIS-29"
          }
        },
        {
          "transition": "VR12_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "VR-12"
          }
        },
        {
          "transition": "VR36_Total_Assessment",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "assessment_done",
            "operator": "==",
            "value": "VR-36"
          }
        },
        {
          "transition": "First_FSA_Hip"
        }
      ]
    },
    "VR12_Total_Assessment": {
      "type": "MultiObservation",
      "category": "survey",
      "codes": [
        {
          "system": "LOINC",
          "code": "71934-4",
          "display": "Veterans Rand health survey - 12 item (VR-12)"
        }
      ],
      "observations": [
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72009-4",
              "display": "VR-12 Mental health (MH) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 12
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72010-2",
              "display": "VR-12 Role emotion (RE) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 10
          }
        },
        {
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72011-0",
              "display": "VR-12 Social functioning (SF) score - oblique method"
            }
          ],
          "range": {
            "low": 1,
            "high": 5
          }
        },
        {
          "type": "Observation",
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72012-8",
              "display": "VR-12 Vitality (VT) score - oblique method"
            }
          ],
          "range": {
            "low": 1,
            "high": 6
          }
        },
        {
          "type": "Observation",
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72013-6",
              "display": "VR-12 General health (GH) score - oblique method"
            }
          ],
          "range": {
            "low": 1,
            "high": 5
          }
        },
        {
          "type": "Observation",
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72014-4",
              "display": "VR-12 Bodily pain (BP) score - oblique method"
            }
          ],
          "range": {
            "low": 1,
            "high": 5
          }
        },
        {
          "type": "Observation",
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72015-1",
              "display": "VR-12 Role physical (RP) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 10
          }
        },
        {
          "type": "Observation",
          "category": "survey",
          "unit": "units",
          "codes": [
            {
              "system": "LOINC",
              "code": "72016-9",
              "display": "VR-12 Physical functioning (PF) score - oblique method"
            }
          ],
          "range": {
            "low": 2,
            "high": 6
          }
        }
      ],
      "direct_transition": "VR12_Attribute_Set",
      "remarks": [
        "Eight different subscales are scored separately: Mental Health, Role Emotion, Social Functioning, Vitality, General Health, Bodily Pain, Role Physical, and Physical Functioning. Each have a score between 4 - 20."
      ]
    },
    "KOOS_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "KOOS"
    },
    "PROMIS10_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "PROMIS-10"
    },
    "PROMIS29_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "PROMIS-29"
    },
    "VR12_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "VR-12"
    },
    "VR36_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "VR-36"
    },
    "HOOS_Attribute_Set": {
      "type": "SetAttribute",
      "attribute": "assessment_done",
      "direct_transition": "FSA_Performed",
      "value": "HOOS"
    },
    "FSA_Performed": {
      "type": "Simple",
      "direct_transition": "Joint_Replacement_Assessment_Terminal"
    },
    "First_FSA_Knee": {
      "type": "Simple",
      "distributed_transition": [
        {
          "transition": "KOOS_Total_Assessment",
          "distribution": 0.34
        },
        {
          "transition": "PROMIS10_Total_Assessment",
          "distribution": 0.33
        },
        {
          "transition": "VR12_Total_Assessment",
          "distribution": 0.33
        }
      ]
    },
    "First_FSA_Hip": {
      "type": "Simple",
      "distributed_transition": [
        {
          "transition": "HOOS_Total_Assessment",
          "distribution": 0.2
        },
        {
          "transition": "PROMIS10_Total_Assessment",
          "distribution": 0.2
        },
        {
          "transition": "PROMIS29_Total_Assessment",
          "distribution": 0.2
        },
        {
          "transition": "VR12_Total_Assessment",
          "distribution": 0.2
        },
        {
          "transition": "VR36_Total_Assessment",
          "distribution": 0.2
        }
      ]
    }
  }
}
,
"total_joint_replacement":{
  "name": "Total Joint Replacement",
  "remarks": [
    "This is not a standalone module. Currently joint replacements are triggered by ",
    "the 'joint_replacement' attribute set by the osteoarthritis and rheumatoid ",
    "arthritis modules. Possible values for the 'joint_replacement' attribute are ",
    "'hip' and 'knee'."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Joint_Replacement_Guard"
    },
    "Joint_Replacement_Guard": {
      "type": "Guard",
      "remarks": [
        "As a side note, knee and hip replacements weren't available before the late ",
        "1960's. However, since we're only applying these surgeries to subjects 50 years ",
        "or older they should not occur prior to the late 1960's."
      ],
      "allow": {
        "condition_type": "And",
        "conditions": [
          {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "is not nil"
          },
          {
            "condition_type": "Age",
            "operator": ">",
            "quantity": 50,
            "unit": "years"
          }
        ]
      },
      "direct_transition": "Delay_For_Joint_Replacement"
    },
    "Delay_For_Joint_Replacement": {
      "type": "Delay",
      "remarks": [
        "Added to stagger the date/time of the joint replacements."
      ],
      "range": {
        "low": 0,
        "high": 12,
        "unit": "months"
      },
      "direct_transition": "Pre_Procedure_Encounter"
    },
    "Joint_Replacement_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "183495009",
          "display": "Non-urgent orthopedic admission"
        }
      ],
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "knee"
          },
          "transition": "Knee_Replacement_Procedure"
        },
        {
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "hip"
          },
          "transition": "Hip_Replacement_Procedure"
        },
        {
          "transition": "Terminal"
        }
      ]
    },
    "Knee_Replacement_Procedure": {
      "type": "Procedure",
      "target_encounter": "Joint_Replacement_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "609588000",
          "display": "Total knee replacement"
        }
      ],
      "direct_transition": "Post_Op_CarePlan"
    },
    "Hip_Replacement_Procedure": {
      "type": "Procedure",
      "target_encounter": "Joint_Replacement_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "52734007",
          "display": "Total replacement of hip"
        }
      ],
      "direct_transition": "Post_Op_CarePlan"
    },
    "Post_Op_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "Joint_Replacement_Encounter",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "781831000000109",
          "display": "Major surgery care management"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "91251008",
          "display": "Physical therapy procedure"
        },
        {
          "system": "SNOMED-CT",
          "code": "229070002",
          "display": "Stretching exercises"
        }
      ],
      "direct_transition": "Post_Op_Prescribe_Pain_Reliever"
    },
    "Post_Op_Prescribe_Pain_Reliever": {
      "type": "CallSubmodule",
      "submodule": "medications/moderate_opioid_pain_reliever",
      "direct_transition": "In_Hospital_Post_Surgery_Recovery"
    },
    "In_Hospital_Post_Surgery_Recovery": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 5,
        "unit": "days"
      },
      "direct_transition": "End_Encounter"
    },
    "End_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_For_Recovery"
    },
    "Delay_For_Recovery": {
      "type": "Delay",
      "exact": {
        "quantity": 1,
        "unit": "months"
      },
      "direct_transition": "End_Post_Op_CarePlan"
    },
    "End_Post_Op_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "Post_Op_CarePlan",
      "conditional_transition": [
        {
          "transition": "Delay_For_Post_Assessment_Knee",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "knee"
          }
        },
        {
          "transition": "Delay_For_Post_Assessment_Hip",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "hip"
          }
        }
      ]
    },
    "Delay_Until_New_Replacement_Needed": {
      "type": "Delay",
      "remarks": [
        "Source: http://www.aahks.org/care-for-hips-and-knees/do-i-need-a-joint-replacement/total-knee-replacement/",
        "Annual failure rate of 0.5 - 1%, or about a 3.7% chance every 5 years. Favoring the ",
        "5-years timestep to reduce the number of iterations in this loop."
      ],
      "exact": {
        "quantity": 5,
        "unit": "years"
      },
      "distributed_transition": [
        {
          "distribution": 0.037,
          "transition": "Joint_Replacement_Encounter"
        },
        {
          "distribution": 0.963,
          "transition": "Delay_Until_New_Replacement_Needed"
        }
      ]
    },
    "Terminal": {
      "type": "Terminal"
    },
    "Delay_After_Assessments": {
      "type": "Delay",
      "direct_transition": "Joint_Replacement_Encounter",
      "range": {
        "low": 0,
        "high": 90,
        "unit": "days"
      }
    },
    "Delay_After_Assessments_2": {
      "type": "Delay",
      "direct_transition": "Joint_Replacement_Encounter",
      "range": {
        "low": 0,
        "high": 180,
        "unit": "days"
      }
    },
    "Pre_Procedure_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 185349003,
          "display": "Encounter for check up (procedure)"
        }
      ],
      "direct_transition": "Functional_Status_Assessments"
    },
    "Pre_Procedure_Encounter_End": {
      "type": "EncounterEnd",
      "conditional_transition": [
        {
          "transition": "Delay_After_Assessments",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "knee"
          }
        },
        {
          "transition": "Delay_After_Assessments_2",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "joint_replacement",
            "operator": "==",
            "value": "hip"
          }
        }
      ]
    },
    "Functional_Status_Assessments": {
      "type": "CallSubmodule",
      "submodule": "total_joint_replacement/functional_status_assessments",
      "direct_transition": "Pre_Procedure_Encounter_End"
    },
    "Post_Procedure_Encounter": {
      "type": "Encounter",
      "encounter_class": "inpatient",
      "reason": "",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": 185389009,
          "display": "Follow-up visit (procedure)"
        }
      ],
      "direct_transition": "Functional_Status_Assessments_2"
    },
    "Delay_For_Post_Assessment_Hip": {
      "type": "Delay",
      "direct_transition": "Post_Procedure_Encounter",
      "range": {
        "low": 30,
        "high": 150,
        "unit": "days"
      },
      "remarks": [
        "Obtained from:",
        "https://ecqi.healthit.gov/system/files/ecqm/measures/CMS56v5_2.html",
        "1 month recovery subtracted from overall delay time"
      ]
    },
    "Delay_For_Post_Assessment_Knee": {
      "type": "Delay",
      "direct_transition": "Post_Procedure_Encounter",
      "range": {
        "low": 240,
        "high": 335,
        "unit": "days"
      },
      "remarks": [
        "Obtained from:",
        "https://ecqi.healthit.gov/ecqm/measures/cms066v7",
        "1 month recovery time subtracted from overall delay time",
        ""
      ]
    },
    "Functional_Status_Assessments_2": {
      "type": "CallSubmodule",
      "submodule": "total_joint_replacement/functional_status_assessments",
      "direct_transition": "Post_Procedure_Encounter_End"
    },
    "Post_Procedure_Encounter_End": {
      "type": "EncounterEnd",
      "direct_transition": "Delay_Until_New_Replacement_Needed"
    }
  }
}
,
"urinary_tract_infections":{
  "name": "Urinary Tract Infections",
  "remarks": [
    "These are quite common in women but rare in men. Most of the incidence statistics I got from the NIH: ",
    "https://www.nichd.nih.gov/health/topics/urinary/conditioninfo/Pages/affected.aspx",
    "Incidence for recurrent UTIs: ",
    "https://www.kidney.org/sites/default/files/uti.pdf",
    "Incidence for men: ",
    "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/urinary-tract-infections-uti",
    "UTIs are practically nonexistent in young men but can occur in elderly men.",
    "The NIH claims 8.1M doctor visits each year are because of UTIs. However, some of these could be recurrent ",
    "visits for the same woman. Estimates show about a quarter of UTIs are recurring, so more realistically ",
    "about 75% of those visits to the physician are unique patients. I therefore estimate (0.75 * 8.1M) = 6.08M ",
    "unique patients get UTIs every year, or about 1.9% of the population (out of 320M Americans in 2016).",
    "Several risk factors also increase the likelihood of a UTI including diabetes and obseity. Obesity doubles ",
    "the risk for a UTI in women. For now these are not represented in this module."
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "remarks": [
        "======================================================================",
        " INCIDENCE                                                            ",
        "======================================================================",
        "https://www.kidney.org/sites/default/files/uti.pdf:",
        " ''One in five women will have at least one UTI in her lifetime.      ",
        "   Nearly 20 percent of women who have a UTI will have another,       ",
        "   and 30 percent of those will have yet another. Of this last        ",
        "   group, 80 percent will have recurrences.''                         ",
        "https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/urinary-tract-infections-uti:",
        " ''Around one in two women and one in 20 men will get a UTI in their lifetime'' "
      ],
      "complex_transition": [
        {
          "condition": {
            "condition_type": "Gender",
            "gender": "M"
          },
          "distributions": [
            {
              "distribution": 0.95,
              "transition": "Terminal",
              "remarks": [
                "Most men will never get a UTI."
              ]
            },
            {
              "distribution": 0.05,
              "transition": "Wait_For_Old_Age"
            }
          ]
        },
        {
          "distributions": [
            {
              "distribution": 0.5,
              "transition": "Delay_Until_Right_Age",
              "remarks": [
                "1 in 2 women gets a UTI."
              ]
            },
            {
              "distribution": 0.5,
              "transition": "Terminal"
            }
          ]
        }
      ]
    },
    "Wait_For_Old_Age": {
      "type": "Guard",
      "allow": {
        "condition_type": "Age",
        "operator": ">",
        "quantity": 55,
        "unit": "years"
      },
      "direct_transition": "Wait_For_Next_UTI"
    },
    "Delay_Until_Right_Age": {
      "type": "Delay",
      "remarks": [
        "Women may start getting UTIs at different points in their life."
      ],
      "range": {
        "low": 15,
        "high": 55,
        "unit": "years"
      },
      "direct_transition": "Wait_For_Next_UTI"
    },
    "Wait_For_Next_UTI": {
      "type": "Delay",
      "remarks": [
        "======================================================================",
        " URINARY TRACT INFECTION                                              ",
        "======================================================================",
        "This is most commonly a bacterial infection of the urethra or bladder ",
        "(urethritis and cystitis, respectively). In rare cases this could also ",
        "be an infection of the kidneys (pyelonephritis)."
      ],
      "range": {
        "low": 1,
        "high": 7,
        "unit": "years"
      },
      "direct_transition": "Urinary_Tract_Infection"
    },
    "Urinary_Tract_Infection": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.6,
          "transition": "Urethritis"
        },
        {
          "distribution": 0.39,
          "transition": "Cystitis"
        },
        {
          "distribution": 0.01,
          "transition": "Pyelonephritis"
        }
      ]
    },
    "Urethritis": {
      "type": "ConditionOnset",
      "target_encounter": "UTI_Diagnosis",
      "assign_to_attribute": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "301011002",
          "display": "Escherichia coli urinary tract infection"
        }
      ],
      "direct_transition": "UTI_Diagnosis"
    },
    "Cystitis": {
      "type": "ConditionOnset",
      "target_encounter": "UTI_Diagnosis",
      "assign_to_attribute": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "38822007",
          "display": "Cystitis"
        }
      ],
      "direct_transition": "UTI_Diagnosis"
    },
    "Pyelonephritis": {
      "type": "ConditionOnset",
      "target_encounter": "UTI_Diagnosis",
      "assign_to_attribute": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "45816000",
          "display": "Pyelonephritis"
        }
      ],
      "direct_transition": "UTI_Diagnosis"
    },
    "UTI_Diagnosis": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "UTI_Symptom1"
    },
    "UTI_Symptom1": {
      "type": "Symptom",
      "symptom": "Dysuria",
      "range": {
        "low": 5,
        "high": 25
      },
      "direct_transition": "UTI_Symptom2"
    },
    "UTI_Symptom2": {
      "type": "Symptom",
      "symptom": "Urgent Desire to Urinate",
      "range": {
        "low": 5,
        "high": 25
      },
      "direct_transition": "UTI_Symptom3"
    },
    "UTI_Symptom3": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "range": {
        "low": 5,
        "high": 25
      },
      "direct_transition": "UTI_Symptom4"
    },
    "UTI_Symptom4": {
      "type": "Symptom",
      "symptom": "Discolored Urine",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "UTI_Symptom5"
    },
    "UTI_Symptom5": {
      "type": "Symptom",
      "symptom": "Odor of Urine",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "UTI_Symptom6"
    },
    "UTI_Symptom6": {
      "type": "Symptom",
      "symptom": "Pelvic Pain",
      "range": {
        "low": 0,
        "high": 15
      },
      "direct_transition": "UTI_Symptom7"
    },
    "UTI_Symptom7": {
      "type": "Symptom",
      "symptom": "Fever",
      "range": {
        "low": 0,
        "high": 10
      },
      "direct_transition": "Symptom_Period"
    },
    "Symptom_Period": {
      "type": "Delay",
      "range": {
        "low": 24,
        "high": 48,
        "unit": "days"
      },
      "direct_transition": "Prescribe_UTI_Antibiotic"
    },
    "Prescribe_UTI_Antibiotic": {
      "type": "MedicationOrder",
      "target_encounter": "UTI_Diagnosis",
      "reason": "uti",
      "remarks": [
        "This is an antibiotic commonly prescribed for UTIs."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "568530",
          "display": "Nitrofurantoin 5 MG/ML [Furadantin]"
        }
      ],
      "direct_transition": "Prescribe_OTC_Painkiller_For_UTIs"
    },
    "Prescribe_OTC_Painkiller_For_UTIs": {
      "type": "MedicationOrder",
      "target_encounter": "UTI_Diagnosis",
      "reason": "uti",
      "remarks": [
        "This is an OTC pain medication specifically for the urinary tract."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1094108",
          "display": "Phenazopyridine hydrochloride 100 MG [Pyridium]"
        }
      ],
      "direct_transition": "UTI_CarePlan"
    },
    "UTI_CarePlan": {
      "type": "CarePlanStart",
      "target_encounter": "UTI_Diagnosis",
      "reason": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "869761000000107",
          "display": "Urinary tract infection care"
        }
      ],
      "activities": [
        {
          "system": "SNOMED-CT",
          "code": "223472008",
          "display": "Discussion about hygiene"
        },
        {
          "system": "SNOMED-CT",
          "code": "171245007",
          "display": "Urine screening"
        }
      ],
      "direct_transition": "End_Diagnosis_Encounter"
    },
    "End_Diagnosis_Encounter": {
      "type": "EncounterEnd",
      "direct_transition": "Take_Antibiotics"
    },
    "Take_Antibiotics": {
      "type": "Delay",
      "exact": {
        "quantity": 7,
        "unit": "days"
      },
      "direct_transition": "End_First_Round_Of_Antibiotics"
    },
    "End_First_Round_Of_Antibiotics": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_UTI_Antibiotic",
      "distributed_transition": [
        {
          "distribution": 0.15,
          "transition": "Followup_Encounter"
        },
        {
          "distribution": 0.85,
          "transition": "End_Urinary_Tract_Infection"
        }
      ]
    },
    "Followup_Encounter": {
      "type": "Encounter",
      "encounter_class": "ambulatory",
      "reason": "uti",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "185345009",
          "display": "Encounter for symptom"
        }
      ],
      "direct_transition": "Prescribe_Second_Round_Of_Antibiotics"
    },
    "Prescribe_Second_Round_Of_Antibiotics": {
      "type": "MedicationOrder",
      "target_encounter": "Followup_Encounter",
      "reason": "uti",
      "remarks": [
        "This is a stronger antibiotic."
      ],
      "codes": [
        {
          "system": "RxNorm",
          "code": "1648767",
          "display": "NITROFURANTOIN, MACROCRYSTALS 50 MG [Macrodantin]"
        }
      ],
      "direct_transition": "End_Followup"
    },
    "End_Followup": {
      "type": "EncounterEnd",
      "direct_transition": "Take_More_Antibiotics"
    },
    "Take_More_Antibiotics": {
      "type": "Delay",
      "exact": {
        "quantity": 7,
        "unit": "days"
      },
      "direct_transition": "End_Second_Round_Of_Antibiotics"
    },
    "End_Second_Round_Of_Antibiotics": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_Second_Round_Of_Antibiotics",
      "direct_transition": "End_Urinary_Tract_Infection"
    },
    "End_Urinary_Tract_Infection": {
      "type": "ConditionEnd",
      "referenced_by_attribute": "uti",
      "direct_transition": "UTI_Symptom1_Ends"
    },
    "UTI_Symptom1_Ends": {
      "type": "Symptom",
      "symptom": "Dysuria",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom2_Ends"
    },
    "UTI_Symptom2_Ends": {
      "type": "Symptom",
      "symptom": "Urgent Desire to Urinate",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom3_Ends"
    },
    "UTI_Symptom3_Ends": {
      "type": "Symptom",
      "symptom": "Frequent Urination",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom4_Ends"
    },
    "UTI_Symptom4_Ends": {
      "type": "Symptom",
      "symptom": "Discolored Urine",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom5_Ends"
    },
    "UTI_Symptom5_Ends": {
      "type": "Symptom",
      "symptom": "Odor of Urine",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom6_Ends"
    },
    "UTI_Symptom6_Ends": {
      "type": "Symptom",
      "symptom": "Pelvic Pain",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "UTI_Symptom7_Ends"
    },
    "UTI_Symptom7_Ends": {
      "type": "Symptom",
      "symptom": "Fever",
      "exact": {
        "quantity": 0
      },
      "direct_transition": "End_OTC_Painkiller"
    },
    "End_OTC_Painkiller": {
      "type": "MedicationEnd",
      "medication_order": "Prescribe_OTC_Painkiller_For_UTIs",
      "direct_transition": "End_UTI_CarePlan"
    },
    "End_UTI_CarePlan": {
      "type": "CarePlanEnd",
      "careplan": "UTI_CarePlan",
      "direct_transition": "Get_Additional_UTIs"
    },
    "Get_Additional_UTIs": {
      "type": "Simple",
      "distributed_transition": [
        {
          "distribution": 0.2,
          "transition": "Wait_For_Next_UTI",
          "remarks": [
            "Nearly 20% of women who have one UTI have another "
          ]
        },
        {
          "distribution": 0.048,
          "transition": "Recurrent_Urinary_Tract_Infections",
          "remarks": [
            "About 4.8% get recurring UTIs: ",
            "0.8 * 0.3 * 0.2 = 0.048 "
          ]
        },
        {
          "distribution": 0.752,
          "transition": "Terminal"
        }
      ]
    },
    "Recurrent_Urinary_Tract_Infections": {
      "type": "ConditionOnset",
      "target_encounter": "UTI_Diagnosis",
      "codes": [
        {
          "system": "SNOMED-CT",
          "code": "197927001",
          "display": "Recurrent urinary tract infection"
        }
      ],
      "direct_transition": "Wait_For_Recurring_UTI"
    },
    "Wait_For_Recurring_UTI": {
      "type": "Delay",
      "range": {
        "low": 3,
        "high": 6,
        "unit": "weeks"
      },
      "direct_transition": "Urinary_Tract_Infection"
    },
    "Terminal": {
      "type": "Terminal"
    }
  }
}
,
"wellness_encounters":{
  "name": "Wellness Encounters",
  "remarks": [
    "migrated observations from Lifecycle and Metabolic Syndrome ruby modules"
  ],
  "states": {
    "Initial": {
      "type": "Initial",
      "direct_transition": "Wellness_Encounter"
    },
    "Wellness_Encounter": {
      "type": "Encounter",
      "wellness": true,
      "direct_transition": "Record_Height"
    },
    "Record_Height": {
      "type": "Observation",
      "target_encounter": "Wellness_Encounter",
      "category": "vital-signs",
      "vital_sign": "Height",
      "codes": [
        {
          "system": "LOINC",
          "code": "8302-2",
          "display": "Body Height"
        }
      ],
      "unit": "cm",
      "direct_transition": "Record_Weight"
    },
    "Record_Weight": {
      "type": "Observation",
      "target_encounter": "Wellness_Encounter",
      "category": "vital-signs",
      "vital_sign": "Weight",
      "codes": [
        {
          "system": "LOINC",
          "code": "29463-7",
          "display": "Body Weight"
        }
      ],
      "unit": "kg",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Age",
            "operator": "<",
            "quantity": 2,
            "unit": "years"
          },
          "remarks": [
            "BMI is not particularly meaningful for children under 2"
          ],
          "transition": "Record_BP"
        },
        {
          "transition": "Record_BMI"
        }
      ]
    },
    "Record_BMI": {
      "type": "Observation",
      "target_encounter": "Wellness_Encounter",
      "category": "vital-signs",
      "vital_sign": "BMI",
      "codes": [
        {
          "system": "LOINC",
          "code": "39156-5",
          "display": "Body Mass Index"
        }
      ],
      "unit": "kg/m2",
      "direct_transition": "Record_BP"
    },
    "Record_BP": {
      "type": "MultiObservation",
      "category": "vital-signs",
      "codes": [
        {
          "system": "LOINC",
          "code": "55284-4",
          "display": "Blood Pressure"
        }
      ],
      "observations": [
        {
          "category": "vital-signs",
          "vital_sign": "Systolic Blood Pressure",
          "codes": [
            {
              "system": "LOINC",
              "code": "8480-6",
              "display": "Systolic Blood Pressure"
            }
          ],
          "unit": "mmHg"
        },
        {
          "category": "vital-signs",
          "vital_sign": "Diastolic Blood Pressure",
          "codes": [
            {
              "system": "LOINC",
              "code": "8462-4",
              "display": "Diastolic Blood Pressure"
            }
          ],
          "unit": "mmHg"
        }
      ],
      "target_encounter": "Wellness_Encounter",
      "direct_transition": "Lab_MetabolicPanel"
    },
    "Record_MetabolicPanel": {
      "type": "DiagnosticReport",
      "number_of_observations": 8,
      "codes": [
        {
          "system": "LOINC",
          "code": "51990-0",
          "display": "Basic Metabolic Panel"
        }
      ],
      "observations": [
        {
          "category": "laboratory",
          "vital_sign": "Glucose",
          "codes": [
            {
              "system": "LOINC",
              "code": "2339-0",
              "display": "Glucose"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "Urea Nitrogen",
          "codes": [
            {
              "system": "LOINC",
              "code": "6299-2",
              "display": "Urea Nitrogen"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "Creatinine",
          "codes": [
            {
              "system": "LOINC",
              "code": "38483-4",
              "display": "Creatinine"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "Calcium",
          "codes": [
            {
              "system": "LOINC",
              "code": "49765-1",
              "display": "Calcium"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "Sodium",
          "codes": [
            {
              "system": "LOINC",
              "code": "2947-0",
              "display": "Sodium"
            }
          ],
          "unit": "mmol/L"
        },
        {
          "category": "laboratory",
          "vital_sign": "Potassium",
          "codes": [
            {
              "system": "LOINC",
              "code": "6298-4",
              "display": "Potassium"
            }
          ],
          "unit": "mmol/L"
        },
        {
          "category": "laboratory",
          "vital_sign": "Chloride",
          "codes": [
            {
              "system": "LOINC",
              "code": "2069-3",
              "display": "Chloride"
            }
          ],
          "unit": "mmol/L"
        },
        {
          "category": "laboratory",
          "vital_sign": "Carbon Dioxide",
          "codes": [
            {
              "system": "LOINC",
              "code": "20565-8",
              "display": "Carbon Dioxide"
            }
          ],
          "unit": "mmol/L"
        }
      ],
      "target_encounter": "Wellness_Encounter",
      "direct_transition": "Lab_LipidPanel"
    },
    "Record_LipidPanel": {
      "type": "DiagnosticReport",
      "number_of_observations": 4,
      "codes": [
        {
          "system": "LOINC",
          "code": "57698-3",
          "display": "Lipid Panel"
        }
      ],
      "observations": [
        {
          "category": "laboratory",
          "vital_sign": "Total Cholesterol",
          "codes": [
            {
              "system": "LOINC",
              "code": "2093-3",
              "display": "Total Cholesterol"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "Triglycerides",
          "codes": [
            {
              "system": "LOINC",
              "code": "2571-8",
              "display": "Triglycerides"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "LDL",
          "codes": [
            {
              "system": "LOINC",
              "code": "18262-6",
              "display": "Low Density Lipoprotein Cholesterol"
            }
          ],
          "unit": "mg/dL"
        },
        {
          "category": "laboratory",
          "vital_sign": "HDL",
          "codes": [
            {
              "system": "LOINC",
              "code": "2085-9",
              "display": "High Density Lipoprotein Cholesterol"
            }
          ],
          "unit": "mg/dL"
        }
      ],
      "target_encounter": "Wellness_Encounter",
      "direct_transition": "Lab_ACR"
    },
    "Record_ACR": {
      "type": "Observation",
      "target_encounter": "Wellness_Encounter",
      "vital_sign": "Microalbumin Creatinine Ratio",
      "category": "laboratory",
      "codes": [
        {
          "system": "LOINC",
          "code": "14959-1",
          "display": "Microalbumin Creatinine Ratio"
        }
      ],
      "unit": "mg/g",
      "direct_transition": "Lab_EGFR"
    },
    "Record_EGFR": {
      "type": "Observation",
      "target_encounter": "Wellness_Encounter",
      "category": "laboratory",
      "vital_sign": "EGFR",
      "codes": [
        {
          "system": "LOINC",
          "code": "33914-3",
          "display": "Estimated Glomerular Filtration Rate"
        }
      ],
      "unit": "mL/min/{1.73_m2}",
      "direct_transition": "Smoker_Status_Observation"
    },
    "Lab_MetabolicPanel": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "44054006",
                    "display": "Diabetes"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "15777000",
                    "display": "Prediabetes"
                  }
                ]
              }
            ]
          },
          "transition": "Record_MetabolicPanel"
        },
        {
          "transition": "Lab_LipidPanel"
        }
      ]
    },
    "Lab_LipidPanel": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "44054006",
                    "display": "Diabetes"
                  }
                ]
              },
              {
                "condition_type": "And",
                "conditions": [
                  {
                    "condition_type": "Not",
                    "condition": {
                      "condition_type": "PriorState",
                      "name": "Record_LipidPanel",
                      "within": {
                        "quantity": 3,
                        "unit": "years"
                      }
                    }
                  },
                  {
                    "condition_type": "Age",
                    "operator": ">=",
                    "quantity": 30,
                    "unit": "years"
                  }
                ]
              }
            ]
          },
          "transition": "Record_LipidPanel"
        },
        {
          "transition": "Lab_ACR"
        }
      ]
    },
    "Lab_ACR": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Active Condition",
            "codes": [
              {
                "system": "SNOMED-CT",
                "code": "44054006",
                "display": "Diabetes"
              }
            ]
          },
          "transition": "Record_ACR"
        },
        {
          "transition": "Lab_EGFR"
        }
      ]
    },
    "Lab_EGFR": {
      "type": "Simple",
      "conditional_transition": [
        {
          "condition": {
            "condition_type": "Or",
            "conditions": [
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "44054006",
                    "display": "Diabetes"
                  }
                ]
              },
              {
                "condition_type": "Active Condition",
                "codes": [
                  {
                    "system": "SNOMED-CT",
                    "code": "38341003",
                    "display": "Hypertension"
                  }
                ]
              }
            ]
          },
          "transition": "Record_EGFR"
        },
        {
          "transition": "Smoker_Status_Observation"
        }
      ]
    },
    "Smoker_Status_Observation": {
      "type": "Simple",
      "conditional_transition": [
        {
          "transition": "Record_Current_Smoker",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "smoker",
            "operator": "==",
            "value": true
          }
        },
        {
          "transition": "Record_Former_Smoker",
          "condition": {
            "condition_type": "Attribute",
            "attribute": "quit smoking age",
            "operator": "is not nil"
          }
        },
        {
          "transition": "Record_Never_Smoker"
        }
      ]
    },
    "Record_Current_Smoker": {
      "type": "Observation",
      "category": "survey",
      "unit": "",
      "codes": [
        {
          "system": "LOINC",
          "code": "72166-2",
          "display": "Tobacco smoking status NHIS"
        }
      ],
      "value_code": {
        "system": "SNOMED-CT",
        "code": 449868002,
        "display": "Current every day smoker"
      },
      "direct_transition": "Wellness_Encounter"
    },
    "Record_Former_Smoker": {
      "type": "Observation",
      "category": "survey",
      "unit": "",
      "codes": [
        {
          "system": "LOINC",
          "code": "72166-2",
          "display": "Tobacco smoking status NHIS"
        }
      ],
      "direct_transition": "Wellness_Encounter",
      "value_code": {
        "system": "SNOMED-CT",
        "code": 8517006,
        "display": "Former smoker"
      }
    },
    "Record_Never_Smoker": {
      "type": "Observation",
      "category": "survey",
      "unit": "",
      "codes": [
        {
          "system": "LOINC",
          "code": "72166-2",
          "display": "Tobacco smoking status NHIS"
        }
      ],
      "direct_transition": "Wellness_Encounter",
      "value_code": {
        "system": "SNOMED-CT",
        "code": 266919005,
        "display": "Never smoker"
      }
    }
  }
}
,};