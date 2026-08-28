// ==UserScript==
// @name        Cookie Editor 3.84.0 (hafrealtestmail)
// @namespace   http://tampermonkey.net/
// @version     3.84.0
// @description Added localhost to @match. Screen-list click in the activeTab dropdown now sets the screen name (string) directly instead of the numeric index; removed the now-redundant "str" button.
// @author      Bohdan S.
// @match       https://haf-frontend.dev.prokit.me/*
// @match       https://haf-frontend.dev2.prokit.me/*
// @match       https://haf-frontend.stage.prokit.me/*
// @match       https://plan.helloembody.com/*
// @match       https://join.helloembody.com/*
// @match       https://plan.startdrivn.com/*
// @match       https://join.startdrivn.com/*
// @match       http://localhost*
// @grant       GM_addStyle
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    const config = {
        storageKeys: {
            position: 'cookieEditorPosition_v2_mobile',
            personalSpoiler: 'cookieEditor_personalSpoilerOpen',
            scoreSpoiler: 'cookieEditor_scoreSpoilerOpen',
            jsonAreaHeight: 'cookieEditor_jsonAreaHeight',
            flagsAreaHeight: 'cookieEditor_flagsAreaHeight'
        },
        specialFunnels: ['w2f123r', 'w3f123r', 'w4f123r', 'ap2f123r', 'cl2f123r', 'cl3f123r', 'm3f123r', 'cl2m123r', 'cl3m123r', 'm3m123r', 'd3m123r', 'chb2f23r', 'c2f23r', 'tch2f23r'],

        // --- JSON TEMPLATES ---
        defaultQuickFillJson: {
            "activeTab": "paywall", "funnelId": "f1f123r", "prevTab": null, "progress": 0, "selectedAge": 18, "selectedAgeValue": "18-29", "screensCount": 44, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 44, "firstScreenAge": 18, "goal": "Tone & sculpt", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["I have no issues"], "height": { "value": 150, "selectedUnit": "cm" }, "weightGoalDiff": 25,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Health issues", "Stress or other life factors"], "workoutStyles": ["None of them"], "workoutPreferences": ["Mostly lying down"], "planMostImportant": ["Health insights"],
                "fitnessLevelScreen": "Intermediate", "flexibilityLevel": "I can touch the floor with my fingertips", "upperBodyFlexibility": "My fingertips can touch", "exerciseActivityLevel": "Occasionally", "stairsLevel": "Slightly winded after several flights",
                "walkingActivityLevel": "Less than 1 hour", "squatsLevel": "Fewer 12", "kneePushUpsLevel": "11-20", "dailyActivityLevel": "Mostly sedentary", "energyLevel": "Low, tired most of the day", "sleepTime": "Less than 5 hours", "water": "About 2 glasses", "diet": ["Mediterranean","Vegetarian"],
                "badFoodHabits": ["Overeating"], "fitnessLevel": "Low",
                "obese": { "BMI": "19.6", "BMI_range": "healthy", "somatotype": "mesomorph", "lifestyle": "sedentary", "fitness_level": "low", "metabolism": "moderate" },
                "importantEvent": "Other", "email": "hafrealtestmail+f1@gmail.com", "name": "flex"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 19.555555555555557, "programType": "fitness"
        },
        chairYogaJson: {
            "activeTab": "paywall", "funnelId": "c2f23r", "prevTab": null, "progress": 0, "selectedAge": 40, "selectedAgeValue": "40-49", "screensCount": 51, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 51, "firstScreenAge": 40, "chairYogaExperienceScreen": "Yes", "goal": "Tone & define", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Upper Body"],
                "weightChange": "I gain weight quickly but lose it slowly", "bestShape": "More than 3 years ago", "problemAreas": ["Legs"], "height": { "value": 150, "selectedUnit": "cm" }, "weightGoalDiff": 25,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 66, "selectedUnit": "years" },
                "obstacles": ["Health issues"], "workoutStyles": ["None of them"], "workoutPreferences": ["Gentle on joints"], "planMostImportant": ["Adapted exercises"], "fitnessLevelScreen": "Advanced", "flexibilityLevel": "I can place my palms flat on the floor", "upperBodyFlexibility": "My fingers can overlap or clasp together", "exerciseActivityLevel": "Regularly", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivityLevel": "More than 2 hours", "squatsLevel": "More than 20", "kneePushUpsLevel": "Haven’t tried", "dailyActivityLevel": "Moderately active", "energyLevel": "High and consistent all day", "sleepTime": "Less than 5 hours", "water": "More than 10 glasses", "diet": ["None"],
                "eatingBarriers": [],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "Intermediate",
                "obese": { "BMI": "19.6", "BMI_range": "healthy", "somatotype": "endomorph", "lifestyle": "active", "fitness_level": "intermediate", "metabolism": "slow" },
                "referralSource": "Coach", "importantEvent": "Wedding", "importantEventDate": "03/22/2026", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmail+c1@gmail.com", "name": "Chair Yoga"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 19.555555555555557, "programType": "yoga"
        },
        chairBarreJson: {
            "activeTab": "paywall", "funnelId": "chb2f23r", "prevTab": null, "progress": 0, "selectedAge": 50, "selectedAgeValue": "50-59", "screensCount": 53, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 53, "firstScreenAge": 50, "chairYogaExperienceScreen": "Yes", "goal": "Maintain weight", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["Legs", "Back", "Arms", "Neck"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 11,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 49, "selectedUnit": "kg" }, "age": { "value": 55, "selectedUnit": "years" },
                "obstacles": ["Health issues", "Unrealistic expectations"], "workoutStyles": ["Yoga", "Wall Pilates", "Chair Yoga", "Pelvic Floor & Core", "Light Aerobics", "Tai Chi", "Bodyweight Strength", "Bed Workouts"], "workoutPreferences": ["Minimal position changes"], "planMostImportant": ["Professional support"], "fitnessLevelScreen": "Advanced", "flexibilityLevel": "I can place my palms flat on the floor", "upperBodyFlexibility": "My hands are far apart, can't reach or touch", "exerciseActivityLevel": "Regularly", "stairsLevel": "Out of breath after 1-2 flights", "walkingActivityLevel": "More than 2 hours", "squatsLevel": "More than 20", "kneePushUpsLevel": "More than 20", "dailyActivityLevel": "Moderately active", "energyLevel": "Stable, but not very high", "sleepTime": "Less than 5 hours", "water": "2-6 glasses", "diet": ["Keto"],
                "eatingBarriers": ["None, I'm eating healthy"],
                "badFoodHabits": ["None of the above"], "fitnessLevel": "Intermediate",
                "obese": { "BMI": "13.6", "BMI_range": "underweight", "somatotype": "ecto-meso mix", "lifestyle": "active", "fitness_level": "intermediate", "metabolism": "moderate" },
                "referralSource": "Social media ads", "importantEvent": "Reunion", "importantEventDate": "04/08/2026", "personalConfidence": "I’m uncertain, but willing to try!", "email": "hafrealtestmail+chb2@gmail.com", "name": "NameChair Barre"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 13.580246913580247, "programType": "barre", "weightGoalDiff": 11
        },
        taiChiJson: {
            "activeTab": "paywall", "funnelId": "tch2f23r", "prevTab": "chairYogaExperienceScreen", "progress": 0, "selectedAge": 40, "selectedAgeValue": "40-49", "screensCount": 53, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 53, "firstScreenAge": 40, "chairYogaExperienceScreen": "Yes", "goal": "Maintain weight", "driveGoal": ["Improve physical appearance"], "bodyCurrent": "Toned", "bodyTarget": "Toned", "focusZones": ["Upper Body", "Core"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["Back"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": -37,
                "currentWeight": { "value": 88, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Lack of accountability", "Not sure what to do"], "workoutStyles": ["Bed Workouts"], "workoutPreferences": ["No specific preferences"], "planMostImportant": ["Health insights", "Personalized approach", "Professional support", "Adapted exercises"], "fitnessLevelScreen": "New to Tai Chi", "flexibilityLevel": "I can touch the floor with my fingertips", "upperBodyFlexibility": "My fingers can overlap or clasp together", "exerciseActivityLevel": "Almost daily", "stairsLevel": "Slightly winded after several flights", "walkingActivityLevel": "1-2 hours", "squatsLevel": "More than 20", "kneePushUpsLevel": "5-10", "dailyActivityLevel": "Very active", "energyLevel": "Stable, but not very high", "sleepTime": "Less than 5 hours", "water": "More than 10 glasses", "diet": ["None"],
                "eatingBarriers": ["Don't have time to cook", "Don't know what to eat"],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "High",
                "obese": { "BMI": "27.2", "BMI_range": "overweight", "somatotype": "mesomorph", "lifestyle": "active", "fitness_level": "high", "metabolism": "moderate" },
                "referralSource": "Web search", "importantEvent": "Reunion", "importantEventDate": "04/27/2026", "personalConfidence": "I’m uncertain, but willing to try!", "email": "hafrealtestmail+tch2@gmail.com", "name": "Tai Chi"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 27.160493827160494, "programType": "taichi", "weightGoalDiff": -37
        },
        wallPilatesJson: {
            "activeTab": "paywall", "funnelId": "w2f123r", "prevTab": null, "progress": 0, "selectedAge": 30, "selectedAgeValue": "30-39", "screensCount": 51, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 51, "firstScreenAge": 30, "wallPilatesExperienceScreen": "Yes", "goal": "Tone & define", "driveGoal": ["Alleviate body aches", "Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Toned", "focusZones": ["Core", "Upper Body"],
                "weightChange": "I gain weight quickly but lose it  slowly", "bestShape": "1 to 2 years ago", "problemAreas": ["Legs", "Back"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 6,
                "currentWeight": { "value": 66, "selectedUnit": "kg" }, "targetWeight": { "value": 70, "selectedUnit": "kg" }, "age": { "value": 30, "selectedUnit": "years" },
                "obstacles": ["Not sure what to do", "Inconsistent routine"], "fitnessLevelScreen": "Intermediate", "flexibilityLevel": "I can place my palms flat on the floor", "upperBodyFlexibility": "My hands get close, a few inches apart", "exerciseActivityLevel": "Occasionally", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivityLevel": "1-2 hours", "squatsLevel": "13-20", "kneePushUpsLevel": "Fewer 4", "dailyActivityLevel": "Moderately active", "energyLevel": "Energy fluctuates all day", "sleepTime": "Less than 5 hours", "water": "7-10 glasses", "diet": ["Mediterranean","Vegetarian"],
                "eatingBarriers": [],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "Low",
                "obese": { "BMI": "20.4", "BMI_range": "healthy", "somatotype": "endomorph", "lifestyle": "moderately active", "fitness_level": "low", "metabolism": "slow", "pilates_level": "low" },
                "referralSource": "Social media ads", "importantEvent": "Wedding", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmail+w1-2@gmail.com", "name": "Name-Wall Pilates"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 20.37037037037037, "programType": "pilates"
        },
        cl2m123rJson: {
            "activeTab": "paywall", "funnelId": "cl2m123r", "prevTab": "stairsLevel", "progress": 0, "selectedAge": 18, "selectedAgeValue": "18–29", "screensCount": 50, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 50, "firstScreenAge": 18, "calisthenicsExperience": "No", "goalCalisthenics": "Gain muscle", "driveGoal": ["None of the above"], "bodyCurrent": "Slim", "bodyTarget": "Ripped", "focusZones": ["Total Body"],
                "weightChange": "I struggle to gain weight and muscle", "bestShape": "Never", "obstacles": ["I don’t know"],
                "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 0,
                "currentWeight": { "value": 55, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 55, "selectedUnit": "years" },
                "problemAreas": ["I have no issues"],
                "flexibilityLevel": "I can’t reach the floor", "upperBodyFlexibility": "My hands are far apart, can't reach or touch",
                "exerciseActivityLevel": "I haven’t started yet", "stairsLevel": "Out of breath after few steps", "walkingActivityLevel": "Less than 1 hour",
                "squatsLevel": "I can’t do squats", "kneePushUpsLevel": "I can’t do push-ups",
                "dailyActivityLevel": "Mostly sedentary", "energyLevel": "Low, tired most of the day", "sleepTime": "Less than 5 hours", "water": "I only have coffee or tea",
                "diet": ["None"], "badFoodHabits": ["Emotional or boredom eating"],
                "fitnessLevel": "Very Low",
                "obese": { "BMI": "17.0", "BMI_range": "underweight", "somatotype": "ectomorph", "lifestyle": "sedentary", "fitness_level": "very low", "metabolism": "fast" },
                "referralSource": "Other", "importantEvent": "Vacation", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmail+cl2@gmail.com", "name": "CalisthenicM"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 16.975308641975307, "programType": "pilates"
        },
        cl3m123rJson: {
            "activeTab": "paywall", "funnelId": "cl3m123r", "prevTab": "stairsLevel", "progress": 0, "selectedAge": 18, "selectedAgeValue": "18–29", "screensCount": 50, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 50, "firstScreenAge": 18, "calisthenicsExperience": "Yes", "calisthenicsLevel": "Advanced", "goalCalisthenics": "Gain muscle", "driveGoal": ["None of the above"], "bodyCurrent": "Slim", "bodyTarget": "Ripped", "focusZones": ["Total Body"],
                "weightChange": "I struggle to gain weight and muscle", "bestShape": "Never", "obstacles": ["I don’t know"],
                "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 0,
                "currentWeight": { "value": 55, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 55, "selectedUnit": "years" },
                "problemAreas": ["I have no issues"],
                "flexibilityLevel": "I can’t reach the floor", "upperBodyFlexibility": "My hands are far apart, can't reach or touch",
                "exerciseActivityLevel": "I haven’t started yet", "stairsLevel": "Out of breath after few steps", "walkingActivityLevel": "Less than 1 hour",
                "squatsLevel": "I can’t do squats", "kneePushUpsLevel": "I can’t do push-ups",
                "dailyActivityLevel": "Mostly sedentary", "energyLevel": "Low, tired most of the day", "sleepTime": "Less than 5 hours", "water": "I only have coffee or tea",
                "diet": ["None"], "badFoodHabits": ["Emotional or boredom eating"],
                "fitnessLevel": "Very Low",
                "obese": { "BMI": "17.0", "BMI_range": "underweight", "somatotype": "ectomorph", "lifestyle": "sedentary", "fitness_level": "very low", "metabolism": "fast" },
                "referralSource": "Other", "importantEvent": "Vacation", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmail+cl2@gmail.com", "name": "CalisthenicM"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 16.975308641975307, "programType": "pilates"
        },
        m3m123rJson: {
            "activeTab": "paywall", "funnelId": "m3m123r", "prevTab": null, "progress": 0, "selectedAge": 18, "selectedAgeValue": "18–29", "screensCount": 50, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 50, "firstScreenAge": 18, "calisthenicsExperience": "Yes", "calisthenicsLevel": "New to calisthenics", "goalCalisthenics": "Improve overall fitness", "driveGoal": ["Improve posture"], "bodyCurrent": "Average", "bodyTarget": "Ripped", "focusZones": ["Full body"],
                "weightChange": "I struggle to gain weight and <br> muscle", "bestShape": "Right now", "obstacles": ["I don’t know"],
                "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 14,
                "currentWeight": { "value": 77, "selectedUnit": "kg" }, "targetWeight": { "value": 88, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "problemAreas": ["I have no issues"],
                "flexibilityLevel": "I can place my palms flat on the floor", "upperBodyFlexibility": "My fingertips can touch",
                "exerciseActivityLevel": "Almost daily", "stairsLevel": "Fine, no issues", "walkingActivityLevel": "More than 2 hours",
                "squatsLevel": "More than 40", "kneePushUpsLevel": "More than 30",
                "dailyActivityLevel": "Very active", "energyLevel": "Stable, but not very high", "sleepTime": "5-6 hours", "water": "I only have coffee or tea",
                "diet": ["None"], "badFoodHabits": ["None of the above"],
                "fitnessLevel": "Advanced",
                "obese": { "BMI": "23.8", "BMI_range": "healthy", "somatotype": "ecto-meso mix", "lifestyle": "highly active", "fitness_level": "advanced", "metabolism": "fast" },
                "referralSource": "Friends or Family", "importantEvent": "Vacation", "importantEventDate": "10/11/2026", "personalConfidence": "I believe I can do it!", "email": "hafrealtestmail+m3m@gmail.com", "name": "Military Male"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 23.76543209876543, "programType": "pilates", "selectedPrice": null, "weightGoalDiff": 14
        },
        d3m123rJson: {
            "activeTab": "paywall", "funnelId": "d3m123r", "prevTab": "kneePushUpsLevel", "progress": 0, "selectedAge": 18, "selectedAgeValue": "18–29", "screensCount": 42, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 42, "firstScreenAge": 18, "calisthenicsExperience": "No", "goalCalisthenics": "Lose weight", "driveGoal": ["Develop flexibility", "Boost sexual drive"], "bodyCurrent": "Soft", "bodyTarget": "Athletic", "focusZones": ["Chest", "Arms"],
                "weightChange": "I struggle to gain weight and <br> muscle", "bestShape": "Never", "obstacles": ["Stress or other life factors"],
                "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 0,
                "currentWeight": { "value": 55, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 55, "selectedUnit": "years" },
                "problemAreas": ["Neck", "Arms"],
                "exerciseActivityLevel": "Regularly", "flexibilityLevel": "I can touch the floor with my fingertips", "upperBodyFlexibility": "My hands get close, a few inches apart",
                "stairsLevel": "Out of breath after 1-2 flights", "walkingActivityLevel": "1-2 hours",
                "squatsLevel": "More than 40", "kneePushUpsLevel": "I can’t do push-ups",
                "dailyActivityLevel": "Highly active", "energyLevel": "High and consistent all day", "sleepTime": "Less than 5 hours", "water": "More than 10 glasses",
                "diet": ["None"], "badFoodHabits": ["Late-night snacking", "Overeating"],
                "fitnessLevel": "Low",
                "obese": { "BMI": "17.0", "BMI_range": "underweight", "somatotype": "ectomorph", "lifestyle": "highly active", "fitness_level": "low", "metabolism": "fast" },
                "importantEvent": "Vacation", "importantEventDate": "11/26/2026", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmail+d3@gmail.com", "name": "DefaultM"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 16.975308641975307, "programType": "pilates", "selectedPrice": null, "upsellShowDownloadApp": false, "onelinkRoute": null, "weightGoalDiff": 0
        },
        cl2f123rJson: {
            "activeTab": "paywall", "funnelId": "cl2f123r", "prevTab": null, "progress": 0, "selectedAge": 18, "selectedAgeValue": "18-29", "screensCount": 53, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 53, "firstScreenAge": 18, "calisthenicsExperience": "Yes", "calisthenicsLevel": "Beginner", "goal": "Build muscle", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I gain and lose weight easily", "bestShape": "Less than a year ago", "problemAreas": ["Back", "Legs"], "height": { "value": 170, "selectedUnit": "cm" }, "weightGoalDiff": 11,
                "currentWeight": { "value": 45, "selectedUnit": "kg" }, "targetWeight": { "value": 50, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Lack of accountability", "Inconsistent routine"], "flexibilityLevel": "I can touch the floor with my fingertips", "upperBodyFlexibility": "My hands get close, a few inches apart", "exerciseActivityLevel": "Regularly", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivityLevel": "1-2 hours", "squatsLevel": "More than 20", "kneePushUpsLevel": "Haven’t tried", "dailyActivityLevel": "Moderately active", "energyLevel": "Energy fluctuates all day", "sleepTime": "Less than 5 hours", "water": "2-6 glasses", "diet": ["Mediterranean","Vegetarian"],
                "eatingBarriers": ["Don't have time to cook", "Don't know what to eat"],
                "badFoodHabits": ["Late-night snacking"], "fitnessLevel": "Low",
                "obese": { "BMI": "15.6", "BMI_range": "underweight", "somatotype": "ecto-meso mix", "lifestyle": "moderately active", "fitness_level": "low", "metabolism": "moderate" },
                "referralSource": "Coach", "importantEvent": "Vacation", "personalConfidence": "I’m uncertain, but willing to try!", "email": "hafrealtestmail+cl2f@gmail.com", "name": "Calisthenic fem"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 15.570934256055365, "programType": "asianPilates", "selectedPrice": null, "weightGoalDiff": 11
        },
        m3f123rJson: {
            "activeTab": "paywall", "funnelId": "m3f123r", "prevTab": "bestShape", "progress": 0, "selectedAge": 30, "selectedAgeValue": "30-39", "screensCount": 53, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 53, "firstScreenAge": 30, "calisthenicsExperience": "Yes", "calisthenicsLevel": "Intermediate", "goal": "Maintain weight and get fit", "driveGoal": ["Improve physical appearance", "Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I struggle to gain weight and <br> muscle", "bestShape": "Less than a year ago", "problemAreas": ["Back", "Legs"], "height": { "value": 150, "selectedUnit": "cm" }, "weightGoalDiff": -17,
                "currentWeight": { "value": 60, "selectedUnit": "kg" }, "targetWeight": { "value": 50, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Hit a progress plateau", "Staying motivated", "Lack of accountability"], "flexibilityLevel": "I can touch the floor with my fingertips", "upperBodyFlexibility": "My hands get close, a few inches apart", "exerciseActivityLevel": "Occasionally", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivityLevel": "Less than 1 hour", "squatsLevel": "13-20", "kneePushUpsLevel": "Fewer 4", "dailyActivityLevel": "Lightly active", "energyLevel": "Energy fluctuates all day", "sleepTime": "5-6 hours", "water": "I only have coffee or tea", "diet": ["None"],
                "eatingBarriers": ["Healthy food is too expensive", "Don't know what to eat"],
                "badFoodHabits": ["Overeating"], "fitnessLevel": "Low",
                "obese": { "BMI": "26.7", "BMI_range": "overweight", "somatotype": "meso-endo mix", "lifestyle": "sedentary", "fitness_level": "low", "metabolism": "slow" },
                "referralSource": "Personal Doctor", "importantEvent": "Wedding", "personalConfidence": "I believe I can do it!", "email": "hafrealtestmail+m3f@gmail.com", "name": "Military Fem"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 26.666666666666668, "programType": "asianPilates", "selectedPrice": null, "weightGoalDiff": -17
        }
    };

    // --- Weights & Maps ---
    const weights = { flexibility: 0.4, yogaPilates: 1.0, activityLevel: 0.6 };
    const totalWeight = weights.flexibility + weights.yogaPilates + weights.activityLevel;
    const yogaPilatesScoreMap = { "New to yoga": 0, "New to pilates": 0, "Beginner": 0.4, "Intermediate": 0.6, "Advanced": 1 };
    const flexibilityScoreMap = { "I can’t reach the floor": 0, "I can touch the floor with my fingertips": 0.55, "I can place my palms flat on the floor": 1 };

    const fatMap = {
        "Slim": "15-19%",
        "Toned": "<15%",
        "Medium Build": "20-34%",
        "Plus-sized": "35-39%",
        "Overweight": "40%"
    };

    // --- NEW Fitness Level Scoring (PR-69876) ---
    // Age-based answer scores for 5 questions, weighted.
    const newFitnessAgeBuckets = [
        { max: 25, idx: 0, label: '18-25' },
        { max: 35, idx: 1, label: '26-35' },
        { max: 45, idx: 2, label: '36-45' },
        { max: 55, idx: 3, label: '46-55' },
        { max: Infinity, idx: 4, label: '55+' }
    ];
    const newFitnessAnswerMaps = {
        squatsLevel: {
            "I can’t do squats": [0.25, 0.25, 0.25, 0.25, 0.25],
            "I don't know":      [0.25, 0.25, 0.25, 0.25, 0.25],
            "Fewer 12":          [0.25, 0.25, 0.33, 0.50, 0.50],
            "13-20":         [0.50, 0.50, 0.67, 0.75, 0.75],
            "More than 20":  [1.00, 1.00, 1.00, 1.00, 1.00]
        },
        stairsLevel: {
            "Out of breath after few steps":          [0.00, 0.00, 0.10, 0.25, 0.33],
            "Out of breath after 1-2 flights":        [0.25, 0.25, 0.33, 0.50, 0.67],
            "Slightly winded after several flights":  [0.50, 0.50, 0.67, 0.75, 0.83],
            "Fine, no issues":                        [1.00, 1.00, 1.00, 1.00, 1.00]
        },
        kneePushUpsLevel: {
            "I can’t do push-ups": [0.25, 0.25, 0.25, 0.25, 0.25],
            "Haven’t tried":       [0.25, 0.25, 0.25, 0.25, 0.25],
            "Fewer 4":       [0.25, 0.25, 0.35, 0.50, 0.50],
            "5-10":          [0.35, 0.50, 0.50, 0.75, 0.75],
            "11-20":         [0.60, 0.70, 0.75, 0.90, 0.95],
            "More than 20":  [1.00, 1.00, 1.00, 1.00, 1.00]
        },
        upperBodyFlexibility: {
            "My hands are far apart, can't reach or touch": [0.00, 0.00, 0.10, 0.10, 0.25],
            "My hands get close, a few inches apart":       [0.25, 0.25, 0.33, 0.33, 0.50],
            "My fingertips can touch":                      [0.50, 0.50, 0.67, 0.67, 0.75],
            "My fingers can overlap or clasp together":     [1.00, 1.00, 1.00, 1.00, 1.00]
        },
        flexibilityLevel: {
            "I can’t reach the floor":                  [0.00, 0.00, 0.00, 0.25, 0.33],
            "I can touch the floor with my fingertips": [0.50, 0.50, 0.50, 0.75, 0.75],
            "I can place my palms flat on the floor":   [1.00, 1.00, 1.00, 1.00, 1.00]
        }
    };
    const newFitnessQuestions = [
        { key: 'squatsLevel',          label: 'Squats',     weight: 0.25 },
        { key: 'stairsLevel',          label: 'Stairs',     weight: 0.20 },
        { key: 'kneePushUpsLevel',     label: 'Push-ups',   weight: 0.15 },
        { key: 'upperBodyFlexibility', label: 'Upper Flex', weight: 0.15 },
        { key: 'flexibilityLevel',     label: 'Lower Flex', weight: 0.25 }
    ];
    const newFitnessThresholds = [
        { max: 0.25, label: 'very low' },
        { max: 0.50, label: 'low' },
        { max: 0.75, label: 'intermediate' },
        { max: 1.01, label: 'high' }
    ];

    // --- MALE Fitness Level Scoring (cl2m123r / cl3m123r / m3m123r / d3m123r) ---
    // Age-independent scores (all age buckets share the same value), new weights,
    // 5 levels (adds "advanced"), and two edge-case gates that cap the final score at 0.6.
    const maleFitnessAnswerMaps = {
        squatsLevel: {
            "I can’t do squats": 0,
            "1-10":  0.25,
            "11-20": 0.50,
            "21-40": 0.75,
            "More than 40": 1
        },
        kneePushUpsLevel: {
            "I can’t do push-ups": 0,
            "1-10":  0.25,
            "11-20": 0.50,
            "21-30": 0.75,
            "More than 30": 1
        },
        stairsLevel: {
            "Out of breath after few steps":         0,
            "Out of breath after 1-2 flights":       0.33,
            "Slightly winded after several flights": 0.67,
            "Fine, no issues":                       1
        },
        upperBodyFlexibility: {
            "My hands are far apart, can't reach or touch": 0,
            "My hands get close, a few inches apart":       0.33,
            "My fingertips can touch":                      0.67,
            "My fingers can overlap or clasp together":     1
        },
        flexibilityLevel: {
            "I can’t reach the floor":                  0,
            "I can touch the floor with my fingertips": 0.5,
            "I can place my palms flat on the floor":   1
        }
    };
    const maleFitnessQuestions = [
        { key: 'squatsLevel',          label: 'Squats',     weight: 0.2 },
        { key: 'kneePushUpsLevel',     label: 'Push-ups',   weight: 0.4 },
        { key: 'stairsLevel',          label: 'Stairs',     weight: 0.2 },
        { key: 'upperBodyFlexibility', label: 'Upper Flex', weight: 0.1 },
        { key: 'flexibilityLevel',     label: 'Lower Flex', weight: 0.1 }
    ];
    // Apostrophe-tolerant normalization (cookie may store curly U+2019).
    function maleLevelFromScore(s) {
        if (s >= 0.91) return 'advanced';
        if (s >= 0.61) return 'high';
        if (s >= 0.41) return 'intermediate';
        if (s >= 0.21) return 'low';
        return 'very low';
    }

    // --- cl2f123r / cl3f123r: MALE formula (weights, thresholds, gates) applied to the
    // FEMALE answer options the funnel actually stores. Source: Calculator_final.xlsx.
    // Bridge is the shared "DB Value" ladder present on both tabs:
    //   none=0, newbie=0.25, beginner=0.50, intermediate=0.75, advanced=1
    // Female squats  : don’t know=none, Fewer 12=beginner, 13-20=intermediate, More than 20=advanced
    // Female push-ups: Haven’t tried=none, Fewer 4=newbie, 5-10=beginner, 11-20=intermediate, More than 20=advanced
    // Stairs / upper flex / lower flex use identical options on both tabs, so male scores apply as-is.
    const clFemaleFitnessAnswerMaps = {
        squatsLevel: {
            "I don't know": 0,
            "Fewer 12":      0.50,
            "13-20":         0.75,
            "More than 20":  1
        },
        kneePushUpsLevel: {
            "Haven’t tried": 0,
            "Fewer 4":       0.25,
            "5-10":          0.50,
            "11-20":         0.75,
            "More than 20":  1
        },
        stairsLevel: {
            "Out of breath after few steps":         0,
            "Out of breath after 1-2 flights":       0.33,
            "Slightly winded after several flights": 0.67,
            "Fine, no issues":                       1
        },
        upperBodyFlexibility: {
            "My hands are far apart, can't reach or touch": 0,
            "My hands get close, a few inches apart":       0.33,
            "My fingertips can touch":                      0.67,
            "My fingers can overlap or clasp together":     1
        },
        flexibilityLevel: {
            "I can’t reach the floor":                  0,
            "I can touch the floor with my fingertips": 0.5,
            "I can place my palms flat on the floor":   1
        }
    };

    // --- Styles (NARROW + COMPACT) ---
    GM_addStyle(`
        #cookie-editor-panel { position: fixed; top: 70px; left: 10px; width: 90vw; max-width: 330px; max-height: 85vh; background-color: rgba(40, 44, 52, 0.98); backdrop-filter: blur(5px); color: #abb2bf; border: 1px solid #4f5b66; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.6); z-index: 2147483647; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 12px; display: flex; flex-direction: column; overflow: hidden; }
        #cookie-editor-panel.collapsed { height: 32px !important; width: 130px; }
        #cookie-editor-header { background-color: rgba(60, 64, 73, 1); padding: 0 8px; height: 32px; cursor: move; border-bottom: 1px solid #4f5b66; display: flex; justify-content: space-between; align-items: center; user-select: none; flex-shrink: 0; }
        #cookie-editor-header-title-group { display: flex; flex-direction: row; align-items: center; gap: 6px; overflow: hidden; white-space: nowrap; flex: 1; }
        #cookie-editor-header h3 { margin: 0; font-size: 13px; font-weight: 600; color: #ffffff; line-height: 1; }
        #status-message { font-size: 10px; color: #98c379; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: normal; opacity: 0; transition: opacity 0.3s; max-width: 100px; }
        #cookie-editor-controls { display: flex; align-items: center; gap: 8px; flex-shrink: 0; height: 100%; }
        #cookie-editor-controls button { background: none; border: none; color: #abb2bf; font-size: 18px; cursor: pointer; line-height: 1; padding: 0; display: flex; align-items: center; justify-content: center; height: 100%; width: 20px; }
        #cookie-editor-controls button:hover { color: #ffffff; }
        #cookie-editor-content { padding: 8px; overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch; }
        .editor-field { margin-bottom: 8px; }
        .editor-field label { display: block; margin-bottom: 2px; font-weight: 500; color: #9da5b4; font-size: 11px; }
        .editor-field input, .editor-field textarea { width: 100%; padding: 4px 6px; background-color: #21252b; border: 1px solid #4f5b66; border-radius: 4px; color: #abb2bf; font-size: 12px; box-sizing: border-box; }
        .editor-field input:focus, .editor-field textarea:focus { outline: none; border-color: #61afef; }
        .editor-field textarea { min-height: 80px; resize: vertical; font-family: monospace; line-height: 1.3; }
        #cookie-editor-footer { padding: 8px; border-top: 1px solid #4f5b66; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 6px; }
        #cookie-editor-footer > div { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        button.action-btn { border: none; padding: 6px 10px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 11px; transition: background-color 0.2s; }
        #save-cookie-btn { background-color: #61afef; color: #282c34; }
        #quick-fill-btn { background-color: #4f5b66; color: #abb2bf; }
        #clear-site-data-btn { background-color: #e06c75; color: #282c34; }
        .sandbox-btn { flex: 1; background-color: #4f5b66; color: #abb2bf; border: none; padding: 4px 6px; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 10px; white-space: nowrap;}
        .sandbox-btn.danger { background-color: #e06c75; color: #282c34; }
        .activate-btn { background-color: #98c379 !important; color: #282c34 !important; }

        .json-search-container { position: relative; }
        #json-highlighter { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 4px 6px; box-sizing: border-box; color: transparent; overflow: auto; pointer-events: none; white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 12px; line-height: 1.3; z-index: 1; border: 1px solid transparent; }
        #json-data-area { background: transparent; position: relative; z-index: 2; caret-color: #abb2bf; }
        #json-highlighter .highlight { background-color: rgba(229, 192, 123, 0.5); border-radius: 2px; }
        #json-highlighter .highlight.active { background-color: rgba(152, 195, 121, 0.7); }
        #json-search-input { width: calc(100% - 90px); margin-bottom: 4px; display: inline-block; padding: 4px 6px; }
        .search-nav-btn { background: #4f5b66; border: none; color: #abb2bf; cursor: pointer; border-radius: 3px; width: 24px; height: 24px; line-height: 22px; padding: 0; margin-left: 2px; vertical-align: middle; }
        #json-search-status { display: inline-block; width: 45px; text-align: right; color: #9da5b4; font-size: 10px; vertical-align: middle; }

        /* SCORE & PERSONAL SPOILERS */
        .spoiler-header { padding: 6px; background-color: #21252b; border-radius: 4px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; border: 1px solid #4f5b66; }
        .spoiler-header label { font-size: 11px; font-weight: 500; color: #9da5b4; margin: 0; cursor: pointer; }
        .spoiler-toggle { font-size: 12px; font-weight: bold; color: #61afef; user-select: none; }
        .spoiler-content { display: none; padding-left: 5px; border-left: 2px solid #4f5b66; margin-bottom: 8px; }

        /* PERSONAL STATS UI */
        .personal-row { display: flex; gap: 4px; align-items: stretch; margin-bottom: 4px; flex-wrap: nowrap; }
        .mini-input-group { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; }
        .mini-input-group label { margin-bottom: 1px; font-size: 9px; display: block; text-align: left; }
        .mini-input-group input { width: 100%; text-align: center; color: #ffffff !important; font-weight: bold; padding: 4px; }
        /* BMI Styling aligned */
        #personal-bmi-value { font-size: 13px; font-weight: bold; color: #e5c07b; padding: 4px; display: block; text-align: center; line-height: 1.2; height: 100%; box-sizing: border-box; }

        .score-button-group { display: flex; gap: 2px; flex-wrap: wrap; justify-content: flex-start; }
        #funnel-btn-group { flex-wrap: nowrap; }
        #funnel-btn-group .funnel-set-btn { flex: 1 1 0; min-width: 0; padding: 4px 1px; font-size: 9px; }
        .score-set-btn { background-color: #4f5b66; color: #abb2bf; border: 1px solid #5a6470; border-radius: 3px; padding: 4px; font-size: 10px; cursor: pointer; transition: all 0.2s; font-weight: bold; flex-grow: 1; text-align: center; }
        .score-set-btn:hover { background-color: #5a6470; border-color: #61afef; color: #ffffff; }

        .score-display-wrapper { display: flex; justify-content: space-between; align-items: center; padding: 4px; background-color: #21252b; border-radius: 4px; margin-bottom: 2px; }
        .score-display-wrapper span { font-size: 11px; font-weight: bold; }
        .score-breakdown { font-size: 10px; color: #9da5b4; background-color: #2c313a; border-radius: 4px; padding: 4px; margin-top: 2px; display: none; line-height: 1.3; }
        #plan-score-formula-new { font-size: 10px; color: #9da5b4; display: block; margin-top: 2px; font-weight: normal; word-wrap: break-word; }

        /* SCREENS DROPDOWN (from sessionStorage funnelConfig), anchored to the activeTab field */
        #active-tab-wrap { position: relative; }
        #screens-dropdown { display: none; position: absolute; top: calc(100% + 3px); left: 0; z-index: 30; width: 252px; max-width: 84vw; background-color: #21252b; border: 1px solid #4f5b66; border-radius: 4px; box-shadow: 0 6px 16px rgba(0,0,0,0.55); padding: 5px; }
        #screens-dropdown.open { display: block; }
        #screens-hint { font-size: 9px; color: #7a8090; line-height: 1.3; margin-bottom: 4px; }
        #screens-config-meta { color: #9da5b4; font-weight: normal; font-size: 9px; }
        #screens-list { max-height: 170px; overflow-y: auto; border: 1px solid #3e4451; border-radius: 4px; background-color: #21252b; -webkit-overflow-scrolling: touch; }
        .screen-row { display: flex; align-items: center; gap: 5px; padding: 3px 5px; border-bottom: 1px solid #2c313a; cursor: pointer; font-size: 10px; line-height: 1.25; }
        .screen-row:last-child { border-bottom: none; }
        .screen-row:hover { background-color: #2c313a; }
        .screen-row.active { background-color: #3a4250; }
        .screen-idx { flex: 0 0 22px; text-align: right; color: #e5c07b; font-weight: bold; }
        .screen-name { flex: 1; color: #abb2bf; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .screen-row.active .screen-name { color: #ffffff; font-weight: bold; }
        #screens-empty { padding: 6px; color: #7a8090; font-size: 10px; line-height: 1.3; }

        button:disabled { opacity: 0.5; cursor: not-allowed; }
    `);

    // --- Panel HTML Structure ---
    const panel = document.createElement('div');
    panel.id = 'cookie-editor-panel';
    panel.innerHTML = `
        <div id="cookie-editor-header" data-handle="drag">
            <div id="cookie-editor-header-title-group">
                <h3>Cookie Editor</h3>
                <span id="status-message"></span>
            </div>
            <div id="cookie-editor-controls">
                <button id="toggle-cookie-editor" title="Collapse/Expand">-</button>
                <button id="close-cookie-editor" title="Close">×</button>
            </div>
        </div>
        <div id="cookie-editor-content">
            <div class="editor-field">
                <label>Set Funnel</label>
                <div class="score-button-group" id="funnel-btn-group">
                    <button class="score-set-btn funnel-set-btn" data-funnel="f1f123r">f1</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="w2f123r">w2</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="w3f123r">w3</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="w4f123r">w4</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="ap2f123r">ap2</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="cl2f123r">cl2f</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="cl3f123r">cl3f</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="m3f123r">m3f</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="cl2m123r">cl2</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="cl3m123r">cl3</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="m3m123r">m3m</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="d3m123r">d3</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="c2f23r">c2</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="chb2f23r">chb2</button>
                    <button class="score-set-btn funnel-set-btn" data-funnel="tch2f23r">tch2</button>
                </div>
            </div>

            <div class="editor-field">
                <label>Set Domain:</label>
                <div class="score-button-group" id="domain-btn-group">
                    <button class="score-set-btn domain-set-btn" data-domain="https://haf-frontend.stage.prokit.me/" title="https://haf-frontend.stage.prokit.me/">stage</button>
                    <button class="score-set-btn domain-set-btn" data-domain="https://plan.helloembody.com/" title="https://plan.helloembody.com/">plan-emb</button>
                    <button class="score-set-btn domain-set-btn" data-domain="https://join.helloembody.com/" title="https://join.helloembody.com/">join-emb</button>
                    <button class="score-set-btn domain-set-btn" data-domain="https://plan.startdrivn.com/" title="https://plan.startdrivn.com/">plan-drv</button>
                    <button class="score-set-btn domain-set-btn" data-domain="https://join.startdrivn.com/" title="https://join.startdrivn.com/">join-drv</button>
                </div>
            </div>

            <div class="editor-field" style="display:flex; gap:4px;">
                <div style="flex:1;" id="active-tab-wrap">
                    <label for="active-tab-input">activeTab:</label>
                    <input type="text" id="active-tab-input" placeholder="44 or paywall" autocomplete="off">
                    <div id="screens-dropdown">
                        <div id="screens-hint">Click a screen &#8594; sets activeTab to its name (string)<br><span id="screens-config-meta"></span></div>
                        <div style="display:flex; gap:4px; margin-bottom:4px;">
                            <input type="text" id="screens-filter-input" placeholder="Filter screens..." style="flex:1;">
                            <button id="refresh-screens-btn" class="sandbox-btn" style="flex:0 0 26px;" title="Reload funnelConfig from sessionStorage">&#8635;</button>
                        </div>
                        <div id="screens-list"></div>
                    </div>
                </div>
                <div style="flex:3;">
                    <label for="email-input">Email (personalInfo.email):</label>
                    <input type="email" id="email-input" placeholder="e.g., test@example.com">
                </div>
            </div>

            <div class="editor-field">
                <label for="json-data-area">Full Value (JSON):</label>
                <div>
                    <input type="text" id="json-search-input" placeholder="Search...">
                    <button class="search-nav-btn" id="search-prev-btn">↑</button>
                    <button class="search-nav-btn" id="search-next-btn">↓</button>
                    <span id="json-search-status"></span>
                </div>
                <div class="json-search-container">
                    <div id="json-highlighter"></div>
                    <textarea id="json-data-area"></textarea>
                </div>
            </div>

            <div class="spoiler-header" id="personal-spoiler-header">
                <label>Wellness Profile</label>
                <span class="spoiler-toggle">[+]</span>
            </div>
            <div class="spoiler-content" id="personal-spoiler-content">
                <div class="personal-row">
                    <div class="mini-input-group">
                        <label>Height</label>
                        <input type="number" id="personal-height" placeholder="170">
                    </div>
                    <div class="mini-input-group">
                        <label>Cur.W</label>
                        <input type="number" id="personal-weight" placeholder="60">
                    </div>
                    <div class="mini-input-group">
                        <label>Tar.W</label>
                        <input type="number" id="personal-target-weight" placeholder="55">
                    </div>
                    <div class="mini-input-group">
                        <label>Age</label>
                        <input type="number" id="personal-age" placeholder="30">
                    </div>
                    <div class="mini-input-group" style="text-align:center;">
                        <label>BMI</label>
                        <span id="personal-bmi-value">N/A</span>
                    </div>
                </div>

                <div class="score-display-wrapper" style="margin-bottom:6px;">
                    <label style="font-size:10px; display:block;">Goal Msg:</label>
                    <span id="goal-msg-val" style="color:#ffffff; font-weight:normal; font-size:10px;">...</span>
                </div>

                <div class="editor-field">
                    <label>Set Age Group:</label>
                    <div class="score-button-group" id="age-presets-container"></div>
                </div>

                <div class="editor-field">
                    <label>Weight Change:</label>
                    <div class="score-display-wrapper">
                        <span id="val-weight-change" style="font-size:10px; font-weight:normal; max-width:60%; overflow:hidden; text-overflow:ellipsis;">...</span>
                    </div>
                    <div class="score-button-group" style="justify-content: flex-end;">
                        <button class="score-set-btn" data-key="weightChange" data-value="I gain and lose weight easily">Gain/Lose Easy</button>
                        <button class="score-set-btn" data-key="weightChange" data-value="I struggle to gain weight and <br> muscle">Struggle Gain</button>
                        <button class="score-set-btn" data-key="weightChange" data-value="I gain weight quickly but lose it <br> slowly">Gain Quick/Lose Slow</button>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Body Fat (bodyCurrent):</label>
                    <div class="score-display-wrapper">
                        <span id="val-body-current" style="color: #61afef;">...</span>
                        <span id="val-fat-percent" style="color: #e5c07b; font-size:10px;"></span>
                    </div>
                    <div class="score-button-group" id="body-current-btn-group" style="justify-content: flex-end;">
                        <button class="score-set-btn" data-key="bodyCurrent" data-value="Toned">Toned</button>
                        <button class="score-set-btn" data-key="bodyCurrent" data-value="Slim">Slim</button>
                        <button class="score-set-btn" data-key="bodyCurrent" data-value="Medium Build">Medium</button>
                        <button class="score-set-btn" data-key="bodyCurrent" data-value="Plus-sized">Plus</button>
                        <button class="score-set-btn" data-key="bodyCurrent" data-value="Overweight">Over</button>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Daily Activity:</label>
                    <div class="score-display-wrapper">
                        <span id="val-daily-activity" style="font-size:10px; font-weight:normal;">...</span>
                    </div>
                    <div class="score-button-group" style="justify-content: flex-end;">
                        <button class="score-set-btn" data-key="dailyActivityLevel" data-value="Mostly sedentary">Sedentary</button>
                        <button class="score-set-btn" data-key="dailyActivityLevel" data-value="Lightly active">Light</button>
                        <button class="score-set-btn" data-key="dailyActivityLevel" data-value="Moderately active">Mod</button>
                        <button class="score-set-btn" data-key="dailyActivityLevel" data-value="Very active">Very</button>
                        <button class="score-set-btn" data-key="dailyActivityLevel" data-value="Highly active">High</button>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Walking Activity:</label>
                    <div class="score-display-wrapper">
                        <span id="val-walking-activity" style="font-size:10px; font-weight:normal;">...</span>
                    </div>
                    <div class="score-button-group" style="justify-content: flex-end;">
                        <button class="score-set-btn" data-key="walkingActivityLevel" data-value="Less than 1 hour">&lt; 1hr</button>
                        <button class="score-set-btn" data-key="walkingActivityLevel" data-value="1-2 hours">1-2hr</button>
                        <button class="score-set-btn" data-key="walkingActivityLevel" data-value="More than 2 hours">&gt; 2hr</button>
                    </div>
                </div>

                <div class="editor-field">
                    <div class="score-display-wrapper">
                        <label style="font-size:10px;">Metabolism:</label>
                        <span id="meta-val" style="color:#98c379;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:10px;">Somatotype:</label>
                        <span id="soma-val" style="color:#c678dd;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:10px;">Lifestyle:</label>
                        <span id="life-val" style="color:#61afef;">...</span>
                    </div>
                    <div class="score-display-wrapper" id="prog-level-row" style="display:none;">
                        <label style="font-size:10px;" id="prog-level-label">Prog Level:</label>
                        <span id="prog-level-val" style="color:#61afef;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:10px;">Fitness Level:</label>
                        <span id="fit-level-val" style="color:#e5c07b;">...</span>
                    </div>
                </div>
            </div>

            <div class="spoiler-header" id="score-spoiler-header">
                <label>Score Calculations</label>
                <span class="spoiler-toggle">[+]</span>
            </div>
            <div class="spoiler-content" id="score-spoiler-content">
                <div class="editor-field">
                    <label>💯Flexibility score:</label>
                    <div id="flexibility-score-status" class="score-display-wrapper">
                        <span id="flexibility-score-value" style="color: #e5c07b;">N/A</span>
                        <div class="score-button-group" id="flex-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="flexibilityLevel" data-value="I can’t reach the floor" title="0">0</button>
                            <button class="score-set-btn" data-key="flexibilityLevel" data-value="I can touch the floor with my fingertips" title="0.55">0.55</button>
                            <button class="score-set-btn" data-key="flexibilityLevel" data-value="I can place my palms flat on the floor" title="1">1</button>
                        </div>
                    </div>
                    <div id="flex-score-breakdown" class="score-breakdown"></div>
                </div>

                <div class="editor-field">
                    <label>💯yoga/pilates score:</label>
                    <div id="yoga-pilates-score-status" class="score-display-wrapper">
                        <span id="yoga-pilates-score-value" style="color: #c678dd;">N/A</span>
                        <div class="score-button-group" id="yoga-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="New to yoga" title="0">0</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Beginner" title="0.4">0.4</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Intermediate" title="0.6">0.6</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Advanced" title="1">1</button>
                        </div>
                    </div>
                    <div id="yoga-score-breakdown" class="score-breakdown"></div>
                </div>

                <div class="editor-field">
                    <label>💯Upper Body Flex:</label>
                    <div id="upper-flex-status" class="score-display-wrapper">
                        <span id="upper-flex-value" style="color: #e5c07b;">N/A</span>
                        <div class="score-button-group" id="upper-flex-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="upperBodyFlexibility" data-value="My hands are far apart, can't reach or touch" title="Far apart">Far</button>
                            <button class="score-set-btn" data-key="upperBodyFlexibility" data-value="My hands get close, a few inches apart" title="Get close">Close</button>
                            <button class="score-set-btn" data-key="upperBodyFlexibility" data-value="My fingertips can touch" title="Fingertips touch">Touch</button>
                            <button class="score-set-btn" data-key="upperBodyFlexibility" data-value="My fingers can overlap or clasp together" title="Overlap">Overlap</button>
                        </div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>💯Knee Push-ups:</label>
                    <div id="push-ups-status" class="score-display-wrapper">
                        <span id="push-ups-value" style="color: #c678dd;">N/A</span>
                        <div class="score-button-group" id="push-ups-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="kneePushUpsLevel" data-value="Haven’t tried" title="Haven’t tried">None</button>
                            <button class="score-set-btn" data-key="kneePushUpsLevel" data-value="Fewer 4" title="0-4 push-ups">0-4</button>
                            <button class="score-set-btn" data-key="kneePushUpsLevel" data-value="5-10" title="5-10 push-ups">5-10</button>
                            <button class="score-set-btn" data-key="kneePushUpsLevel" data-value="11-20" title="11-20 push-ups">11-20</button>
                            <button class="score-set-btn" data-key="kneePushUpsLevel" data-value="More than 20" title="21+ push-ups">21+</button>
                        </div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>🏋️ Squats Level:</label>
                    <div id="squats-status" class="score-display-wrapper">
                        <span id="squats-value" style="color: #e5c07b;">N/A</span>
                        <div class="score-button-group" id="squats-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="squatsLevel" data-value="I can’t do squats" title="I can’t do squats">None</button>
                            <button class="score-set-btn" data-key="squatsLevel" data-value="Fewer 12" title="Fewer than 12 squats">&lt;12</button>
                            <button class="score-set-btn" data-key="squatsLevel" data-value="13-20" title="13-20 squats">13-20</button>
                            <button class="score-set-btn" data-key="squatsLevel" data-value="More than 20" title="More than 20 squats">20+</button>
                        </div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>🪜 Stairs Level:</label>
                    <div id="stairs-status" class="score-display-wrapper">
                        <span id="stairs-value" style="color: #56b6c2;">N/A</span>
                        <div class="score-button-group" id="stairs-btn-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="stairsLevel" data-value="Out of breath after few steps" title="Out of breath after few steps">Steps</button>
                            <button class="score-set-btn" data-key="stairsLevel" data-value="Out of breath after 1-2 flights" title="Out of breath after 1-2 flights">1-2fl</button>
                            <button class="score-set-btn" data-key="stairsLevel" data-value="Slightly winded after several flights" title="Slightly winded after several flights">Sev</button>
                            <button class="score-set-btn" data-key="stairsLevel" data-value="Fine, no issues" title="Fine, no issues">Fine</button>
                        </div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Exercise Activity Level:</label>
                    <div class="score-display-wrapper">
                        <div class="score-button-group" style="justify-content: flex-end;">
                            <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="I haven’t exercised for a long time">0</button>
                            <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Occasionally">0.2</button>
                            <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Regularly">0.5</button>
                            <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Often">0.8</button>
                            <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Almost daily">1</button>
                        </div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>🆕 Fitness Level (New — Wellness):</label>
                    <div id="new-fitness-status" style="padding: 4px; background-color: #21252b; border-radius: 4px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span id="new-fitness-value" style="font-size: 13px; font-weight: bold; color: #98c379;">N/A</span>
                            <span id="new-fitness-label" style="font-size: 11px; color: #e5c07b; font-weight: bold;"></span>
                        </div>
                        <span id="new-fitness-age-bucket" style="font-size: 10px; color: #9da5b4; display: block; margin-top: 2px;">Age bucket: N/A</span>
                        <span id="new-fitness-formula" style="font-size: 10px; color: #9da5b4; display: block; margin-top: 1px; word-wrap: break-word;">(Requires age + 5 answers)</span>
                    </div>
                    <div id="new-fitness-breakdown" class="score-breakdown" style="line-height: 1.5; display: block;"></div>
                </div>

                <div class="editor-field">
                    <label>Plan Score:</label>
                    <div id="plan-score-status" style="padding: 4px; background-color: #21252b; border-radius: 4px; font-size: 11px;">
                        <div style="font-size:10px; color:#9da5b4; margin-bottom:3px; word-wrap:break-word;">
                            Formula: (flex × 0.4 + yoga × 1.0 + fitnessScore × 0.6) / 2.0
                        </div>
                        <span id="plan-score-value-new" style="color: #61afef; font-weight: bold;">N/A</span>
                        <div id="plan-score-formula-new" style="font-size:10px; color:#9da5b4; word-wrap:break-word;">(Calculation requires valid data)</div>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Assigned Plan:</label>
                    <div id="assigned-plan-status" style="padding: 4px; background-color: #21252b; border-radius: 4px; font-size: 11px;">
                        <span id="assigned-plan-value-new" style="color: #61afef; font-weight: bold;">N/A</span>
                    </div>
                </div>

                <div class="editor-field">
                    <label>🆕 New Plan Logic:</label>
                    <div id="new-plan-status" style="padding: 4px; background-color: #21252b; border-radius: 4px; font-size: 10px; line-height: 1.6; color: #9da5b4;">
                        <div><span style="color:#abb2bf;">Step 0 Combined:</span> <span id="new-plan-combined">N/A</span></div>
                        <div><span style="color:#abb2bf;">Step 1 Base:</span> <span id="new-plan-base">N/A</span></div>
                        <div><span style="color:#abb2bf;">Step 2 Age:</span> <span id="new-plan-age">N/A</span></div>
                        <div><span style="color:#abb2bf;">Step 3 BMI:</span> <span id="new-plan-bmi">N/A</span></div>
                        <div><span style="color:#abb2bf;">Step 4 Override:</span> <span id="new-plan-override">N/A</span></div>
                        <div style="margin-top:4px; border-top:1px solid #3e4451; padding-top:4px;">
                            <span style="color:#abb2bf;">→ Final:</span> <span id="new-plan-final" style="color:#61afef; font-weight:bold; font-size:11px;">N/A</span>
                        </div>
                    </div>
                </div>
            </div>

            <hr style="border-color: #4f5b66; margin: 10px 0;">

            <div class="editor-field" id="sandbox-container">
                <label>Sandbox Cookie ('sandbox_test'):</label>
                <div id="sandbox-status" style="margin-bottom: 6px; padding: 4px; background-color: #21252b; border-radius: 4px; font-size: 10px;">
                    Current value: <strong id="sandbox-value" style="color: #e5c07b;">Not set</strong>
                </div>
                <div id="sandbox-controls" style="display: flex; gap: 6px;">
                    <button id="set-sandbox-true-btn" class="sandbox-btn">Set 'true'</button>
                    <button id="delete-sandbox-btn" class="sandbox-btn danger">Delete</button>
                </div>
            </div>

            <div class="editor-field">
                <label>Discount Controls:</label>
                <div style="margin-top:4px; display:flex; gap:6px;">
                    <button id="discount-activate-btn" class="sandbox-btn activate-btn">Activate Discount (+10m)</button>
                    <button id="discount-expire-btn" class="sandbox-btn danger">Expire Now</button>
                </div>
            </div>

            <div class="editor-field">
                <label>Marketing Params:</label>
                <div style="display:flex; gap:4px; align-items: flex-start; margin-top:2px;">
                    <div style="flex:1; display:flex; flex-direction:column; gap:2px;">
                        <button id="add-meta-param" class="sandbox-btn" style="width:100%; padding:4px 0;">Meta</button>
                        <div id="meta-pixel-id" style="font-size:7px; color:#9da5b4; text-align:center; word-break:break-all; line-height:1;">...</div>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column; gap:2px;">
                        <button id="add-tiktok-param" class="sandbox-btn" style="width:100%; padding:4px 0;">TikTok</button>
                        <div id="tiktok-pixel-id" style="font-size:7px; color:#9da5b4; text-align:center; word-break:break-all; line-height:1;">...</div>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column; gap:2px;">
                        <button id="add-google-params" class="sandbox-btn" style="width:100%; padding:4px 0;">Google</button>
                        <div id="google-id" style="font-size:7px; color:#9da5b4; text-align:center; word-break:break-all; line-height:1;">...</div>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column;">
                        <button id="add-ads-params" class="sandbox-btn" style="width:100%; padding:4px 0;">Ads</button>
                    </div>
                    <div style="flex:1; display:flex; flex-direction:column;">
                        <button id="toggle-is-test" class="sandbox-btn" style="width:100%; padding:4px 0; display:flex; align-items:center; justify-content:center;">Test:<span id="is-test-status" style="color:#e5c07b; margin-left:2px;">...</span></button>
                    </div>
                </div>
            </div>

            <hr style="border-color: #4f5b66; margin: 10px 0;">

            <div class="editor-field" id="feature-flags-container">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <label style="margin:0; display:flex; align-items:center; gap:4px;">
                        Feature Flags (Session Storage):
                        <button id="refresh-flags-btn" style="background:none; border:none; color:#61afef; cursor:pointer; padding:0; line-height:1; font-size:12px;" title="Refresh flags manually">↻</button>
                    </label>
                    <button id="toggle-is-firebase" class="sandbox-btn" style="width:auto; padding:4px 6px; margin:0; display:flex; align-items:center;">FB Override:<span id="is-firebase-status" style="color:#e5c07b; margin-left:2px;">...</span></button>
                </div>
                <textarea id="feature-flags-area" style="min-height: 70px; resize: vertical; font-family: monospace; font-size: 11px;" placeholder='{\n  "featureFlags": {\n    "is_paypal_enabled": false,\n    "is_upsell_enabled": false\n  }\n}'></textarea>
            </div>
        </div>
        <div id="cookie-editor-footer">
             <div>
                <button id="save-cookie-btn" class="action-btn">Save Data</button>
                <button id="quick-fill-btn" class="action-btn">Quick Fill</button>
            </div>
            <div>
                 <button id="clear-site-data-btn" class="action-btn">Clear Data</button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);

    // --- UI Elements ---
    const activeTabInput = panel.querySelector('#active-tab-input');
    const emailInput = panel.querySelector('#email-input');
    const discountActivateBtn = panel.querySelector('#discount-activate-btn');
    const discountExpireBtn = panel.querySelector('#discount-expire-btn');
    const jsonDataArea = panel.querySelector('#json-data-area');
    const saveBtn = panel.querySelector('#save-cookie-btn');
    const quickFillBtn = panel.querySelector('#quick-fill-btn');
    const clearSiteDataBtn = panel.querySelector('#clear-site-data-btn');
    const statusMsg = panel.querySelector('#status-message');
    const toggleBtn = panel.querySelector('#toggle-cookie-editor');
    const sandboxValue = panel.querySelector('#sandbox-value');
    const setSandboxTrueBtn = panel.querySelector('#set-sandbox-true-btn');
    const deleteSandboxBtn = panel.querySelector('#delete-sandbox-btn');
    const activeTabWrap = panel.querySelector('#active-tab-wrap');
    const screensDropdown = panel.querySelector('#screens-dropdown');
    const screensConfigMeta = panel.querySelector('#screens-config-meta');
    const screensFilterInput = panel.querySelector('#screens-filter-input');
    const screensList = panel.querySelector('#screens-list');
    const refreshScreensBtn = panel.querySelector('#refresh-screens-btn');

    const jsonSearchInput = panel.querySelector('#json-search-input');
    const jsonSearchStatus = panel.querySelector('#json-search-status');
    const jsonHighlighter = panel.querySelector('#json-highlighter');
    const searchPrevBtn = panel.querySelector('#search-prev-btn');
    const searchNextBtn = panel.querySelector('#search-next-btn');

    // Marketing Elements
    const addMetaParamBtn = panel.querySelector('#add-meta-param');
    const addTikTokParamBtn = panel.querySelector('#add-tiktok-param');
    const metaPixelIdSpan = panel.querySelector('#meta-pixel-id');
    const tiktokPixelIdSpan = panel.querySelector('#tiktok-pixel-id');
    const googleIdSpan = panel.querySelector('#google-id');
    const addGoogleParamsBtn = panel.querySelector('#add-google-params');
    const addAdsParamsBtn = panel.querySelector('#add-ads-params');
    const toggleIsTestBtn = panel.querySelector('#toggle-is-test');
    const isTestStatusSpan = panel.querySelector('#is-test-status');

    // Feature Flags Elements
    const featureFlagsArea = panel.querySelector('#feature-flags-area');
    const toggleIsFirebaseBtn = panel.querySelector('#toggle-is-firebase');
    const isFirebaseStatusSpan = panel.querySelector('#is-firebase-status');
    const refreshFlagsBtn = panel.querySelector('#refresh-flags-btn');

    // Personal UI
    const pHeight = panel.querySelector('#personal-height');
    const pWeight = panel.querySelector('#personal-weight');
    const pTargetWeight = panel.querySelector('#personal-target-weight');
    const pAge = panel.querySelector('#personal-age');
    const pBmi = panel.querySelector('#personal-bmi-value');
    const valWeightChange = panel.querySelector('#val-weight-change');
    const valBodyCurrent = panel.querySelector('#val-body-current');
    const valFatPercent = panel.querySelector('#val-fat-percent');
    const valDailyActivity = panel.querySelector('#val-daily-activity');
    const valWalkingActivity = panel.querySelector('#val-walking-activity');
    const metaVal = panel.querySelector('#meta-val');
    const somaVal = panel.querySelector('#soma-val');
    const lifeVal = panel.querySelector('#life-val');
    const fitLevelVal = panel.querySelector('#fit-level-val');
    const progLevelRow = panel.querySelector('#prog-level-row');
    const progLevelLabel = panel.querySelector('#prog-level-label');
    const progLevelVal = panel.querySelector('#prog-level-val');
    const goalMsgVal = panel.querySelector('#goal-msg-val');
    const agePresetsContainer = panel.querySelector('#age-presets-container');

    // Score UI
    const flexibilityScoreValue = panel.querySelector('#flexibility-score-value');
    const yogaPilatesScoreValue = panel.querySelector('#yoga-pilates-score-value');
    const planScoreValueNew = panel.querySelector('#plan-score-value-new');
    const planScoreFormulaNew = panel.querySelector('#plan-score-formula-new');
    const assignedPlanValueNew = panel.querySelector('#assigned-plan-value-new');
    const newPlanCombined = panel.querySelector('#new-plan-combined');
    const newPlanBase = panel.querySelector('#new-plan-base');
    const newPlanAge = panel.querySelector('#new-plan-age');
    const newPlanBmi = panel.querySelector('#new-plan-bmi');
    const newPlanOverride = panel.querySelector('#new-plan-override');
    const newPlanFinal = panel.querySelector('#new-plan-final');
    const flexScoreBreakdown = panel.querySelector('#flex-score-breakdown');
    const yogaScoreBreakdown = panel.querySelector('#yoga-score-breakdown');

    // Spoilers
    const scoreSpoilerHeader = panel.querySelector('#score-spoiler-header');
    const scoreSpoilerContent = panel.querySelector('#score-spoiler-content');
    const scoreSpoilerToggle = panel.querySelector('#score-spoiler-header .spoiler-toggle');
    const personalSpoilerHeader = panel.querySelector('#personal-spoiler-header');
    const personalSpoilerContent = panel.querySelector('#personal-spoiler-content');
    const personalSpoilerToggle = panel.querySelector('#personal-spoiler-header .spoiler-toggle');

    let matches = [];
    let currentMatchIndex = -1;

    // --- Helpers ---
    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function generateRandomDigits(length) {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    }

    function getFunnelIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('funnel') || 'f1f123r';
    }

    // --- Logic: Funnel Switcher ---
    panel.querySelectorAll('.funnel-set-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const f = e.target.dataset.funnel;
            const url = new URL(window.location.href);
            url.searchParams.set('funnel', f);
            window.location.href = url.toString();
        });
    });

    // --- Logic: Domain Switcher (same principle as the funnel switcher: change one
    // URL component, carry over path/query/hash as-is) ---
    panel.querySelectorAll('.domain-set-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const target = new URL(e.target.dataset.domain);
            const url = new URL(window.location.href);
            url.protocol = target.protocol;
            url.host = target.host;
            window.location.href = url.toString();
        });
    });

    // --- Logic: Marketing Params & Feature Flags URL toggles ---
    function updateUrlTogglesDisplay() {
        const url = new URL(window.location.href);

        // is_test
        if (url.searchParams.get('is_test') === 'true') {
            isTestStatusSpan.textContent = 'ON';
            isTestStatusSpan.style.color = '#98c379';
        } else {
            isTestStatusSpan.textContent = 'OFF';
            isTestStatusSpan.style.color = '#e06c75';
        }

        // is_firebase
        if (url.searchParams.get('is_firebase') === 'true') {
            isFirebaseStatusSpan.textContent = 'ON';
            isFirebaseStatusSpan.style.color = '#98c379';
        } else {
            isFirebaseStatusSpan.textContent = 'OFF';
            isFirebaseStatusSpan.style.color = '#e06c75';
        }
    }

    let marketingListenersAttached = false;
    function initMarketingParams() {
        const hostname = window.location.hostname;
        const isProd = hostname === 'plan.helloembody.com' || hostname === 'join.helloembody.com';
        const funnelId = getFunnelIdFromUrl();

        // Pixel IDs
        let metaId = isProd ? '1778552282789473' : '716048184868331';
        if (isProd && funnelId === 'w4f123r') {
            metaId = '859170810531270';
        }
        if (isProd && (funnelId === 'cl2f123r' || funnelId === 'cl3f123r' || funnelId === 'm3f123r')) {
            metaId = '26330763906599636';
        }
        if (isProd && isMaleFunnelId(funnelId)) {
            metaId = '900395853019244';
        }
        let tiktokId = isProd ? 'D4VTKSJC77U2LK24AEH0' : 'D429PVRC77UA61AHKL50';
        if (isProd && (funnelId === 'cl2f123r' || funnelId === 'cl3f123r' || funnelId === 'm3f123r')) {
            tiktokId = 'D9F2L4RC77UBS5FSICAG';
        }
        const googleId = isProd ? 'G-REC4M3ETTJ' : 'G-H7317R4WLJ';
        if (isProd && isMaleFunnelId(funnelId)) {
            tiktokId = 'D9F30BRC77UBS5FSID6G';
        }

        metaPixelIdSpan.textContent = metaId;
        tiktokPixelIdSpan.textContent = tiktokId;
        googleIdSpan.textContent = googleId;

        if (!marketingListenersAttached) {
            addMetaParamBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                url.searchParams.set('utm_source', 'meta');
                url.searchParams.set('fbclid', generateRandomString(20));
                url.searchParams.delete('ttclid');
                window.history.replaceState({}, '', url.toString());
                showStatus('Meta params added');
            });

            addTikTokParamBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                url.searchParams.set('utm_source', 'tiktok');
                url.searchParams.set('ttclid', generateRandomString(20));
                url.searchParams.delete('fbclid');
                window.history.replaceState({}, '', url.toString());
                showStatus('TikTok params added');
            });

            addGoogleParamsBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                const pick = arr => arr[Math.floor(Math.random() * arr.length)];
                const keywords = ['best+fitness+plan', 'online+workout+program', 'weight+loss+classes', 'chair+yoga+online', 'wall+pilates+workout', 'buy+best+fitness+equipment'];

                url.searchParams.set('utm_source', 'google');
                url.searchParams.set('adgroup_id', generateRandomDigits(7));
                url.searchParams.set('keyword', pick(keywords));
                url.searchParams.set('matchtype', pick(['b', 'e', 'p']));
                url.searchParams.set('device', pick(['m', 'c', 't']));
                url.searchParams.set('network', pick(['g', 's', 'd']));
                url.searchParams.set('target', generateRandomDigits(7));
                url.searchParams.set('loc_interest_ms', generateRandomDigits(7));
                url.searchParams.set('loc_physical_ms', generateRandomDigits(7));
                url.searchParams.set('feeditemid', generateRandomDigits(5));
                url.searchParams.set('adposition', pick(['1', '2', '3', '4']));
                url.searchParams.set('gclid', generateRandomString(20));
                url.searchParams.set('gclsrc', 'aw.ds');
                url.searchParams.set('ad_id', generateRandomString(16));
                url.searchParams.set('adset_id', generateRandomString(16));
                url.searchParams.set('campaign_id', generateRandomDigits(16));
                url.searchParams.set('utm_id', generateRandomString(16));
                url.searchParams.set('site_source_name', generateRandomString(10));
                url.searchParams.set('placement', generateRandomString(10));
                url.searchParams.set('utm_campaign', generateRandomString(12));
                url.searchParams.set('utm_content', generateRandomString(12));
                url.searchParams.set('utm_term', generateRandomString(12));
                url.searchParams.set('utm_medium', pick(['cpc', 'cpm', 'cpv']));
                url.searchParams.delete('fbclid');
                url.searchParams.delete('ttclid');
                window.history.replaceState({}, '', url.toString());
                showStatus('Google params added');
            });

            addAdsParamsBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                const adId = generateRandomDigits(16);
                const campId = generateRandomDigits(16);
                const adsetId = generateRandomDigits(16);

                url.searchParams.set('utm_term', `${adId}NAME__`);
                url.searchParams.set('campaign_id', campId);
                url.searchParams.set('adset_id', adsetId);
                url.searchParams.set('ad_id', adId);
                url.searchParams.set('site_source_name', '__SITE_SOURCE_NAME__');
                url.searchParams.set('utm_medium', 'cpm');
                url.searchParams.set('utm_id', campId);
                url.searchParams.set('utm_content', 'test_wallpilates_w2_broad_19Nov');
                url.searchParams.set('utm_campaign', 'USA_Test_WallPilates_19Nov');

                window.history.replaceState({}, '', url.toString());
                showStatus('Ads params added');
            });

            toggleIsTestBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                if (url.searchParams.get('is_test') === 'true') {
                    url.searchParams.set('is_test', 'false');
                } else {
                    url.searchParams.set('is_test', 'true');
                }
                window.history.replaceState({}, '', url.toString());
                updateUrlTogglesDisplay();
                showStatus('is_test toggled');
            });

            toggleIsFirebaseBtn.addEventListener('click', () => {
                const url = new URL(window.location.href);
                if (url.searchParams.get('is_firebase') === 'true') {
                    url.searchParams.set('is_firebase', 'false');
                } else {
                    url.searchParams.set('is_firebase', 'true');
                }
                window.history.replaceState({}, '', url.toString());
                updateUrlTogglesDisplay();
                showStatus('is_firebase toggled');
            });

            marketingListenersAttached = true;
        }

        updateUrlTogglesDisplay();
    }

    // --- Logic: Feature Flags (Session Storage) ---
    function loadFeatureFlags() {
        if (document.activeElement === featureFlagsArea) return;

        const storedFlags = sessionStorage.getItem('featureFlags');
        if (storedFlags !== null) {
            try {
                if (storedFlags.trim() === '') {
                    featureFlagsArea.value = '';
                } else {
                    const parsed = JSON.parse(storedFlags);
                    featureFlagsArea.value = JSON.stringify(parsed, null, 2);
                }
            } catch(e) {
                featureFlagsArea.value = storedFlags;
            }
        } else {
            featureFlagsArea.value = '';
        }
    }

    refreshFlagsBtn.addEventListener('click', () => {
        const activeElem = document.activeElement;
        if (activeElem === featureFlagsArea) {
            featureFlagsArea.blur();
        }
        loadFeatureFlags();
        showStatus('Flags Refreshed!');
    });

    // --- Logic: Spoiler Persistence ---
    function restoreSpoilers() {
        const pOpen = localStorage.getItem(config.storageKeys.personalSpoiler) === 'true';
        const sOpen = localStorage.getItem(config.storageKeys.scoreSpoiler) === 'true';

        if (pOpen) {
            personalSpoilerContent.style.display = 'block';
            personalSpoilerToggle.textContent = '[-]';
        }
        if (sOpen) {
            scoreSpoilerContent.style.display = 'block';
            scoreSpoilerToggle.textContent = '[-]';
        }
    }

    // --- Logic: Remember manually resized textarea heights ---
    // The browser writes the dragged size into the inline style, so that is what we store.
    function persistTextareaHeight(el, storageKey) {
        if (!el) return;

        const saved = localStorage.getItem(storageKey);
        if (saved) el.style.height = saved;

        const save = () => {
            const h = el.style.height;
            if (h && h !== localStorage.getItem(storageKey)) localStorage.setItem(storageKey, h);
        };

        // A resize drag can end with the pointer outside the textarea, so listen on the document.
        document.addEventListener('mouseup', save);
        document.addEventListener('touchend', save);

        // ResizeObserver also catches resizes that end outside a pointer gesture.
        if (typeof ResizeObserver !== 'undefined') {
            let timer = null;
            const observer = new ResizeObserver(() => {
                clearTimeout(timer);
                timer = setTimeout(save, 250);
            });
            observer.observe(el);
        }
    }

    function restoreTextareaHeights() {
        persistTextareaHeight(jsonDataArea, config.storageKeys.jsonAreaHeight);
        persistTextareaHeight(featureFlagsArea, config.storageKeys.flagsAreaHeight);
    }

    // --- Logic: Screens list (sessionStorage 'funnelConfig') ---
    // activeTab accepts BOTH a number (index in screensOrder) and a string (screen name),
    // since the frontend refactor now writes values like "paywall" into the cookie.
    let currentScreensOrder = null;

    function parseActiveTabValue(raw) {
        const t = String(raw == null ? '' : raw).trim();
        if (t === '') return null;
        if (/^-?\d+$/.test(t)) return parseInt(t, 10);
        return t;
    }

    function getCurrentActiveTab() {
        try { return JSON.parse(jsonDataArea.value).activeTab; } catch (e) { return undefined; }
    }

    function renderScreensList() {
        if (!screensList) return;
        screensList.innerHTML = '';

        if (!currentScreensOrder) {
            const empty = document.createElement('div');
            empty.id = 'screens-empty';
            empty.textContent = 'No screens: sessionStorage "funnelConfig" is missing or has no config.screensOrder. Open a funnel page, then press the refresh button.';
            screensList.appendChild(empty);
            return;
        }

        const filter = (screensFilterInput.value || '').trim().toLowerCase();
        const current = getCurrentActiveTab();
        const frag = document.createDocumentFragment();
        let shown = 0;

        currentScreensOrder.forEach((name, idx) => {
            const label = String(name);
            if (filter && !label.toLowerCase().includes(filter) && String(idx) !== filter) return;
            shown++;

            const row = document.createElement('div');
            // clicking a row now sets activeTab to the screen NAME (string), not its index —
            // the index badge is still shown for reference, but is no longer a separate control
            row.className = 'screen-row' + ((current === idx || current === label) ? ' active' : '');
            row.dataset.value = idx;
            row.dataset.name = label;
            row.title = 'Set activeTab = ' + JSON.stringify(label);

            const idxEl = document.createElement('span');
            idxEl.className = 'screen-idx';
            idxEl.textContent = idx;

            const nameEl = document.createElement('span');
            nameEl.className = 'screen-name';
            nameEl.textContent = label;

            row.appendChild(idxEl);
            row.appendChild(nameEl);
            frag.appendChild(row);
        });

        if (shown === 0) {
            const empty = document.createElement('div');
            empty.id = 'screens-empty';
            empty.textContent = 'Nothing matches the filter.';
            screensList.appendChild(empty);
            return;
        }
        screensList.appendChild(frag);
    }

    function loadFunnelConfigScreens() {
        const raw = sessionStorage.getItem('funnelConfig');
        currentScreensOrder = null;
        let meta = '(funnelConfig not found)';

        if (raw) {
            try {
                const parsed = JSON.parse(raw);
                const order = parsed && parsed.config && parsed.config.screensOrder;
                if (Array.isArray(order)) {
                    currentScreensOrder = order;
                    meta = '(' + (parsed.funnelId ? parsed.funnelId + ', ' : '') + order.length + ' screens)';
                } else {
                    meta = '(no config.screensOrder)';
                }
            } catch (e) {
                meta = '(funnelConfig: invalid JSON)';
            }
        }
        screensConfigMeta.textContent = meta;
        renderScreensList();
    }

    function setActiveTabValue(value) {
        try {
            const data = JSON.parse(jsonDataArea.value);
            data.activeTab = value;
            jsonDataArea.value = JSON.stringify(data, null, 2);
            activeTabInput.value = value;
            updateHighlights();
            renderScreensList();
            showStatus('activeTab = ' + value);
        } catch (e) {
            showStatus('Invalid JSON!', true);
        }
    }

    function openScreensDropdown() {
        if (screensDropdown.classList.contains('open')) return;
        screensFilterInput.value = '';
        loadFunnelConfigScreens();
        screensDropdown.classList.add('open');
    }

    function closeScreensDropdown() {
        screensDropdown.classList.remove('open');
    }

    activeTabInput.addEventListener('focus', openScreensDropdown);
    activeTabInput.addEventListener('click', openScreensDropdown);

    activeTabInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeScreensDropdown();
    });

    // close when clicking anywhere outside the activeTab field + dropdown
    document.addEventListener('click', (e) => {
        if (!activeTabWrap.contains(e.target)) closeScreensDropdown();
    });

    screensList.addEventListener('click', (e) => {
        const row = e.target.closest('.screen-row');
        if (!row) return;
        e.preventDefault();
        setActiveTabValue(row.dataset.name);
        closeScreensDropdown();
    });

    screensFilterInput.addEventListener('input', renderScreensList);

    refreshScreensBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        loadFunnelConfigScreens();
        showStatus('Screens reloaded');
    });

    // --- Logic: Age Presets ---
    function renderAgePresets() {
        const funnel = getFunnelIdFromUrl();
        let presets = [];
        if (funnel === 'chb2f23r' || funnel === 'c2f23r' || funnel === 'tch2f23r') {
            presets = [
                { val: 40, label: "40-49" },
                { val: 50, label: "50-59" },
                { val: 60, label: "60-69" },
                { val: 70, label: "70+" }
            ];
        } else {
            presets = [
                { val: 18, label: "18-29" },
                { val: 30, label: "30-39" },
                { val: 40, label: "40-49" },
                { val: 50, label: "50+" }
            ];
        }

        agePresetsContainer.innerHTML = '';
        presets.forEach(p => {
            const btn = document.createElement('button');
            btn.className = 'score-set-btn';
            btn.textContent = p.label;
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                updateAgeJson(p.val, p.label);
            });
            agePresetsContainer.appendChild(btn);
        });
    }

    function updateAgeJson(age, label) {
        try {
            let data = JSON.parse(jsonDataArea.value);
            data.selectedAge = age;
            data.selectedAgeValue = label;
            if(!data.personalInfo) data.personalInfo = {};
            if(!data.personalInfo.age) data.personalInfo.age = { selectedUnit: "years" };
            data.personalInfo.age.value = age;

            jsonDataArea.value = JSON.stringify(data, null, 2);
            calculateAndDisplayScore();
            showStatus(`Age set to ${label}`);
        } catch(e) { showStatus('Error setting age'); }
    }

    // --- Helper Functions ---
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return null;
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = `${name}=${value || ""}${expires}; path=/`;
    }

    function clearAllCookies() {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf("=");
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name.trim() + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
        }
    }

    function showStatus(message, isError = false) {
        statusMsg.textContent = message;
        statusMsg.style.color = isError ? '#e06c75' : '#98c379';
        statusMsg.style.opacity = '1';
        setTimeout(() => { statusMsg.style.opacity = '0'; }, 2000);
    }

    function reloadPage(delay = 800) {
        setTimeout(() => {
            window.location.reload();
        }, delay);
    }

    // --- Hide Sandbox Check ---
    const currentFunnel = getFunnelIdFromUrl();
    const sandboxContainer = panel.querySelector('#sandbox-container');
    const hideSandboxFunnels = ['f1f123r', 'w2f123r', 'w3f123r', 'w4f123r', 'ap2f123r', 'cl2f123r', 'cl3f123r', 'm3f123r', 'chb2f23r', 'c2f23r', 'tch2f23r'];
    if ((hideSandboxFunnels.includes(currentFunnel) || isMaleFunnelId(currentFunnel)) && sandboxContainer) {
        sandboxContainer.style.display = 'none';
    }

    // --- Discount Logic ---
    function loadDiscount() {
        const ts = localStorage.getItem('discountEndTimestamp');
        const isExpired = localStorage.getItem('discountExpired');

        if (isExpired) {
             discountExpireBtn.disabled = true;
             discountExpireBtn.style.opacity = '0.5';
             discountActivateBtn.disabled = false;
             discountActivateBtn.style.opacity = '1';
        } else {
             discountExpireBtn.disabled = false;
             discountExpireBtn.style.opacity = '1';
             discountActivateBtn.disabled = true;
             discountActivateBtn.style.opacity = '0.5';
        }
    }

    discountActivateBtn.addEventListener('click', () => {
        if (!localStorage.getItem('discountExpired')) return;
        const currentTs = Math.floor(Date.now());
        const newTs = currentTs + (10 * 60 * 1000);
        localStorage.setItem('discountEndTimestamp', newTs);
        localStorage.removeItem('discountExpired');
        showStatus('Discount Activated (+10m)! Reloading...');
        reloadPage();
    });

    discountExpireBtn.addEventListener('click', () => {
        if (localStorage.getItem('discountExpired')) return;
        const now = Date.now();
        localStorage.setItem('discountEndTimestamp', now);
        showStatus('Discount Expired! Reloading...');
        reloadPage();
    });

    // --- Score Calculation & Personal Stats Logic ---
    function updateJsonValue(key, value) {
        try {
            let data = JSON.parse(jsonDataArea.value);
            if (!data.personalInfo) data.personalInfo = {};

            if (key === 'fitnessLevelScreen' && value === 'New to yoga') {
                const programType = data.programType || 'fitness';
                value = (programType === 'pilates') ? 'New to pilates' : 'New to yoga';
            }

            data.personalInfo[key] = value;
            jsonDataArea.value = JSON.stringify(data, null, 2);

            syncJsonAreaToInputs();
            updateHighlights();
            calculateAndDisplayScore();
            showStatus(`Set ${key}`);
        } catch (e) {
            showStatus('Invalid JSON!', true);
        }
    }

    function updateJsonFromPersonalInputs() {
        try {
            let data = JSON.parse(jsonDataArea.value);
            if (!data.personalInfo) data.personalInfo = {};
            if (!data.personalInfo.height) data.personalInfo.height = { selectedUnit: "cm" };
            if (!data.personalInfo.currentWeight) data.personalInfo.currentWeight = { selectedUnit: "kg" };
            if (!data.personalInfo.targetWeight) data.personalInfo.targetWeight = { selectedUnit: "kg" };
            if (!data.personalInfo.age) data.personalInfo.age = { selectedUnit: "years" };

            data.personalInfo.height.value = parseFloat(pHeight.value);
            data.personalInfo.currentWeight.value = parseFloat(pWeight.value);
            data.personalInfo.targetWeight.value = parseFloat(pTargetWeight.value);
            data.personalInfo.age.value = parseFloat(pAge.value);

            jsonDataArea.value = JSON.stringify(data, null, 2);
            calculateAndDisplayScore(); // Recalc BMI & Sync UI
        } catch(e) {}
    }

    // --- Male Somatotype/Metabolism lookup (cl2m123r / cl3m123r / m3m123r / d3m123r) — source: Wellness profile.xlsx 'Somatotype & Metabolism. Men' ---
    const MALE_SOMA_TABLE = {
        under: {
            struggle: { f1: ['Fast', 'Ectomorph'], f2: ['Fast', 'Ectomorph'], f3: ['Moderate', 'Ecto-Meso mix'], f4: ['Moderate', 'Ecto-Meso mix'] },
            easy: { f1: ['Moderate', 'Ecto-Meso mix'], f2: ['Moderate', 'Ecto-Meso mix'], f3: ['Moderate', 'Ecto-Meso mix'], f4: ['Moderate', 'Meso-Endo mix'] },
            quick: { f1: ['Moderate', 'Mesomorph'], f2: ['Moderate', 'Mesomorph'], f3: ['Slow', 'Meso-Endo mix'], f4: ['Slow', 'Meso-Endo mix'] },
        },
        healthy: {
            struggle: { f1: ['Fast', 'Ectomorph'], f2: ['Fast', 'Ecto-Meso mix'], f3: ['Moderate', 'Ecto-Meso mix'], f4: ['Moderate', 'Ecto-Meso mix'] },
            easy: { f1: ['Moderate', 'Mesomorph'], f2: ['Moderate', 'Mesomorph'], f3: ['Moderate', 'Mesomorph'], f4: ['Moderate', 'Mesomorph'] },
            quick: { f1: ['Moderate', 'Mesomorph'], f2: ['Slow', 'Mesomorph'], f3: ['Slow', 'Meso-Endo mix'], f4: ['Slow', 'Meso-Endo mix'] },
        },
        over: {
            struggle: { f1: ['Moderate', 'Ecto-Meso mix'], f2: ['Slow', 'Meso-Endo mix'], f3: ['Slow', 'Meso-Endo mix'], f4: ['Slow', 'Meso-Endo mix'] },
            easy: { f1: ['Moderate', 'Mesomorph'], f2: ['Moderate', 'Mesomorph'], f3: ['Slow', 'Meso-Endo mix'], f4: ['Slow', 'Meso-Endo mix'] },
            quick: { f1: ['Slow', 'Meso-Endo mix'], f2: ['Slow', 'Endomorph'], f3: ['Slow', 'Endomorph'], f4: ['Slow', 'Endomorph'] },
        },
        obese: {
            struggle: { f1: ['Slow', 'Meso-Endo mix'], f2: ['Slow', 'Meso-Endo mix'], f3: ['Slow', 'Meso-Endo mix'], f4: ['Slow', 'Meso-Endo mix'] },
            easy: { f1: ['Slow', 'Meso-Endo mix'], f2: ['Slow', 'Endomorph'], f3: ['Slow', 'Endomorph'], f4: ['Slow', 'Endomorph'] },
            quick: { f1: ['Slow', 'Endomorph'], f2: ['Slow', 'Endomorph'], f3: ['Slow', 'Endomorph'], f4: ['Slow', 'Endomorph'] },
        },
    };

    // --- Female Somatotype/Metabolism lookup — source: Wellness profile.xlsx 'Somatotype & Metabolism. Women' ---
    const FEMALE_SOMA_TABLE = {
        under: {
            struggle: { low: ['Fast', 'Ectomorph'], mid: ['Fast', 'Ectomorph'], high: ['Fast', 'Ectomorph'] },
            easy: { low: ['Moderate', 'Ecto-Meso mix'], mid: ['Moderate', 'Ecto-Meso mix'], high: ['Moderate', 'Ecto-Meso mix'] },
            quick: { low: ['Moderate', 'Mesomorph'], mid: ['Moderate', 'Mesomorph'], high: ['Slow', 'Meso-Endo mix'] },
        },
        healthy: {
            struggle: { low: ['Fast', 'Ectomorph'], mid: ['Fast', 'Ecto-Meso mix'], high: ['Moderate', 'Ecto-Meso mix'] },
            easy: { low: ['Moderate', 'Mesomorph'], mid: ['Moderate', 'Mesomorph'], high: ['Moderate', 'Mesomorph'] },
            quick: { low: ['Moderate', 'Mesomorph'], mid: ['Slow', 'Mesomorph'], high: ['Slow', 'Meso-Endo mix'] },
        },
        over: {
            struggle: { low: ['Moderate', 'Ecto-Meso mix'], mid: ['Slow', 'Meso-Endo mix'], high: ['Slow', 'Meso-Endo mix'] },
            easy: { low: ['Moderate', 'Mesomorph'], mid: ['Moderate', 'Mesomorph'], high: ['Slow', 'Meso-Endo mix'] },
            quick: { low: ['Slow', 'Meso-Endo mix'], mid: ['Slow', 'Endomorph'], high: ['Slow', 'Endomorph'] },
        },
        obese: {
            struggle: { low: ['Slow', 'Meso-Endo mix'], mid: ['Slow', 'Meso-Endo mix'], high: ['Slow', 'Meso-Endo mix'] },
            easy: { low: ['Slow', 'Meso-Endo mix'], mid: ['Slow', 'Endomorph'], high: ['Slow', 'Endomorph'] },
            quick: { low: ['Slow', 'Endomorph'], mid: ['Slow', 'Endomorph'], high: ['Slow', 'Endomorph'] },
        },
    };

    function calculateMetabolismAndSomatotype(bmi, weightChange, bodyCurrent, funnel) {
        // --- cl2m123r / cl3m123r / m3m123r / d3m123r (male): use male lookup table; female funnels unchanged ---
        if (isMaleFunnelId(funnel)) {
            let bmiRangeM = bmi < 18.5 ? 'under' : (bmi <= 24.9 ? 'healthy' : (bmi <= 29.9 ? 'over' : 'obese'));
            let patternM = '';
            if (weightChange && weightChange.includes('struggle')) patternM = 'struggle';
            else if (weightChange && weightChange.includes('lose weight easily')) patternM = 'easy';
            else if (weightChange && weightChange.includes('quickly')) patternM = 'quick';
            const fatKeyM = {
                'Slim': 'f1', 'Toned': 'f1',
                'Average': 'f2', 'Medium Build': 'f2',
                'Soft': 'f3',
                'Heavyset': 'f4', 'Plus-sized': 'f4', 'Overweight': 'f4'
            }[bodyCurrent];
            const cellM = (patternM && fatKeyM && MALE_SOMA_TABLE[bmiRangeM] && MALE_SOMA_TABLE[bmiRangeM][patternM])
                ? MALE_SOMA_TABLE[bmiRangeM][patternM][fatKeyM] : null;
            if (cellM) return { meta: cellM[0], soma: cellM[1] };
            return { meta: 'N/A', soma: 'N/A' };
        }
        // --- Female funnels: direct lookup (matches Wellness profile.xlsx 'Somatotype & Metabolism. Women') ---
        let bmiRange = bmi < 18.5 ? 'under' : (bmi <= 24.9 ? 'healthy' : (bmi <= 29.9 ? 'over' : 'obese'));
        let pattern = '';
        if (weightChange && weightChange.includes('struggle')) pattern = 'struggle';
        else if (weightChange && weightChange.includes('lose weight easily')) pattern = 'easy';
        else if (weightChange && weightChange.includes('quickly')) pattern = 'quick';
        let fat = 'mid'; // 20-34%
        if (['Toned', 'Slim'].includes(bodyCurrent)) fat = 'low'; // <19%
        else if (['Plus-sized', 'Overweight'].includes(bodyCurrent)) fat = 'high'; // >=35%
        const cellF = (pattern && FEMALE_SOMA_TABLE[bmiRange] && FEMALE_SOMA_TABLE[bmiRange][pattern])
            ? FEMALE_SOMA_TABLE[bmiRange][pattern][fat] : null;
        if (cellF) return { meta: cellF[0], soma: cellF[1] };
        return { meta: 'N/A', soma: 'N/A' };
    }

    function calculateLifestyle(daily, walking) {
        // Map answers to matrix indices
        const matrix = {
            "Mostly sedentary": ["Sedentary", "Sedentary", "Moderately Active"],
            "Lightly active": ["Sedentary", "Lightly Active", "Moderately Active"],
            "Moderately active": ["Lightly Active", "Moderately Active", "Active"],
            "Very active": ["Moderately Active", "Active", "Highly Active"],
            "Highly active": ["Highly Active", "Highly Active", "Highly Active"]
        };

        if (daily && walking && matrix[daily]) {
            let colIndex = -1;
            if (walking.includes("Less than")) colIndex = 0;
            else if (walking.includes("1-2")) colIndex = 1;
            else if (walking.includes("More than")) colIndex = 2;

            if (colIndex !== -1) {
                return matrix[daily][colIndex];
            }
        }
        return "N/A";
    }

    function getNewFitnessAgeBucket(age) {
        const a = parseFloat(age);
        if (!a || isNaN(a)) return null;
        return newFitnessAgeBuckets.find(b => a <= b.max) || null;
    }

    // cl2m123r and its clones cl3m123r, m3m123r, d3m123r share identical male behaviour
    function isMaleFunnelId(f) { return f === 'cl2m123r' || f === 'cl3m123r' || f === 'm3m123r' || f === 'd3m123r'; }

    // cl2f123r / cl3f123r keep female answer options but are scored with the male formula
    function usesMaleFormulaWithFemaleAnswers(f) { return f === 'cl2f123r' || f === 'cl3f123r'; }

    function calculateMaleFitnessLevel(pInfo, answerMaps) {
        const maps = answerMaps || maleFitnessAnswerMaps;
        const ageVal = pInfo && pInfo.age && pInfo.age.value;
        const bucket = getNewFitnessAgeBucket(ageVal); // for display only — male scores are age-independent

        const MALE_DEFAULT_SCORE = 0.25;
        const rows = [];
        let rawTotal = 0;
        let hasDefaults = false;

        for (const q of maleFitnessQuestions) {
            const rawVal = pInfo ? pInfo[q.key] : undefined;
            const val = rawVal;
            const map = maps[q.key];
            let score, isDefault;
            if (val != null && map && map[val] !== undefined) {
                score = map[val];
                isDefault = false;
            } else {
                score = MALE_DEFAULT_SCORE;
                isDefault = true;
                hasDefaults = true;
            }
            const contrib = score * q.weight;
            rawTotal += contrib;
            rows.push({ key: q.key, label: q.label, weight: q.weight, value: rawVal, score, contribution: contrib, isDefault });
        }

        // --- Edge-case gates: cap final score at 0.6 (only on actual answered values) ---
        let total = rawTotal;
        let gateApplied = false;
        const stairsV = pInfo && pInfo.stairsLevel ? pInfo.stairsLevel : '';
        const upperV  = pInfo && pInfo.upperBodyFlexibility ? pInfo.upperBodyFlexibility : '';
        const lowerV  = pInfo && pInfo.flexibilityLevel ? pInfo.flexibilityLevel : '';
        const gateStairs = stairsV === 'Out of breath after few steps';
        const gateFlex   = upperV === "My hands are far apart, can't reach or touch" && lowerV === "I can’t reach the floor";
        if ((gateStairs || gateFlex) && total > 0.6) { total = 0.6; gateApplied = true; }

        const levelLabel = maleLevelFromScore(total);

        return { bucket, rows, total, rawTotal, levelLabel, allValid: true, hasDefaults, gateApplied, isMale: true };
    }

    function calculateNewFitnessLevel(pInfo, funnel) {
        if (isMaleFunnelId(funnel)) return calculateMaleFitnessLevel(pInfo, maleFitnessAnswerMaps);
        if (usesMaleFormulaWithFemaleAnswers(funnel)) return calculateMaleFitnessLevel(pInfo, clFemaleFitnessAnswerMaps);

        const ageVal = pInfo && pInfo.age && pInfo.age.value;
        const bucket = getNewFitnessAgeBucket(ageVal);

        const FEMALE_DEFAULT_SCORE = 0.25;
        const rows = [];
        let total = 0;
        let allValid = bucket !== null;
        let hasDefaults = false;

        for (const q of newFitnessQuestions) {
            const val = pInfo ? pInfo[q.key] : undefined;
            const map = newFitnessAnswerMaps[q.key];
            let score = null;
            let contrib = 0;
            let isDefault = false;
            if (val !== undefined && val !== null && map && map[val] !== undefined && bucket) {
                score = map[val][bucket.idx];
                contrib = score * q.weight;
                total += contrib;
            } else if (bucket) {
                score = FEMALE_DEFAULT_SCORE;
                isDefault = true;
                hasDefaults = true;
                contrib = score * q.weight;
                total += contrib;
            } else {
                allValid = false;
            }
            rows.push({ key: q.key, label: q.label, weight: q.weight, value: val, score, contribution: contrib, isDefault });
        }

        let levelLabel = null;
        if (allValid) {
            for (const t of newFitnessThresholds) {
                if (total <= t.max) { levelLabel = t.label; break; }
            }
        }

        return { bucket, rows, total, levelLabel, allValid, hasDefaults };
    }

    function calculateNewPlan(pInfo, bmiNum, fitnessLevelLabel, funnel) {
        // --- Pilates level mapping ---
        const pilatesRaw = pInfo.fitnessLevelScreen || '';
        const newbieValues = ["New to yoga", "New to pilates", "New to barre", "New to Tai Chi"];
        let pilatesLevel;
        let pilatesDefaulted = false;
        if (isMaleFunnelId(funnel) || ['cl2f123r', 'cl3f123r', 'm3f123r'].includes(funnel)) {
            pilatesLevel = 'newbie';
            pilatesDefaulted = true;
        } else if (newbieValues.includes(pilatesRaw)) pilatesLevel = 'newbie';
        else if (pilatesRaw === 'Beginner') pilatesLevel = 'beginner';
        else if (pilatesRaw === 'Intermediate') pilatesLevel = 'intermediate';
        else if (pilatesRaw === 'Advanced') pilatesLevel = 'advanced';
        else return null;

        // --- Exercise level mapping ---
        const exRaw = pInfo.exerciseActivityLevel || '';
        let exerciseLevel;
        if (exRaw === "I haven’t exercised for a long time" || exRaw === "I haven’t started yet") exerciseLevel = 'none';
        else if (exRaw === 'Occasionally') exerciseLevel = 'occasional';
        else if (exRaw === 'Regularly') exerciseLevel = 'regular';
        else if (exRaw === 'Often') exerciseLevel = 'often';
        else if (exRaw === 'Almost daily') exerciseLevel = 'daily';
        else return null;

        const levelOrder = ['newbie', 'beginner', 'intermediate', 'advanced'];
        const downgrade = (lvl) => { const i = levelOrder.indexOf(lvl); return i > 0 ? levelOrder[i - 1] : 'newbie'; };

        // --- Step 0: Combined Experience ---
        let combinedExperience;
        if (exerciseLevel === 'none') {
            combinedExperience = downgrade(pilatesLevel);
        } else if (exerciseLevel === 'occasional') {
            combinedExperience = pilatesLevel === 'advanced' ? 'intermediate' : pilatesLevel;
        } else if (exerciseLevel === 'regular') {
            combinedExperience = pilatesLevel === 'newbie' ? 'beginner' : pilatesLevel;
        } else { // often / daily
            combinedExperience = (pilatesLevel === 'newbie' || pilatesLevel === 'beginner') ? 'intermediate' : 'advanced';
        }

        // --- Step 1: Base Plan ---
        const lowFitness = ['very low', 'low'].includes(fitnessLevelLabel);
        const highFitness = ['intermediate', 'high', 'advanced'].includes(fitnessLevelLabel);
        let basePlan;
        if (lowFitness) {
            if (combinedExperience === 'newbie') basePlan = 1;
            else if (combinedExperience === 'beginner') basePlan = 2;
            else basePlan = 3;
        } else {
            basePlan = combinedExperience === 'newbie' ? 2 : 3;
        }

        // --- BMI Category ---
        let bmiCategory;
        if (!bmiNum || isNaN(bmiNum)) bmiCategory = 'unknown';
        else if (bmiNum < 18.5) bmiCategory = 'underweight';
        else if (bmiNum < 25) bmiCategory = 'normal';
        else if (bmiNum < 30) bmiCategory = 'overweight';
        else bmiCategory = 'obese';

        // --- Age ---
        const age = (pInfo.age && pInfo.age.value != null) ? Number(pInfo.age.value) : null;

        // --- Step 2: Age Adjustment ---
        let planAfterAge = basePlan;
        let ageAdjusted = false;
        if (age !== null && age >= 50 && planAfterAge > 1) { planAfterAge--; ageAdjusted = true; }

        // --- Step 3: BMI Adjustment ---
        let planAfterBmi = planAfterAge;
        let bmiAdjusted = false;
        if (bmiCategory === 'obese' && planAfterBmi > 1) {
            planAfterBmi--; bmiAdjusted = true;
        } else if (bmiCategory === 'overweight' &&
                   (lowFitness || combinedExperience === 'newbie' || combinedExperience === 'beginner') &&
                   planAfterBmi > 1) {
            planAfterBmi--; bmiAdjusted = true;
        }

        // --- Step 4: Override ---
        let finalPlan = planAfterBmi;
        let overrideType = 'none';
        if (highFitness && (combinedExperience === 'intermediate' || combinedExperience === 'advanced')) {
            finalPlan = basePlan;
            overrideType = 'full';
        } else if (lowFitness && (combinedExperience === 'intermediate' || combinedExperience === 'advanced')) {
            if (finalPlan < 2) { finalPlan = 2; }
            overrideType = 'partial';
        } else if (bmiCategory === 'normal' && age !== null && age < 40) {
            if (finalPlan < 2) { finalPlan = 2; }
            overrideType = 'youth';
        }

        // --- Plan name ---
        // Calisthenics funnels have their own plan naming (Foundation / Strength / Progression).
        const isMensCalisthenics   = isMaleFunnelId(funnel);                                  // cl2m123r, cl3m123r, m3m123r, d3m123r
        const isWomensCalisthenics = ['cl2f123r', 'cl3f123r', 'm3f123r'].includes(funnel);
        let planLabel;
        if (isMensCalisthenics || isWomensCalisthenics) {
            const who = isMensCalisthenics ? "Men's Calisthenics" : "Women's Calisthenics";
            planLabel = { 1: `Plan 1 (Foundation: ${who})`, 2: `Plan 2 (Strength: ${who})`, 3: `Plan 3 (Progression: ${who})` };
        } else {
            const isWall = funnel.includes('w2') || funnel.includes('w3') || funnel.includes('w4') || funnel.includes('ap2');
            const suffix = isWall ? 'Wall Pilates' : 'Chair Yoga';
            planLabel = { 1: `Plan 1 (Gentle ${suffix})`, 2: `Plan 2 (Basic ${suffix})`, 3: `Plan 3 (Progression ${suffix})` };
        }

        return { pilatesLevel, pilatesDefaulted, exerciseLevel, combinedExperience, basePlan, age, bmiCategory,
                 planAfterAge, ageAdjusted, planAfterBmi, bmiAdjusted,
                 overrideType, finalPlan, finalPlanName: planLabel[finalPlan] };
    }

    function calculateAndDisplayScore() {
        let data;
        const resetToError = (message) => {
            if (planScoreFormulaNew) planScoreFormulaNew.textContent = message;
        };

        try { data = JSON.parse(jsonDataArea.value); }
        catch (e) { resetToError('Invalid JSON'); return; }

        if (!data || !data.personalInfo) {
            resetToError('Missing personalInfo');
            return;
        }

        const pInfo = data.personalInfo;

        // --- BMI Calculation & Update Personal Fields ---
        let weightInKg = 0;
        let heightInM = 0;
        let bmiNum = 0;
        let bmiText = "N/A";

        // Sync Inputs if not focused
        if (pInfo.height && document.activeElement !== pHeight) pHeight.value = pInfo.height.value || '';
        if (pInfo.currentWeight && document.activeElement !== pWeight) pWeight.value = pInfo.currentWeight.value || '';
        if (pInfo.targetWeight && document.activeElement !== pTargetWeight) pTargetWeight.value = pInfo.targetWeight.value || '';
        if (pInfo.age && document.activeElement !== pAge) pAge.value = pInfo.age.value || '';

        if (pInfo.currentWeight && pInfo.currentWeight.value && pInfo.height && pInfo.height.value) {
            let weight = parseFloat(pInfo.currentWeight.value);
            let height = parseFloat(pInfo.height.value);
            if (pInfo.currentWeight.selectedUnit === 'lbs') weightInKg = weight * 0.45359237;
            else weightInKg = weight;
            if (pInfo.height.selectedUnit === 'inch') heightInM = height * 0.0254;
            else heightInM = height / 100;
            if (weightInKg > 0 && heightInM > 0) {
                bmiNum = weightInKg / (heightInM * heightInM);
                bmiText = bmiNum.toFixed(1);
                sessionStorage.setItem('bmi', bmiText);
            }
        }
        pBmi.textContent = bmiText;
        pBmi.style.color = bmiText !== "N/A" ? "#e5c07b" : "#abb2bf";

        // Update Personal Display Texts
        valWeightChange.innerHTML = (pInfo.weightChange || '...').replace('<br>', '');
        valBodyCurrent.textContent = pInfo.bodyCurrent || '...';
        valFatPercent.textContent = fatMap[pInfo.bodyCurrent] ? `(${fatMap[pInfo.bodyCurrent]})` : '';
        valDailyActivity.textContent = pInfo.dailyActivityLevel || '...';
        valWalkingActivity.textContent = pInfo.walkingActivityLevel || '...';
        fitLevelVal.textContent = pInfo.fitnessLevel || '...';

        // --- Show/Hide Pilates/Yoga Level ---
        const funnel = getFunnelIdFromUrl();
        if (funnel === 'c2f23r' || funnel === 'chb2f23r') {
            progLevelLabel.textContent = 'Yoga Level:';
            progLevelVal.textContent = pInfo.fitnessLevelScreen || '...';
            progLevelRow.style.display = 'flex';
        } else if (['w2f123r', 'w3f123r', 'w4f123r', 'ap2f123r', 'cl2f123r', 'cl3f123r', 'm3f123r'].includes(funnel) || isMaleFunnelId(funnel)) {
            progLevelLabel.textContent = 'Pilates Level:';
            progLevelVal.textContent = pInfo.fitnessLevelScreen || '...';
            progLevelRow.style.display = 'flex';
        } else if (funnel === 'tch2f23r') {
             progLevelLabel.textContent = 'Tai Chi Level:';
             progLevelVal.textContent = pInfo.fitnessLevelScreen || '...';
             progLevelRow.style.display = 'flex';
        } else {
            progLevelRow.style.display = 'none';
        }

        // --- Metabolism, Somatotype & Lifestyle Logic ---
        let lifestyleRes = "N/A";
        if (pInfo.dailyActivityLevel && pInfo.walkingActivityLevel) {
            lifestyleRes = calculateLifestyle(pInfo.dailyActivityLevel, pInfo.walkingActivityLevel);
        }
        lifeVal.textContent = lifestyleRes;

        // --- GOAL MESSAGE LOGIC ---
        let goalMessage = "...";
        let diffPercent = 0;

        if (bmiNum > 0 && pInfo.targetWeight && pInfo.targetWeight.value) {
            let target = parseFloat(pInfo.targetWeight.value);
            let current = parseFloat(pInfo.currentWeight.value);

            let diff = (target - current) / current;
            diffPercent = Math.round(Math.abs(diff * 100));

            let lowerBoundWeight = 18.5 * heightInM * heightInM;

            if (weightInKg < lowerBoundWeight) {
                goalMessage = "Uh-oh! Low weight alert!";
            } else if (weightInKg >= lowerBoundWeight && diff <= -0.25) {
                goalMessage = `CHALLENGING GOAL: lose ${diffPercent}% of your weight`;
            } else if (diff >= -0.24 && diff <= -0.10) {
                goalMessage = `HEALTH BENEFITS: lose ${diffPercent}% of your weight`;
            } else if (diff >= -0.09 && diff <= -0.01) {
                goalMessage = `EASY WIN: lose ${diffPercent}% of your weight`;
            } else if (diff >= 0 && diff <= 0.09) {
                goalMessage = `EASY WIN: gain ${diffPercent}% of your weight`;
            } else if (diff >= 0.10 && diff <= 0.24) {
                goalMessage = `CHALLANGING GOAL: gain ${diffPercent}% of your weight`;
            } else if (diff >= 0.25) {
                goalMessage = `AUDACIOUS GOAL: gain ${diffPercent}% of your weight`;
            }

            data.weightGoalDiff = Math.round(diff * 100);
        }
        goalMsgVal.textContent = goalMessage;

        if (bmiNum > 0 && pInfo.weightChange && pInfo.bodyCurrent) {
            const result = calculateMetabolismAndSomatotype(bmiNum, pInfo.weightChange, pInfo.bodyCurrent, funnel);
            metaVal.textContent = result.meta;
            somaVal.textContent = result.soma;

            if(!data.personalInfo.obese) data.personalInfo.obese = {};
            data.personalInfo.obese.metabolism = result.meta.toLowerCase();
            data.personalInfo.obese.somatotype = result.soma.toLowerCase();
            data.personalInfo.obese.BMI = bmiText;
            if (lifestyleRes !== "N/A") data.personalInfo.obese.lifestyle = lifestyleRes.toLowerCase();

            const newJsonStr = JSON.stringify(data, null, 2);
            if(jsonDataArea.value !== newJsonStr && document.activeElement !== jsonDataArea) {
                 jsonDataArea.value = newJsonStr;
            }
        } else {
            metaVal.textContent = "...";
            somaVal.textContent = "...";
        }

        // --- Score Calculations ---
        const flexVal = pInfo.flexibilityLevel;
        const flexScore = flexibilityScoreMap[flexVal] ?? 0;
        flexibilityScoreValue.textContent = flexibilityScoreMap[flexVal] !== undefined ? flexScore.toFixed(2) : 'N/A';
        let flexBreakdownHTML = '';
        for (const [key, value] of Object.entries(flexibilityScoreMap)) {
            flexBreakdownHTML += `<div>${value.toFixed(2)} = "${key}"</div>`;
        }
        flexScoreBreakdown.innerHTML = flexBreakdownHTML;

        const yogaVal = pInfo.fitnessLevelScreen;
        const yogaScore = yogaPilatesScoreMap[yogaVal] ?? 0;
        yogaPilatesScoreValue.textContent = yogaPilatesScoreMap[yogaVal] !== undefined ? yogaScore.toFixed(2) : 'N/A';
        let yogaBreakdownHTML = '';
        for (const [key, value] of Object.entries(yogaPilatesScoreMap)) {
            yogaBreakdownHTML += `<div>${value.toFixed(2)} = "${key}"</div>`;
        }
        yogaScoreBreakdown.innerHTML = yogaBreakdownHTML;

        // --- Fitness Level (PR-69876) ---
        const newFit = calculateNewFitnessLevel(pInfo, funnel);
        const activityScoreNew = newFit.allValid ? newFit.total : 0;

        // --- Plan Score ---
        const weightedSumPlanNew = (flexScore * weights.flexibility) + (yogaScore * weights.yogaPilates) + (activityScoreNew * weights.activityLevel);
        const planScoreNew = weightedSumPlanNew / totalWeight;

        if (newFit.levelLabel) {
            planScoreValueNew.textContent = planScoreNew.toFixed(4);
            planScoreFormulaNew.innerHTML = `(${flexScore.toFixed(2)} × 0.4 + ${yogaScore.toFixed(2)} × 1.0 + <b style="color:#e5c07b;">${activityScoreNew.toFixed(2)}</b> × 0.6) / 2.0 = <b>${planScoreNew.toFixed(4)}</b><br><span style="color:#7a8090;">fitnessScore = ${newFit.total.toFixed(4)} ("${newFit.levelLabel}")</span>`;
        } else {
            planScoreValueNew.textContent = 'N/A';
            planScoreFormulaNew.innerHTML = `<span style="color:#7a8090;">(fitness level not computed — missing data)</span>`;
        }

        const computePlanName = (score) => {
            if (['w2f123r', 'w3f123r', 'w4f123r', 'ap2f123r', 'cl2f123r', 'cl3f123r', 'm3f123r'].includes(funnel) || isMaleFunnelId(funnel)) {
                return (score <= 0.30) ? "Gentle Wall Pilates" : "Basic Wall Pilates";
            }
            return (score <= 0.30) ? "Gentle Chair Yoga" : "Basic Chair Yoga";
        };
        assignedPlanValueNew.textContent = newFit.levelLabel ? computePlanName(planScoreNew) : 'N/A';

        // --- New Plan Logic (5-step) ---
        const np = newFit.levelLabel ? calculateNewPlan(pInfo, bmiNum, newFit.levelLabel, funnel) : null;
        if (np) {
            const pilatesNote = np.pilatesDefaulted ? ` <span style="color:#e06c75;">[cl2 default]</span>` : '';
            newPlanCombined.innerHTML = `<b style="color:#e5c07b;">${np.combinedExperience}</b> <span style="color:#5c6370;">(pilates: ${np.pilatesLevel}${np.pilatesDefaulted ? ' ⚠️' : ''}, exercise: ${np.exerciseLevel})</span>${pilatesNote}`;
            newPlanBase.innerHTML = `<b style="color:#98c379;">Plan ${np.basePlan}</b>`;
            if (np.ageAdjusted) {
                newPlanAge.innerHTML = `Plan ${np.planAfterAge} <span style="color:#e06c75;">↓ (age ${np.age} ≥ 50)</span>`;
            } else {
                newPlanAge.innerHTML = `Plan ${np.planAfterAge} <span style="color:#5c6370;">no change (age ${np.age})</span>`;
            }
            if (np.bmiAdjusted) {
                newPlanBmi.innerHTML = `Plan ${np.planAfterBmi} <span style="color:#e06c75;">↓ (BMI ${np.bmiCategory})</span>`;
            } else {
                newPlanBmi.innerHTML = `Plan ${np.planAfterBmi} <span style="color:#5c6370;">no change (BMI ${np.bmiCategory})</span>`;
            }
            const overrideColors = { full: '#e5c07b', partial: '#61afef', youth: '#56b6c2', none: '#5c6370' };
            newPlanOverride.innerHTML = `<span style="color:${overrideColors[np.overrideType]};">${np.overrideType.toUpperCase()}</span>`;
            newPlanFinal.textContent = np.finalPlanName;
        } else {
            newPlanCombined.textContent = 'N/A (missing fitnessLevelScreen or exerciseActivityLevel)';
            newPlanBase.textContent = 'N/A';
            newPlanAge.textContent = 'N/A';
            newPlanBmi.textContent = 'N/A';
            newPlanOverride.textContent = 'N/A';
            newPlanFinal.textContent = 'N/A';
        }

        flexScoreBreakdown.style.display = 'block';
        yogaScoreBreakdown.style.display = 'block';

        // --- NEW Fitness Level display (PR-69876) ---
        const newFitValueEl = panel.querySelector('#new-fitness-value');
        const newFitLabelEl = panel.querySelector('#new-fitness-label');
        const newFitBucketEl = panel.querySelector('#new-fitness-age-bucket');
        const newFitFormulaEl = panel.querySelector('#new-fitness-formula');
        const newFitBreakdownEl = panel.querySelector('#new-fitness-breakdown');
        const upperFlexValEl = panel.querySelector('#upper-flex-value');
        const pushUpsValEl = panel.querySelector('#push-ups-value');
        const squatsValEl = panel.querySelector('#squats-value');
        const stairsValEl = panel.querySelector('#stairs-value');

        if (newFit.allValid) {
            newFitValueEl.textContent = newFit.total.toFixed(4);
            newFitLabelEl.textContent = newFit.levelLabel || '';
            if (newFit.gateApplied) {
                newFitFormulaEl.textContent = `Σ = ${newFit.rawTotal.toFixed(4)} → capped at 0.6 (edge-case gate)`;
            } else if (newFit.hasDefaults) {
                newFitFormulaEl.textContent = 'Σ (answerScore × weight) — missing fields defaulted to 0.25';
            } else {
                newFitFormulaEl.textContent = 'Σ (answerScore × weight)';
            }
        } else if (newFit.bucket) {
            newFitValueEl.textContent = newFit.total.toFixed(4) + '*';
            newFitLabelEl.textContent = '(incomplete)';
            newFitFormulaEl.textContent = '* partial sum — some answers missing/unmapped';
        } else {
            newFitValueEl.textContent = 'N/A';
            newFitLabelEl.textContent = '(no age)';
            newFitFormulaEl.textContent = '(age not set)';
        }
        newFitBucketEl.textContent = newFit.bucket ? `Age bucket: ${newFit.bucket.label}` : 'Age bucket: N/A';

        const escapeHtml = (s) => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        let bdHTML = '';
        for (const r of newFit.rows) {
            const weightPct = (r.weight * 100).toFixed(0) + '%';
            const valDisplay = (r.value === undefined || r.value === null || r.value === '') ? '<missing>' : escapeHtml(r.value);
            if (r.isDefault) {
                bdHTML += `<div><b>${r.label}</b> (${weightPct}): "<span style="color:#e06c75;">${valDisplay}</span>" → <span style="color:#9da5b4;">default 0.25</span> × ${weightPct} = <span style="color:#9da5b4;">${r.contribution.toFixed(4)}</span></div>`;
            } else if (r.score !== null) {
                bdHTML += `<div><b>${r.label}</b> (${weightPct}): "${valDisplay}" → <span style="color:#e5c07b;">${r.score.toFixed(2)}</span> × ${weightPct} = <span style="color:#98c379;">${r.contribution.toFixed(4)}</span></div>`;
            } else {
                bdHTML += `<div><b>${r.label}</b> (${weightPct}): "${valDisplay}" → <span style="color:#e06c75;">?</span></div>`;
            }
        }
        newFitBreakdownEl.innerHTML = bdHTML;

        const upperFlexRow = newFit.rows.find(r => r.key === 'upperBodyFlexibility');
        const pushUpsRow = newFit.rows.find(r => r.key === 'kneePushUpsLevel');
        const squatsRow = newFit.rows.find(r => r.key === 'squatsLevel');
        const stairsRow = newFit.rows.find(r => r.key === 'stairsLevel');
        if (upperFlexValEl) upperFlexValEl.textContent = upperFlexRow && upperFlexRow.score !== null ? upperFlexRow.score.toFixed(2) : 'N/A';
        if (pushUpsValEl) pushUpsValEl.textContent = pushUpsRow && pushUpsRow.score !== null ? pushUpsRow.score.toFixed(2) : 'N/A';
        if (squatsValEl) squatsValEl.textContent = squatsRow && squatsRow.score !== null ? squatsRow.score.toFixed(2) : 'N/A';
        if (stairsValEl) stairsValEl.textContent = stairsRow && stairsRow.score !== null ? stairsRow.score.toFixed(2) : 'N/A';

        // --- Funnel-specific squats / push-ups buttons (cl2m123r/cl3m123r/m3m123r/d3m123r is male; others female) ---
        const isMaleFunnel = isMaleFunnelId(funnel);
        const squatsBtnGroup = panel.querySelector('#squats-btn-group');
        const pushUpsBtnGroup = panel.querySelector('#push-ups-btn-group');
        const buildScoreBtns = (key, items) => items.map(it =>
            `<button class="score-set-btn" data-key="${key}" data-value="${it.v}" title="${it.t}">${it.label}</button>`
        ).join('');
        if (squatsBtnGroup) {
            const squatsItems = isMaleFunnel
                ? [ {v:"I can’t do squats", t:"I can’t do squats", label:"None"},
                    {v:"1-10", t:"1-10 squats", label:"1-10"},
                    {v:"11-20", t:"11-20 squats", label:"11-20"},
                    {v:"21-40", t:"21-40 squats", label:"21-40"},
                    {v:"More than 40", t:"More than 40 squats", label:"40+"} ]
                : [ {v:"I don't know", t:"I don't know", label:"?"},
                    {v:"Fewer 12", t:"Fewer than 12 squats", label:"&lt;12"},
                    {v:"13-20", t:"13-20 squats", label:"13-20"},
                    {v:"More than 20", t:"More than 20 squats", label:"20+"} ];
            squatsBtnGroup.innerHTML = buildScoreBtns('squatsLevel', squatsItems);
        }
        if (pushUpsBtnGroup) {
            const pushItems = isMaleFunnel
                ? [ {v:"I can’t do push-ups", t:"I can’t do push-ups", label:"None"},
                    {v:"1-10", t:"1-10 push-ups", label:"1-10"},
                    {v:"11-20", t:"11-20 push-ups", label:"11-20"},
                    {v:"21-30", t:"21-30 push-ups", label:"21-30"},
                    {v:"More than 30", t:"More than 30 push-ups", label:"30+"} ]
                : [ {v:"Haven’t tried", t:"Haven’t tried", label:"None"},
                    {v:"Fewer 4", t:"0-4 push-ups", label:"0-4"},
                    {v:"5-10", t:"5-10 push-ups", label:"5-10"},
                    {v:"11-20", t:"11-20 push-ups", label:"11-20"},
                    {v:"More than 20", t:"21+ push-ups", label:"21+"} ];
            pushUpsBtnGroup.innerHTML = buildScoreBtns('kneePushUpsLevel', pushItems);
        }
        // --- Funnel-specific body type buttons (male: Slim/Average/Soft/Heavyset) ---
        const bodyBtnGroup = panel.querySelector('#body-current-btn-group');
        if (bodyBtnGroup) {
            const bodyItems = isMaleFunnel
                ? [ {v:'Slim', t:'Slim (< 18% fat)', label:'Slim'},
                    {v:'Average', t:'Average (18-24% fat)', label:'Avg'},
                    {v:'Soft', t:'Soft (24-30% fat)', label:'Soft'},
                    {v:'Heavyset', t:'Heavyset (30%+ fat)', label:'Heavy'} ]
                : [ {v:'Toned', t:'Toned', label:'Toned'},
                    {v:'Slim', t:'Slim', label:'Slim'},
                    {v:'Medium Build', t:'Medium Build', label:'Medium'},
                    {v:'Plus-sized', t:'Plus-sized', label:'Plus'},
                    {v:'Overweight', t:'Overweight', label:'Over'} ];
            bodyBtnGroup.innerHTML = buildScoreBtns('bodyCurrent', bodyItems);
        }

    }


    // --- Search & Highlight Logic ---
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function updateHighlights() {
        const text = jsonDataArea.value;
        const searchTerm = jsonSearchInput.value;
        const safeText = text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        matches = [];
        currentMatchIndex = -1;
        jsonHighlighter.innerHTML = safeText;

        if (!searchTerm) {
            jsonSearchStatus.textContent = '';
            searchPrevBtn.disabled = true;
            searchNextBtn.disabled = true;
            return;
        }

        const escapedTerm = escapeRegExp(searchTerm);
        const regex = new RegExp(escapedTerm, 'gi');
        let match;
        while ((match = regex.exec(text)) !== null) {
            matches.push(match);
        }

        searchPrevBtn.disabled = matches.length <= 1;
        searchNextBtn.disabled = matches.length <= 1;

        if (matches.length > 0) {
            const highlightedText = safeText.replace(regex, (match) => `<span class="highlight">${match}</span>`);
            jsonHighlighter.innerHTML = highlightedText;
            navigateToMatch(0);
        } else {
            jsonSearchStatus.textContent = '0 found';
        }
    }

    function navigateToMatch(index) {
        if (matches.length === 0 || index < 0 || index >= matches.length) {
            currentMatchIndex = -1;
            return;
        }
        currentMatchIndex = index;
        const allHighlights = jsonHighlighter.querySelectorAll('.highlight');
        allHighlights.forEach((el, i) => el.classList.toggle('active', i === currentMatchIndex));
        jsonSearchStatus.textContent = `${currentMatchIndex + 1} of ${matches.length}`;
        const activeHighlight = allHighlights[currentMatchIndex];
        if (activeHighlight) {
            const container = jsonHighlighter;
            const scrollPos = activeHighlight.offsetTop - (container.clientHeight / 2) + (activeHighlight.clientHeight / 2);
            jsonDataArea.scrollTop = scrollPos;
        }
    }

    // --- Main Logic & Data Sync ---
    function syncJsonAreaToInputs() {
        try {
            const data = JSON.parse(jsonDataArea.value);
            activeTabInput.value = data.activeTab != null ? data.activeTab : '';
            emailInput.value = data.personalInfo?.email || '';
        } catch(e) { /* Do nothing if JSON is invalid during typing */ }
    }

    function syncInputsToJsonArea() {
         try {
            let currentJson = JSON.parse(jsonDataArea.value);
            currentJson.activeTab = parseActiveTabValue(activeTabInput.value);
            if(currentJson.personalInfo) {
                 currentJson.personalInfo.email = emailInput.value;
            }
            jsonDataArea.value = JSON.stringify(currentJson, null, 2);
            updateHighlights();
            renderScreensList();
         } catch(e) { /* Ignore parsing errors during typing */ }
    }

    function loadScreensData() {
        jsonDataArea.disabled = false;
        activeTabInput.disabled = false;
        emailInput.disabled = false;
        saveBtn.disabled = false;

        const screensCookie = getCookie('screens');
        if (!screensCookie) {
            jsonDataArea.value = 'Cookie "screens" not found.';
            jsonDataArea.disabled = true;
            activeTabInput.disabled = true;
            emailInput.disabled = true;
            saveBtn.disabled = true;
        } else {
            try {
                const decodedValue = decodeURIComponent(screensCookie);
                const cookieData = JSON.parse(decodedValue);
                jsonDataArea.value = JSON.stringify(cookieData, null, 2);
                activeTabInput.value = cookieData.activeTab != null ? cookieData.activeTab : '';
                emailInput.value = cookieData.personalInfo?.email || '';
            } catch (e) {
                jsonDataArea.value = `Error parsing JSON from cookie:\n${e}\n\nOriginal value:\n${screensCookie}`;
                showStatus('Parsing error!', true);
            }
        }
        updateHighlights();
        calculateAndDisplayScore();
    }

    function loadSandboxData() {
        const sandboxCookie = getCookie('sandbox_test');
        sandboxValue.textContent = sandboxCookie === null ? 'Not set' : sandboxCookie;
    }

    function loadCookieStates() {
        loadScreensData();
        loadSandboxData();
        loadFeatureFlags();
        loadDiscount();
        loadFunnelConfigScreens();
        renderAgePresets();
        initMarketingParams();
        restoreSpoilers();
    }

    function saveScreensCookie() {
        try {
            // 1. Збереження Cookie (Screens)
            syncInputsToJsonArea();
            const screensData = JSON.parse(jsonDataArea.value);
            const encodedValue = encodeURIComponent(JSON.stringify(screensData));

            // 2. Збереження Feature Flags (Session Storage)
            const flagsText = featureFlagsArea.value.trim();
            let flagsData = null;

            if (flagsText !== "") {
                flagsData = JSON.parse(flagsText);
            }

            // Якщо обидва JSON валідні (або флаги порожні), зберігаємо все
            setCookie('screens', encodedValue, 365);

            if (flagsText === "") {
                sessionStorage.removeItem('featureFlags');
            } else {
                sessionStorage.setItem('featureFlags', JSON.stringify(flagsData));
            }

            showStatus("Saved! Reloading...");
            reloadPage();
        } catch (e) {
            showStatus('Invalid JSON!', true);
            console.error("Error saving data:", e);
        }
    }

    // --- Event Handlers ---
    saveBtn.addEventListener('click', saveScreensCookie);

    quickFillBtn.addEventListener('click', () => {
        const rawFunnelId = getFunnelIdFromUrl();
        const funnelId = rawFunnelId || 'f1f123r';
        const randomSuffix = generateRandomString(5);
        let jsonData;

        if (funnelId === 'c2f23r') {
             jsonData = { ...config.chairYogaJson };
             jsonData.funnelId = funnelId;
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+c2_${randomSuffix}@gmail.com`;
                 jsonData.personalInfo.name = "Chair Yoga 2";
                 jsonData.personalInfo.eatingBarriers = ["Don't have time to cook", "Don't know what to eat"];
             }
             jsonData.activeTab = "paywall"; jsonData.screensCount = 53; if (jsonData.personalInfo) jsonData.personalInfo.totalScreens = 53;
             showStatus(`Filled with Chair Yoga data (${funnelId})`);
        } else if (funnelId === 'w2f123r' || funnelId === 'w3f123r' || funnelId === 'w4f123r' || funnelId === 'ap2f123r') {
             jsonData = { ...config.wallPilatesJson };
             jsonData.funnelId = funnelId;
             let prefix = 'w2';
             if (funnelId === 'w3f123r') prefix = 'w3';
             if (funnelId === 'w4f123r') prefix = 'w4';
            if (funnelId === 'ap2f123r') prefix = 'ap2';
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+${prefix}_${randomSuffix}@gmail.com`;
                 if (funnelId === 'w2f123r' || funnelId === 'w4f123r') jsonData.personalInfo.eatingBarriers = ["Don't have time to cook", "Don't know what to eat"];
                 else if (funnelId === 'w3f123r' || funnelId === 'ap2f123r') jsonData.personalInfo.eatingBarriers = ["None, I'm eating healthy"];
                 else delete jsonData.personalInfo.eatingBarriers;

                 // clone so these fields don't leak into config.wallPilatesJson's shared
                 // personalInfo object across repeated Quick Fill calls
                 jsonData.personalInfo = {
                     ...jsonData.personalInfo,
                     workoutStyles: ["Light Aerobics", "Bodyweight Strength"],
                     workoutPreferences: ["Mostly lying down"],
                     planMostImportant: ["Personalized approach", "Health insights"],
                     importantEventDate: "11/04/2026"
                 };
             }
             jsonData.activeTab = "paywall"; jsonData.screensCount = 53; if (jsonData.personalInfo) jsonData.personalInfo.totalScreens = 53;
             showStatus(`Filled with Wall Pilates data (${funnelId})`);
        } else if (funnelId === 'cl2m123r') {
             jsonData = { ...config.cl2m123rJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+cl2_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with CL2 Wall Pilates data (${funnelId})`);
        } else if (funnelId === 'cl3m123r') {
             jsonData = { ...config.cl3m123rJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+cl3_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with CL3 Calisthenics data (${funnelId})`);
        } else if (funnelId === 'm3m123r') {
             jsonData = { ...config.m3m123rJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+m3m_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with M3M data (${funnelId})`);
        } else if (funnelId === 'd3m123r') {
             jsonData = { ...config.d3m123rJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+d3_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with D3 data (${funnelId})`);
        } else if (funnelId === 'cl2f123r' || funnelId === 'cl3f123r') {
             jsonData = { ...config.cl2f123rJson };
             jsonData.funnelId = funnelId;
             const prefix = funnelId === 'cl3f123r' ? 'cl3f' : 'cl2f';

             if (funnelId === 'cl3f123r') {
                 // cl3f123r reports no calisthenics experience, unlike the cl2f123r base template
                 jsonData.personalInfo = { ...jsonData.personalInfo, calisthenicsExperience: 'No' };
                 delete jsonData.personalInfo.calisthenicsLevel;
             }
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+${prefix}_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with ${prefix.toUpperCase()} Calisthenics data (${funnelId})`);
        } else if (funnelId === 'm3f123r') {
             jsonData = { ...config.m3f123rJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+m3f_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with M3F data (${funnelId})`);
        } else if (funnelId === 'chb2f23r') {
             jsonData = { ...config.chairBarreJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+chb2_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with Chair Barre data (${funnelId})`);
        } else if (funnelId === 'tch2f23r') {
             jsonData = { ...config.taiChiJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+tch2_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with Tai Chi data (${funnelId})`);
        } else {
            jsonData = config.defaultQuickFillJson;
            jsonData.funnelId = 'f1f123r';
            if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail+f1_${randomSuffix}@gmail.com`;
            }
            showStatus("Fields filled with default (f1) data.");
        }

        jsonDataArea.value = JSON.stringify(jsonData, null, 2);
        syncJsonAreaToInputs();
        updateHighlights();
        calculateAndDisplayScore();
    });

    clearSiteDataBtn.addEventListener('click', () => {
        clearAllCookies();
        localStorage.clear();
        sessionStorage.clear();
        showStatus("All site data cleared! Reloading...");
        setTimeout(() => {
            window.location.replace(window.location.pathname + window.location.search + window.location.hash);
        }, 800);
    });

    panel.querySelector('#close-cookie-editor').addEventListener('click', () => {
        clearInterval(pollingInterval);
        panel.remove();
    });
    toggleBtn.addEventListener('click', () => {
        panel.classList.toggle('collapsed');
        toggleBtn.textContent = panel.classList.contains('collapsed') ? '+' : '-';
    });

    // Spoilers Toggle Logic with Persistence
    const toggleSpoiler = (header, content, toggleIcon, storageKey) => {
        header.addEventListener('click', () => {
            const isHidden = window.getComputedStyle(content).display === 'none';
            content.style.display = isHidden ? 'block' : 'none';
            toggleIcon.textContent = isHidden ? '[-]' : '[+]';
            localStorage.setItem(storageKey, isHidden);
        });
    };

    toggleSpoiler(scoreSpoilerHeader, scoreSpoilerContent, scoreSpoilerToggle, config.storageKeys.scoreSpoiler);
    toggleSpoiler(personalSpoilerHeader, personalSpoilerContent, personalSpoilerToggle, config.storageKeys.personalSpoiler);

    // Personal Inputs Listeners
    pHeight.addEventListener('input', updateJsonFromPersonalInputs);
    pWeight.addEventListener('input', updateJsonFromPersonalInputs);
    pTargetWeight.addEventListener('input', updateJsonFromPersonalInputs);
    pAge.addEventListener('input', updateJsonFromPersonalInputs);

    // Score Buttons Delegation
    panel.querySelector('#cookie-editor-content').addEventListener('click', (e) => {
        const target = e.target.closest('.score-set-btn');
        if (!target || target.classList.contains('funnel-set-btn') || target.classList.contains('domain-set-btn')) return;
        const key = target.dataset.key;
        const value = target.dataset.value;
        if (key && value) {
            e.preventDefault();
            updateJsonValue(key, value);
        }
    });

    setSandboxTrueBtn.addEventListener('click', () => {
        setCookie('sandbox_test', 'true', 365);
        showStatus("Set 'sandbox_test' to true!");
        loadSandboxData();
    });

    deleteSandboxBtn.addEventListener('click', () => {
        setCookie('sandbox_test', '', -1);
        showStatus("Deleted 'sandbox_test' cookie!");
        loadSandboxData();
    });

    activeTabInput.addEventListener('input', syncInputsToJsonArea);
    emailInput.addEventListener('input', syncInputsToJsonArea);

    jsonDataArea.addEventListener('scroll', () => {
        jsonHighlighter.scrollTop = jsonDataArea.scrollTop;
        jsonHighlighter.scrollLeft = jsonDataArea.scrollLeft;
    });

    jsonDataArea.addEventListener('input', () => {
        syncJsonAreaToInputs();
        updateHighlights();
        calculateAndDisplayScore();
    });

    jsonSearchInput.addEventListener('input', updateHighlights);

    jsonSearchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchNextBtn.click();
        }
    });

    searchPrevBtn.addEventListener('click', () => {
        if (matches.length < 1) return;
        const newIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
        navigateToMatch(newIndex);
    });

    searchNextBtn.addEventListener('click', () => {
        if (matches.length < 1) return;
        const newIndex = (currentMatchIndex + 1) % matches.length;
        navigateToMatch(newIndex);
    });

    // --- Draggable Panel Logic ---
    const makeDraggable = (container) => {
        const dragHandle = container.querySelector('[data-handle="drag"]');
        if (!dragHandle) return;
        let isDragging = false, offsetX, offsetY;
        const onDragStart = (e) => {
            isDragging = true;
            const coords = e.touches ? e.touches[0] : e;
            offsetX = coords.clientX - container.getBoundingClientRect().left;
            offsetY = coords.clientY - container.getBoundingClientRect().top;
            container.style.transition = 'none';
            document.addEventListener('mousemove', onDragMove);
            document.addEventListener('touchmove', onDragMove, { passive: false });
            document.addEventListener('mouseup', onDragEnd);
            document.addEventListener('touchend', onDragEnd);
        };
        const onDragMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const coords = e.touches ? e.touches[0] : e;
            container.style.left = `${coords.clientX - offsetX}px`;
            container.style.top = `${coords.clientY - offsetY}px`;
        };
        const onDragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            document.removeEventListener('mousemove', onDragMove);
            document.removeEventListener('touchmove', onDragMove);
            document.removeEventListener('mouseup', onDragEnd);
            document.removeEventListener('touchend', onDragEnd);
            localStorage.setItem(config.storageKeys.position, JSON.stringify({ left: container.offsetLeft, top: container.offsetTop }));
        };
        dragHandle.addEventListener('mousedown', onDragStart);
        dragHandle.addEventListener('touchstart', onDragStart, { passive: false });
    };

    const initializePanelPosition = (container) => {
        const savedPos = localStorage.getItem(config.storageKeys.position);
        if (savedPos) {
            try {
                const pos = JSON.parse(savedPos);
                if (pos.left >= (window.innerWidth - 50) || pos.top >= (window.innerHeight - 50)) {
                     container.style.left = '10px';
                     container.style.top = '70px';
                } else {
                    container.style.left = `${pos.left}px`;
                    container.style.top = `${pos.top}px`;
                }
            } catch (e) {
                container.style.left = '10px';
                container.style.top = '70px';
            }
        } else {
             container.style.left = '10px';
             container.style.top = '70px';
        }
        container.style.right = 'auto';
        container.style.bottom = 'auto';
    };

    // --- Data Sync Polling ---
    let pollingInterval;
    function startCookiePolling() {
        let lastKnownScreensCookie = getCookie('screens');
        let lastKnownSandboxCookie = getCookie('sandbox_test');
        let lastKnownFeatureFlags = sessionStorage.getItem('featureFlags');
        let lastKnownFunnelConfig = sessionStorage.getItem('funnelConfig');
        let lastDiscountTs = localStorage.getItem('discountEndTimestamp');
        let lastDiscountExpired = localStorage.getItem('discountExpired');

        pollingInterval = setInterval(() => {
            const currentScreensCookie = getCookie('screens');
            const currentSandboxCookie = getCookie('sandbox_test');
            const currentFeatureFlags = sessionStorage.getItem('featureFlags');
            const currentFunnelConfig = sessionStorage.getItem('funnelConfig');
            const currentDiscountTs = localStorage.getItem('discountEndTimestamp');
            const currentDiscountExpired = localStorage.getItem('discountExpired');

            let needsCookieUpdate = false;
            let needsFlagUpdate = false;

            if (currentScreensCookie !== lastKnownScreensCookie || currentSandboxCookie !== lastKnownSandboxCookie) {
                lastKnownScreensCookie = currentScreensCookie;
                lastKnownSandboxCookie = currentSandboxCookie;
                needsCookieUpdate = true;
            }

            if (currentFeatureFlags !== lastKnownFeatureFlags) {
                lastKnownFeatureFlags = currentFeatureFlags;
                needsFlagUpdate = true;
            }

            if (needsCookieUpdate) {
                loadScreensData();
                loadSandboxData();
            }

            if (needsFlagUpdate && document.activeElement !== featureFlagsArea) {
                loadFeatureFlags();
            }

            if (currentFunnelConfig !== lastKnownFunnelConfig) {
                lastKnownFunnelConfig = currentFunnelConfig;
                if (document.activeElement !== screensFilterInput) loadFunnelConfigScreens();
            }

            if (currentDiscountTs !== lastDiscountTs || currentDiscountExpired !== lastDiscountExpired) {
                lastDiscountTs = currentDiscountTs;
                lastDiscountExpired = currentDiscountExpired;
                loadDiscount();
            }
        }, 750);
    }

    // --- Initialization ---
    document.body.appendChild(panel);
    loadCookieStates();
    makeDraggable(panel);
    initializePanelPosition(panel);
    restoreTextareaHeights();
    startCookiePolling();

})();
