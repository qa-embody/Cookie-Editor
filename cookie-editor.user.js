// ==UserScript==
// @name        Cookie Editor Pro (Mobile v3.16 - No Reload & Reorder)
// @namespace   http://tampermonkey.net/
// @version     3.16.0
// @description Added marketing params. Changed quick fill json for updated diet field: changed from string to array
// @author      Bohdan S.
// @match       https://haf-frontend.dev.prokit.me/*
// @match       https://haf-frontend.dev2.prokit.me/*
// @match       https://haf-frontend.stage.prokit.me/*
// @match       https://plan.helloembody.com/*
// @grant       GM_addStyle
// @updateURL   https://raw.githubusercontent.com/qa-embody/Cookie-Editor/main/cookie-editor.user.js
// @downloadURL https://raw.githubusercontent.com/qa-embody/Cookie-Editor/main/cookie-editor.user.js
// @license     MIT
// ==/UserScript==

(function() {
    'use strict';

    // --- Configuration ---
    const config = {
        storageKeys: {
            position: 'cookieEditorPosition_v2_mobile',
            personalSpoiler: 'cookieEditor_personalSpoilerOpen',
            scoreSpoiler: 'cookieEditor_scoreSpoilerOpen'
        },
        specialFunnels: ['w1f123r', 'w2f123r', 'c1f23r', 'chb2f23r', 'c2f23r', 'tch2f23r'],

        // --- JSON TEMPLATES ---
        defaultQuickFillJson: {
            "activeTab": 44, "funnelId": "f1f123r", "prevTab": null, "progress": 0, "selectedAge": 18, "selectedAgeValue": "18-29", "screensCount": 46, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 46, "firstScreenAge": 18, "goal": "Tone & sculpt", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["I have no issues"], "height": { "value": 150, "selectedUnit": "cm" }, "weightGoalDiff": 25,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Health issues", "Stress or other life factors"], "workoutType": ["Chair Barre", "Wall Pilates"], "workoutPreferences": ["All lying exercises"],
                "fitnessLevelScreen": "Intermediate", "flexibilityLevel": "I can touch the floor with my fingertips", "exerciseActivityLevel": "Occasionally", "stairsLevel": "Slightly winded after several flights",
                "walkingActivity": "Less than 1 hour", "squatsLevel": "Fewer 12", "dailyActivityLevel": "Mostly sedentary", "energyLevel": "Low, tired most of the day", "sleepTime": "Less than 5 hours", "water": "About 2 glasses", "diet": ["Mediterranean","Vegetarian"],
                "badFoodHabits": ["Overeating"], "fitnessLevel": "Low",
                "obese": { "BMI": "19.6", "BMI_range": "healthy", "somatotype": "mesomorph", "lifestyle": "sedentary", "fitness_level": "low", "metabolism": "moderate" },
                "importantEvent": "Other", "email": "hafrealtestmailf1+test@gmail.com", "name": "flex"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 19.555555555555557, "programType": "fitness"
        },
        chairYogaJson: {
            "activeTab": 58, "funnelId": "c1f23r", "prevTab": null, "progress": 0, "selectedAge": 40, "selectedAgeValue": "40-49", "screensCount": 60, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 60, "firstScreenAge": 40, "chairYogaExperienceScreen": "Yes", "goal": "Tone & sculpt", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Upper Body"],
                "weightChange": "I gain weight quickly but lose it slowly", "bestShape": "More than 3 years ago", "problemAreas": ["Legs"], "height": { "value": 150, "selectedUnit": "cm" }, "weightGoalDiff": 25,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 66, "selectedUnit": "years" },
                "obstacles": ["Health issues"], "fitnessLevelScreen": "Advanced", "flexibilityLevel": "I can place my palms flat on the floor", "exerciseActivityLevel": "Regularly", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivity": "More than 2 hours", "squatsLevel": "More than 20", "dailyActivityLevel": "Moderately active", "energyLevel": "High and consistent all day", "sleepTime": "Less than 5 hours", "water": "More than 10 glasses", "diet": ["None"],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "Intermediate",
                "obese": { "BMI": "19.6", "BMI_range": "healthy", "somatotype": "endomorph", "lifestyle": "active", "fitness_level": "intermediate", "metabolism": "slow" },
                "referralSource": "Coach", "importantEvent": "Wedding", "importantEventDate": "03/22/2026", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmailc1+test@gmail.com", "name": "Chair Yoga"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 19.555555555555557, "programType": "yoga"
        },
        chairBarreJson: {
            "activeTab": 58, "funnelId": "chb2f23r", "prevTab": null, "progress": 0, "selectedAge": 50, "selectedAgeValue": "50-59", "screensCount": 60, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 60, "firstScreenAge": 50, "chairYogaExperienceScreen": "Yes", "goal": "Maintain weight", "driveGoal": ["Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Balanced", "focusZones": ["Total Body"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["Legs", "Back", "Arms", "Neck"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 11,
                "currentWeight": { "value": 44, "selectedUnit": "kg" }, "targetWeight": { "value": 49, "selectedUnit": "kg" }, "age": { "value": 55, "selectedUnit": "years" },
                "obstacles": ["Health issues", "Unrealistic expectations"], "fitnessLevelScreen": "Advanced", "flexibilityLevel": "I can place my palms flat on the floor", "exerciseActivityLevel": "Regularly", "stairsLevel": "Out of breath after 1-2 flights", "walkingActivity": "More than 2 hours", "squatsLevel": "More than 20", "dailyActivityLevel": "Moderately active", "energyLevel": "Stable, but not very high", "sleepTime": "Less than 5 hours", "water": "2-6 glasses", "diet": ["Keto"],
                "badFoodHabits": ["None of the above"], "fitnessLevel": "Intermediate",
                "obese": { "BMI": "13.6", "BMI_range": "underweight", "somatotype": "ecto-meso mix", "lifestyle": "active", "fitness_level": "intermediate", "metabolism": "moderate" },
                "referralSource": "Social media ads", "importantEvent": "Reunion", "importantEventDate": "04/08/2026", "personalConfidence": "I’m uncertain, but willing to try!", "email": "hafrealtestmailchb2+test@gmail.com", "name": "NameChair Barre"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 13.580246913580247, "programType": "barre", "weightGoalDiff": 11
        },
        taiChiJson: {
            "activeTab": 58, "funnelId": "tch2f23r", "prevTab": "chairYogaExperienceScreen", "progress": 0, "selectedAge": 40, "selectedAgeValue": "40-49", "screensCount": 60, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 60, "firstScreenAge": 40, "chairYogaExperienceScreen": "Yes", "goal": "Maintain weight", "driveGoal": ["Improve physical appearance"], "bodyCurrent": "Toned", "bodyTarget": "Toned", "focusZones": ["Upper Body", "Core"],
                "weightChange": "I gain and lose weight easily", "bestShape": "1 to 2 years ago", "problemAreas": ["Back"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": -37,
                "currentWeight": { "value": 88, "selectedUnit": "kg" }, "targetWeight": { "value": 55, "selectedUnit": "kg" }, "age": { "value": 33, "selectedUnit": "years" },
                "obstacles": ["Lack of accountability", "Not sure what to do"], "fitnessLevelScreen": "New to Tai Chi", "flexibilityLevel": "I can touch the floor with my fingertips", "exerciseActivityLevel": "Almost daily", "stairsLevel": "Slightly winded after several flights", "walkingActivity": "1-2 hours", "squatsLevel": "More than 20", "dailyActivityLevel": "Very active", "energyLevel": "Stable, but not very high", "sleepTime": "Less than 5 hours", "water": "More than 10 glasses", "diet": ["None"],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "High",
                "obese": { "BMI": "27.2", "BMI_range": "overweight", "somatotype": "mesomorph", "lifestyle": "active", "fitness_level": "high", "metabolism": "moderate" },
                "referralSource": "Web search", "importantEvent": "Reunion", "importantEventDate": "04/27/2026", "personalConfidence": "I’m uncertain, but willing to try!", "email": "hafrealtestmailtch2+test@gmail.com", "name": "Tai Chi"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 27.160493827160494, "programType": "taichi", "weightGoalDiff": -37
        },
        wallPilatesJson: {
            "activeTab": 58, "funnelId": "w2f123r", "prevTab": null, "progress": 0, "selectedAge": 30, "selectedAgeValue": "30-39", "screensCount": 60, "unitsOfMeasurement": "kg", "paywallStatus": null, "selectedPlan": null,
            "personalInfo": {
                "totalScreens": 60, "firstScreenAge": 30, "wallPilatesExperienceScreen": "Yes", "goal": "Tone & sculpt", "driveGoal": ["Alleviate body aches", "Reduce stress & anxiety"], "bodyCurrent": "Medium Build", "bodyTarget": "Toned", "focusZones": ["Core", "Upper Body"],
                "weightChange": "I gain weight quickly but lose it  slowly", "bestShape": "1 to 2 years ago", "problemAreas": ["Legs", "Back"], "height": { "value": 180, "selectedUnit": "cm" }, "weightGoalDiff": 6,
                "currentWeight": { "value": 66, "selectedUnit": "kg" }, "targetWeight": { "value": 70, "selectedUnit": "kg" }, "age": { "value": 30, "selectedUnit": "years" },
                "obstacles": ["Not sure what to do", "Inconsistent routine"], "fitnessLevelScreen": "Intermediate", "flexibilityLevel": "I can place my palms flat on the floor", "exerciseActivityLevel": "Occasionally", "stairsLevel": "Out of breath after 1-2 flights",
                "walkingActivity": "1-2 hours", "squatsLevel": "13-20", "dailyActivityLevel": "Moderately active", "energyLevel": "Energy fluctuates all day", "sleepTime": "Less than 5 hours", "water": "7-10 glasses", "diet": ["Mediterranean","Vegetarian"],
                "badFoodHabits": ["Skipping meal to often"], "fitnessLevel": "Low",
                "obese": { "BMI": "20.4", "BMI_range": "healthy", "somatotype": "endomorph", "lifestyle": "moderately active", "fitness_level": "low", "metabolism": "slow", "pilates_level": "low" },
                "referralSource": "Social media ads", "importantEvent": "Wedding", "personalConfidence": "I’m still really unsure", "email": "hafrealtestmailw1-w2+test@gmail.com", "name": "Name-Wall Pilates"
            },
            "checkoutFail": null, "checkoutPayment": null, "measurementSystem": "metric", "bmi": 20.37037037037037, "programType": "pilates"
        }
    };

    // --- Weights & Maps ---
    const weights = { flexibility: 0.4, yogaPilates: 1.0, activityLevel: 0.6 };
    const totalWeight = weights.flexibility + weights.yogaPilates + weights.activityLevel;
    const fitnessWeights = { exercise: 0.5, squats: 1.0, stairs: 1.0 };

    const scoreMaps = {
        exerciseActivityLevel: { "I haven’t started yet": 0, "Occasionally": 0.2, "Regularly": 0.5, "Often": 0.8, "Almost daily": 1 },
        stairsLevel: { "Out of breath after few steps": 0, "Out of breath after 1-2 flights": 0.4, "Slightly winded after several flights": 0.6, "Fine, no issues": 1 },
        squatsLevel: { "Fewer 12": 0, "13-20": 0.55, "More than 20": 1, "I don't know": 0 }
    };
    const yogaPilatesScoreMap = { "New to yoga": 0, "New to pilates": 0, "Beginner": 0.4, "Intermediate": 0.6, "Advanced": 1 };
    const flexibilityScoreMap = { "I can’t reach the floor": 0, "I can touch the floor with my fingertips": 0.55, "I can place my palms flat on the floor": 1 };
    const activityScoreMap = { "very low": 0, "low": 0.20, "intermediate": 0.50, "high": 0.8, "advanced": 1 };

    const fatMap = {
        "Slim": "15-19%",
        "Toned": "<15%",
        "Medium Build": "20-34%",
        "Plus-sized": "35-39%",
        "Overweight": "40%"
    };

    // --- Styles ---
    GM_addStyle(`
        #cookie-editor-panel { position: fixed; top: 70px; left: 10px; width: 90vw; max-width: 400px; max-height: 85vh; background-color: rgba(40, 44, 52, 0.98); backdrop-filter: blur(5px); color: #abb2bf; border: 1px solid #4f5b66; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.6); z-index: 2147483647; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; font-size: 13px; display: flex; flex-direction: column; overflow: hidden; }
        #cookie-editor-panel.collapsed { height: 42px !important; width: 180px; }
        #cookie-editor-header { background-color: rgba(60, 64, 73, 1); padding: 0 10px; height: 40px; cursor: move; border-bottom: 1px solid #4f5b66; display: flex; justify-content: space-between; align-items: center; user-select: none; flex-shrink: 0; }
        #cookie-editor-header-title-group { display: flex; flex-direction: row; align-items: center; gap: 8px; overflow: hidden; white-space: nowrap; flex: 1; }
        #cookie-editor-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #ffffff; line-height: 1; }
        #status-message { font-size: 11px; color: #98c379; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-weight: normal; opacity: 0; transition: opacity 0.3s; max-width: 120px; }
        #cookie-editor-controls { display: flex; align-items: center; gap: 12px; flex-shrink: 0; height: 100%; }
        #cookie-editor-controls button { background: none; border: none; color: #abb2bf; font-size: 20px; cursor: pointer; line-height: 1; padding: 0; display: flex; align-items: center; justify-content: center; height: 100%; width: 20px; }
        #cookie-editor-controls button:hover { color: #ffffff; }
        #cookie-editor-content { padding: 12px; overflow-y: auto; flex-grow: 1; -webkit-overflow-scrolling: touch; }
        .editor-field { margin-bottom: 12px; }
        .editor-field label { display: block; margin-bottom: 5px; font-weight: 500; color: #9da5b4; font-size: 12px; }
        .editor-field input, .editor-field textarea { width: 100%; padding: 8px; background-color: #21252b; border: 1px solid #4f5b66; border-radius: 4px; color: #abb2bf; font-size: 13px; box-sizing: border-box; }
        .editor-field input:focus, .editor-field textarea:focus { outline: none; border-color: #61afef; }
        .editor-field textarea { min-height: 120px; resize: vertical; font-family: monospace; line-height: 1.4; }
        #cookie-editor-footer { padding: 12px; border-top: 1px solid #4f5b66; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px; }
        #cookie-editor-footer > div { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        button.action-btn { border: none; padding: 10px 14px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 13px; transition: background-color 0.2s; }
        #save-cookie-btn { background-color: #61afef; color: #282c34; }
        #quick-fill-btn { background-color: #4f5b66; color: #abb2bf; }
        #clear-site-data-btn { background-color: #e06c75; color: #282c34; }
        .sandbox-btn { flex: 1; background-color: #4f5b66; color: #abb2bf; border: none; padding: 8px 10px; border-radius: 5px; cursor: pointer; font-weight: bold; font-size: 12px; }
        .sandbox-btn.danger { background-color: #e06c75; color: #282c34; }
        .activate-btn { background-color: #98c379 !important; color: #282c34 !important; }

        .json-search-container { position: relative; }
        #json-highlighter { position: absolute; top: 0; left: 0; width: 100%; height: 100%; padding: 8px; box-sizing: border-box; color: transparent; overflow: auto; pointer-events: none; white-space: pre-wrap; word-wrap: break-word; font-family: monospace; font-size: 13px; line-height: 1.4; z-index: 1; border: 1px solid transparent; }
        #json-data-area { background: transparent; position: relative; z-index: 2; caret-color: #abb2bf; }
        #json-highlighter .highlight { background-color: rgba(229, 192, 123, 0.5); border-radius: 2px; }
        #json-highlighter .highlight.active { background-color: rgba(152, 195, 121, 0.7); }
        #json-search-input { width: calc(100% - 110px); margin-bottom: 5px; display: inline-block; padding: 8px; }
        .search-nav-btn { background: #4f5b66; border: none; color: #abb2bf; cursor: pointer; border-radius: 3px; width: 30px; height: 30px; line-height: 28px; padding: 0; margin-left: 4px; vertical-align: middle; }
        #json-search-status { display: inline-block; width: 55px; text-align: right; color: #9da5b4; font-size: 11px; vertical-align: middle; }

        /* SCORE & PERSONAL SPOILERS */
        .spoiler-header { padding: 8px; background-color: #21252b; border-radius: 4px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; border: 1px solid #4f5b66; }
        .spoiler-header label { font-size: 12px; font-weight: 500; color: #9da5b4; margin: 0; cursor: pointer; }
        .spoiler-toggle { font-size: 14px; font-weight: bold; color: #61afef; user-select: none; }
        .spoiler-content { display: none; padding-left: 5px; border-left: 2px solid #4f5b66; margin-bottom: 15px; }

        /* PERSONAL STATS UI */
        .personal-row { display: flex; gap: 8px; align-items: stretch; margin-bottom: 8px; flex-wrap: nowrap; }
        .mini-input-group { flex: 1; display: flex; flex-direction: column; justify-content: flex-end; }
        .mini-input-group label { margin-bottom: 2px; font-size: 10px; display: block; text-align: left; }
        .mini-input-group input { width: 100%; text-align: center; color: #ffffff !important; font-weight: bold; padding: 6px; }
        /* BMI Styling aligned */
        #personal-bmi-value { font-size: 14px; font-weight: bold; color: #e5c07b; padding: 6px 5px; display: block; text-align: center; line-height: 1.2; height: 100%; box-sizing: border-box; }

        .score-button-group { display: flex; gap: 4px; flex-wrap: wrap; justify-content: flex-end; }
        .score-set-btn { background-color: #4f5b66; color: #abb2bf; border: 1px solid #5a6470; border-radius: 3px; padding: 6px; font-size: 11px; cursor: pointer; transition: all 0.2s; font-weight: bold; flex-grow: 1; text-align: center; }
        .score-set-btn:hover { background-color: #5a6470; border-color: #61afef; color: #ffffff; }

        .score-display-wrapper { display: flex; justify-content: space-between; align-items: center; padding: 6px; background-color: #21252b; border-radius: 4px; margin-bottom: 4px; }
        .score-display-wrapper span { font-size: 13px; font-weight: bold; }
        .score-breakdown { font-size: 11px; color: #9da5b4; background-color: #2c313a; border-radius: 4px; padding: 6px; margin-top: 4px; display: none; line-height: 1.4; }
        #fitness-score-breakdown .score-display-wrapper { padding: 0; background: none; margin-top: 5px; }
        #fitness-score-breakdown .score-display-wrapper span { font-size: 11px; font-weight: normal; }
        #plan-score-formula, #fitness-score-formula { font-size: 11px; color: #9da5b4; display: block; margin-top: 4px; font-weight: normal; word-wrap: break-word; }
        #assigned-plan-value { color: #61afef; font-weight: bold; }

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
                <label for="active-tab-input">activeTab:</label>
                <input type="number" id="active-tab-input" placeholder="e.g., 44">
            </div>
             <div class="editor-field">
                <label for="email-input">Email (personalInfo.email):</label>
                <input type="email" id="email-input" placeholder="e.g., test@example.com">
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

                <div class="score-display-wrapper" style="margin-bottom:8px;">
                    <label style="font-size:11px; display:block;">Goal Msg:</label>
                    <span id="goal-msg-val" style="color:#ffffff; font-weight:normal; font-size:11px;">...</span>
                </div>

                <div class="editor-field">
                    <label>Set Age Group:</label>
                    <div class="score-button-group" id="age-presets-container"></div>
                </div>

                <div class="editor-field">
                    <label>Weight Change:</label>
                    <div class="score-display-wrapper">
                        <span id="val-weight-change" style="font-size:11px; font-weight:normal; max-width:60%; overflow:hidden; text-overflow:ellipsis;">...</span>
                    </div>
                    <div class="score-button-group">
                        <button class="score-set-btn" data-key="weightChange" data-value="I gain and lose weight easily">Gain/Lose Easy</button>
                        <button class="score-set-btn" data-key="weightChange" data-value="I struggle to gain weight and <br> muscle">Struggle Gain</button>
                        <button class="score-set-btn" data-key="weightChange" data-value="I gain weight quickly but lose it <br> slowly">Gain Quick/Lose Slow</button>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Body Fat (bodyCurrent):</label>
                    <div class="score-display-wrapper">
                        <span id="val-body-current" style="color: #61afef;">...</span>
                        <span id="val-fat-percent" style="color: #e5c07b; font-size:11px;"></span>
                    </div>
                    <div class="score-button-group">
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
                        <span id="val-daily-activity" style="font-size:11px; font-weight:normal;">...</span>
                    </div>
                    <div class="score-button-group">
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
                        <span id="val-walking-activity" style="font-size:11px; font-weight:normal;">...</span>
                    </div>
                    <div class="score-button-group">
                        <button class="score-set-btn" data-key="walkingActivity" data-value="Less than 1 hour">&lt; 1hr</button>
                        <button class="score-set-btn" data-key="walkingActivity" data-value="1-2 hours">1-2hr</button>
                        <button class="score-set-btn" data-key="walkingActivity" data-value="More than 2 hours">&gt; 2hr</button>
                    </div>
                </div>

                <div class="editor-field">
                    <div class="score-display-wrapper">
                        <label style="font-size:11px;">Metabolism:</label>
                        <span id="meta-val" style="color:#98c379;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:11px;">Somatotype:</label>
                        <span id="soma-val" style="color:#c678dd;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:11px;">Lifestyle:</label>
                        <span id="life-val" style="color:#61afef;">...</span>
                    </div>
                    <div class="score-display-wrapper" id="prog-level-row" style="display:none;">
                        <label style="font-size:11px;" id="prog-level-label">Prog Level:</label>
                        <span id="prog-level-val" style="color:#61afef;">...</span>
                    </div>
                    <div class="score-display-wrapper">
                        <label style="font-size:11px;">Fitness Level:</label>
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
                        <div class="score-button-group" id="flex-btn-group">
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
                        <div class="score-button-group" id="yoga-btn-group">
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="New to yoga" title="0">0</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Beginner" title="0.4">0.4</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Intermediate" title="0.6">0.6</button>
                            <button class="score-set-btn" data-key="fitnessLevelScreen" data-value="Advanced" title="1">1</button>
                        </div>
                    </div>
                    <div id="yoga-score-breakdown" class="score-breakdown"></div>
                </div>

                <div class="editor-field">
                    <label>Fitness Level:</label>
                    <div id="fitness-score-status" style="padding: 6px; background-color: #21252b; border-radius: 4px;">
                         <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span id="fitness-score-value" style="font-size: 13px; font-weight: bold; color: #98c379;">N/A</span>
                            <span id="fitness-score-label" style="font-size: 11px; color: #e5c07b; font-weight: normal;"></span>
                        </div>
                        <span id="fitness-score-formula">(Calculation requires valid data)</span>
                    </div>
                    <div id="fitness-score-breakdown" class="score-breakdown" style="line-height: 1.4;">
                        <div class="score-display-wrapper">
                            <span id="score-exercise">Ex: 0</span>
                            <div class="score-button-group">
                                <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="I haven’t started yet">0</button>
                                <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Occasionally">0.2</button>
                                <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Regularly">0.5</button>
                                <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Often">0.8</button>
                                <button class="score-set-btn" data-key="exerciseActivityLevel" data-value="Almost daily">1</button>
                            </div>
                        </div>
                        <div class="score-display-wrapper">
                            <span id="score-stairs">St: 0</span>
                            <div class="score-button-group">
                                <button class="score-set-btn" data-key="stairsLevel" data-value="Out of breath after few steps">0</button>
                                <button class="score-set-btn" data-key="stairsLevel" data-value="Out of breath after 1-2 flights">0.4</button>
                                <button class="score-set-btn" data-key="stairsLevel" data-value="Slightly winded after several flights">0.6</button>
                                <button class="score-set-btn" data-key="stairsLevel" data-value="Fine, no issues">1</button>
                            </div>
                        </div>
                        <div class="score-display-wrapper">
                            <span id="score-squats">Sq: 0</span>
                            <div class="score-button-group">
                                <button class="score-set-btn" data-key="squatsLevel" data-value="Fewer 12">0</button>
                                <button class="score-set-btn" data-key="squatsLevel" data-value="13-20">0.55</button>
                                <button class="score-set-btn" data-key="squatsLevel" data-value="More than 20">1</button>
                                <button class="score-set-btn" data-key="squatsLevel" data-value="I don't know">N/A</button>
                            </div>
                        </div>
                    </div>
                </div>

                 <div class="editor-field">
                    <label>💯Activity level score:</label>
                    <div id="activity-level-score-status" style="padding: 6px; background-color: #21252b; border-radius: 4px; font-size: 13px; font-weight: bold;">
                        <span id="activity-level-score-value" style="color: #61afef;">N/A</span>
                    </div>
                    <div id="activity-score-breakdown" class="score-breakdown"></div>
                </div>

                <div class="editor-field">
                    <label>Plan Score:</label>
                    <div id="plan-score-status" style="padding: 6px; background-color: #21252b; border-radius: 4px; font-size: 13px; font-weight: bold;">
                        <span id="plan-score-value" style="color: #98c379;">N/A</span>
                        <span id="plan-score-formula">(Calculation requires valid data)</span>
                    </div>
                </div>

                <div class="editor-field">
                    <label>Assigned Plan:</label>
                    <div id="assigned-plan-status" style="padding: 6px; background-color: #21252b; border-radius: 4px; font-size: 13px; font-weight: bold;">
                        <span id="assigned-plan-value" style="color: #61afef;">N/A</span>
                    </div>
                </div>
            </div>

            <hr style="border-color: #4f5b66; margin: 15px 0;">

            <div class="editor-field" id="sandbox-container">
                <label>Sandbox Cookie ('sandbox_test'):</label>
                <div id="sandbox-status" style="margin-bottom: 10px; padding: 6px; background-color: #21252b; border-radius: 4px; font-size: 11px;">
                    Current value: <strong id="sandbox-value" style="color: #e5c07b;">Not set</strong>
                </div>
                <div id="sandbox-controls" style="display: flex; gap: 10px;">
                    <button id="set-sandbox-true-btn" class="sandbox-btn">Set 'true'</button>
                    <button id="delete-sandbox-btn" class="sandbox-btn danger">Delete</button>
                </div>
            </div>

            <div class="editor-field">
                <label>Discount Controls:</label>
                <div style="margin-top:5px; display:flex; gap:10px;">
                    <button id="discount-activate-btn" class="sandbox-btn activate-btn">Activate Discount (+10m)</button>
                    <button id="discount-expire-btn" class="sandbox-btn danger">Expire Now</button>
                </div>
            </div>

            <div class="editor-field">
                <label>Marketing Params:</label>
                <div style="display:flex; gap:10px;">
                    <div style="flex:1">
                        <button id="add-meta-param" class="sandbox-btn" style="width:100%">Meta Params</button>
                        <div style="font-size:10px; color:#9da5b4; margin-top:2px; text-align:center;">Pixel: <span id="meta-pixel-id">...</span></div>
                    </div>
                    <div style="flex:1">
                        <button id="add-tiktok-param" class="sandbox-btn" style="width:100%">TikTok Params</button>
                        <div style="font-size:10px; color:#9da5b4; margin-top:2px; text-align:center;">Pixel: <span id="tiktok-pixel-id">...</span></div>
                    </div>
                </div>
            </div>
        </div>
        <div id="cookie-editor-footer">
             <div>
                <button id="save-cookie-btn" class="action-btn">Save</button>
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
    const jsonSearchInput = panel.querySelector('#json-search-input');
    const jsonSearchStatus = panel.querySelector('#json-search-status');
    const jsonHighlighter = panel.querySelector('#json-highlighter');
    const searchPrevBtn = panel.querySelector('#search-prev-btn');
    const searchNextBtn = panel.querySelector('#search-next-btn');
    const addMetaParamBtn = panel.querySelector('#add-meta-param');
    const addTikTokParamBtn = panel.querySelector('#add-tiktok-param');
    const metaPixelIdSpan = panel.querySelector('#meta-pixel-id');
    const tiktokPixelIdSpan = panel.querySelector('#tiktok-pixel-id');

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
    const fitnessScoreValue = panel.querySelector('#fitness-score-value');
    const fitnessScoreLabel = panel.querySelector('#fitness-score-label');
    const fitnessScoreFormula = panel.querySelector('#fitness-score-formula');
    const fitnessScoreBreakdown = panel.querySelector('#fitness-score-breakdown');
    const scoreExercise = panel.querySelector('#score-exercise');
    const scoreStairs = panel.querySelector('#score-stairs');
    const scoreSquats = panel.querySelector('#score-squats');
    const activityLevelScoreValue = panel.querySelector('#activity-level-score-value');
    const planScoreValue = panel.querySelector('#plan-score-value');
    const planScoreFormula = panel.querySelector('#plan-score-formula');
    const assignedPlanValue = panel.querySelector('#assigned-plan-value');
    const flexScoreBreakdown = panel.querySelector('#flex-score-breakdown');
    const yogaScoreBreakdown = panel.querySelector('#yoga-score-breakdown');
    const activityScoreBreakdown = panel.querySelector('#activity-score-breakdown');

    // Spoilers
    const scoreSpoilerHeader = panel.querySelector('#score-spoiler-header');
    const scoreSpoilerContent = panel.querySelector('#score-spoiler-content');
    const scoreSpoilerToggle = panel.querySelector('#score-spoiler-header .spoiler-toggle');
    const personalSpoilerHeader = panel.querySelector('#personal-spoiler-header');
    const personalSpoilerContent = panel.querySelector('#personal-spoiler-content');
    const personalSpoilerToggle = panel.querySelector('#personal-spoiler-header .spoiler-toggle');


    let matches = [];
    let currentMatchIndex = -1;

    // --- Helper for Random String ---
    function generateRandomString(length) {
        const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    // --- Logic: Marketing Params ---
    function initMarketingParams() {
        const hostname = window.location.hostname;
        const isProd = hostname === 'plan.helloembody.com';

        // Pixel IDs
        const metaId = isProd ? '1778552282789473' : '716048184868331';
        const tiktokId = isProd ? 'D46T08JC77U505N92KE0' : 'D429PVRC77UA61AHKL50';

        metaPixelIdSpan.textContent = metaId;
        tiktokPixelIdSpan.textContent = tiktokId;

        // Button Handlers (No Reload)
        addMetaParamBtn.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('utm_source', 'meta');
            url.searchParams.set('fbclid', generateRandomString(20)); // Random fbclid
            url.searchParams.delete('ttclid'); // Remove conflicting param

            window.history.replaceState({}, '', url.toString());
            showStatus('Meta params added (No Reload)');
        });

        addTikTokParamBtn.addEventListener('click', () => {
            const url = new URL(window.location.href);
            url.searchParams.set('utm_source', 'tiktok');
            url.searchParams.set('ttclid', generateRandomString(20)); // Random ttclid
            url.searchParams.delete('fbclid'); // Remove conflicting param

            window.history.replaceState({}, '', url.toString());
            showStatus('TikTok params added (No Reload)');
        });
    }

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

    // --- Logic: Age Presets ---
    function renderAgePresets() {
        const funnel = getFunnelIdFromUrl();
        let presets = [];
        if (funnel === 'c1f23r' || funnel === 'chb2f23r' || funnel === 'c2f23r' || funnel === 'tch2f23r') {
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
            location.reload();
        }, delay);
    }

    function getFunnelIdFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('funnel');
    }

    // --- Hide Sandbox Check ---
    const currentFunnel = getFunnelIdFromUrl();
    const sandboxContainer = panel.querySelector('#sandbox-container');
    if ((currentFunnel === 'w2f123r' || currentFunnel === 'chb2f23r' || currentFunnel === 'c2f23r' || currentFunnel === 'tch2f23r') && sandboxContainer) {
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

    function calculateMetabolismAndSomatotype(bmi, weightChange, bodyCurrent) {
        // Normalize Inputs
        let bmiRange = '';
        if (bmi < 18.5) bmiRange = 'under';
        else if (bmi <= 24.9) bmiRange = 'healthy';
        else if (bmi <= 29.9) bmiRange = 'over';
        else bmiRange = 'obese';

        let pattern = '';
        if (weightChange && weightChange.includes('struggle')) pattern = 'struggle';
        else if (weightChange && weightChange.includes('lose weight easily')) pattern = 'easy';
        else if (weightChange && weightChange.includes('quickly')) pattern = 'quick';

        let fat = 'mid'; // Default 20-34
        if (['Toned', 'Slim'].includes(bodyCurrent)) fat = 'low'; // <19%
        else if (['Plus-sized', 'Overweight'].includes(bodyCurrent)) fat = 'high'; // >=35%

        // Logic Tree based on Spreadsheet
        let meta = 'Moderate';
        let soma = 'Mesomorph';

        if (bmiRange === 'under') {
            if (pattern === 'struggle') { meta = 'Fast'; soma = 'Ectomorph'; }
            else if (pattern === 'easy') { meta = 'Moderate'; soma = 'Ecto-Meso mix'; }
            else if (pattern === 'quick') {
                if (fat === 'high') { meta = 'Slow'; soma = 'Meso-Endo mix'; }
                else { meta = 'Moderate'; soma = 'Mesomorph'; }
            }
        } else if (bmiRange === 'healthy') {
            if (pattern === 'struggle') {
                if (fat === 'high') { meta = 'Moderate'; soma = 'Ecto-Meso mix'; }
                else { meta = 'Fast'; soma = 'Ectomorph'; }
            } else if (pattern === 'easy') {
                if (fat === 'high') { meta = 'Moderate'; soma = 'Mesomorph'; }
                else if (fat === 'low') { meta = 'Moderate'; soma = 'Mesomorph'; }
                else { meta = 'Moderate'; soma = 'Mesomorph'; }
            } else if (pattern === 'quick') {
                if (fat === 'low') { meta = 'Moderate'; soma = 'Mesomorph'; }
                else { meta = 'Slow'; soma = 'Meso-Endo mix'; }
            }
        } else if (bmiRange === 'over') {
            if (pattern === 'struggle') {
                if (fat === 'low') { meta = 'Moderate'; soma = 'Ecto-Meso mix'; }
                else { meta = 'Slow'; soma = 'Meso-Endo mix'; }
            } else if (pattern === 'easy') {
                if (fat === 'low') { meta = 'Moderate'; soma = 'Mesomorph'; }
                else { meta = 'Moderate'; soma = 'Mesomorph'; }
            } else if (pattern === 'quick') {
                if (fat === 'low') { meta = 'Slow'; soma = 'Meso-Endo mix'; }
                else { meta = 'Slow'; soma = 'Endomorph'; }
            }
        } else { // Obese
            meta = 'Slow';
            if (pattern === 'struggle') soma = 'Meso-Endo mix';
            else soma = 'Endomorph';
        }

        return { meta, soma };
    }

    function calculateLifestyle(daily, walking) {
        // Map answers to matrix indices
        // Daily: Mostly sedentary (0), Lightly active (1), Moderately active (2), Very active (3), Highly active (4)
        // Walking: Less than 1 hour (0), 1-2 hours (1), More than 2 hours (2)

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

    function calculateAndDisplayScore() {
        let data;
        const resetToError = (message) => {
            if (planScoreFormula) planScoreFormula.textContent = message;
            if (fitnessScoreFormula) fitnessScoreFormula.textContent = message;
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
        valWalkingActivity.textContent = pInfo.walkingActivity || '...';
        fitLevelVal.textContent = pInfo.fitnessLevel || '...';

        // --- Show/Hide Pilates/Yoga Level ---
        const funnel = getFunnelIdFromUrl();
        if (funnel === 'c1f23r' || funnel === 'c2f23r' || funnel === 'chb2f23r') {
            progLevelLabel.textContent = 'Yoga Level:';
            progLevelVal.textContent = pInfo.fitnessLevelScreen || '...';
            progLevelRow.style.display = 'flex';
        } else if (funnel === 'w1f123r' || funnel === 'w2f123r') {
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
        if (pInfo.dailyActivityLevel && pInfo.walkingActivity) {
            lifestyleRes = calculateLifestyle(pInfo.dailyActivityLevel, pInfo.walkingActivity);
        }
        lifeVal.textContent = lifestyleRes;

        // --- GOAL MESSAGE LOGIC ---
        let goalMessage = "...";
        let diffPercent = 0;

        if (bmiNum > 0 && pInfo.targetWeight && pInfo.targetWeight.value) {
            let target = parseFloat(pInfo.targetWeight.value);
            let current = parseFloat(pInfo.currentWeight.value);

            // Re-convert to KG for diff calculation if needed, but formula relies on % difference
            // Diff = (Target - Current) / Current
            let diff = (target - current) / current;
            diffPercent = Math.round(Math.abs(diff * 100)); // Whole number for display/JSON

            // Formula Logic:
            // B2 = Current (weightInKg)
            // C2 = Height (heightInM)
            // D2 = diff (decimal, e.g. -0.25)
            // 18.5 * C2 * C2 is lower healthy weight boundary

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

            // Update diff in JSON
            data.weightGoalDiff = Math.round(diff * 100); // e.g. -25 or 15
        }
        goalMsgVal.textContent = goalMessage;


        if (bmiNum > 0 && pInfo.weightChange && pInfo.bodyCurrent) {
            const result = calculateMetabolismAndSomatotype(bmiNum, pInfo.weightChange, pInfo.bodyCurrent);
            metaVal.textContent = result.meta;
            somaVal.textContent = result.soma;

            // Update JSON obese object
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

        // Flexibility
        const flexVal = pInfo.flexibilityLevel;
        const flexScore = flexibilityScoreMap[flexVal] ?? 0;
        flexibilityScoreValue.textContent = flexibilityScoreMap[flexVal] !== undefined ? flexScore.toFixed(2) : 'N/A';
        let flexBreakdownHTML = '';
        for (const [key, value] of Object.entries(flexibilityScoreMap)) {
            flexBreakdownHTML += `<div>${value.toFixed(2)} = "${key}"</div>`;
        }
        flexScoreBreakdown.innerHTML = flexBreakdownHTML;

        // Yoga
        const yogaVal = pInfo.fitnessLevelScreen;
        const yogaScore = yogaPilatesScoreMap[yogaVal] ?? 0;
        yogaPilatesScoreValue.textContent = yogaPilatesScoreMap[yogaVal] !== undefined ? yogaScore.toFixed(2) : 'N/A';
        let yogaBreakdownHTML = '';
        for (const [key, value] of Object.entries(yogaPilatesScoreMap)) {
            yogaBreakdownHTML += `<div>${value.toFixed(2)} = "${key}"</div>`;
        }
        yogaScoreBreakdown.innerHTML = yogaBreakdownHTML;

        // Fitness
        const exerciseVal = pInfo.exerciseActivityLevel;
        const stairsVal = pInfo.stairsLevel;
        const squatsVal = pInfo.squatsLevel;
        const exerciseScore = scoreMaps.exerciseActivityLevel[exerciseVal] ?? 0;
        const stairsScore = scoreMaps.stairsLevel[stairsVal] ?? 0;
        let squatsScore = 0;
        let weightedSumFitness = (exerciseScore * fitnessWeights.exercise) + (stairsScore * fitnessWeights.stairs);
        let totalDivisorFitness = fitnessWeights.exercise + fitnessWeights.stairs;

        if (squatsVal !== "I don't know") {
            squatsScore = scoreMaps.squatsLevel[squatsVal] ?? 0;
            weightedSumFitness += squatsScore * fitnessWeights.squats;
            totalDivisorFitness += fitnessWeights.squats;
        }

        const totalScore = weightedSumFitness / (totalDivisorFitness || 1);

        // Activity Level Logic
        let calculatedLabel = "";
        if (totalScore <= 0.21) calculatedLabel = "very low";
        else if (totalScore <= 0.47) calculatedLabel = "low";
        else if (totalScore <= 0.68) calculatedLabel = "intermediate";
        else if (totalScore <= 0.88) calculatedLabel = "high";
        else calculatedLabel = "advanced";

        let finalLabel = calculatedLabel;
        let overrideReason = "";
        if (stairsVal === "Out of breath after few steps") {
            finalLabel = "very low";
            if (calculatedLabel !== "very low") overrideReason = "(override)";
        } else if (stairsVal === "Out of breath after 1-2 flights") {
             const labelOrder = ["very low", "low", "intermediate", "high", "advanced"];
             if (labelOrder.indexOf(calculatedLabel) > labelOrder.indexOf("intermediate")) {
                 finalLabel = "intermediate";
                 overrideReason = "(limited)";
             }
        }

        const activityScore = activityScoreMap[finalLabel] ?? 0;

        fitnessScoreValue.textContent = totalScore.toFixed(4);
        fitnessScoreLabel.textContent = `${finalLabel} ${overrideReason}`;
        scoreExercise.textContent = `Ex: ${exerciseScore.toFixed(2)}`;
        scoreStairs.textContent = `St: ${stairsScore.toFixed(2)}`;
        scoreSquats.textContent = squatsVal === "I don't know" ? "Sq: N/A" : `Sq: ${squatsScore.toFixed(2)}`;

        // Plan Score
        const weightedSumPlan = (flexScore * weights.flexibility) + (yogaScore * weights.yogaPilates) + (activityScore * weights.activityLevel);
        const planScore = weightedSumPlan / totalWeight;

        planScoreValue.textContent = planScore.toFixed(4);
        activityLevelScoreValue.textContent = activityScore.toFixed(2);
        let activityBreakdownHTML = '';
        for (const [key, value] of Object.entries(activityScoreMap)) {
            activityBreakdownHTML += `<div>${value.toFixed(2)} = "${key}"</div>`;
        }
        activityScoreBreakdown.innerHTML = activityBreakdownHTML;

        // Assigned Plan
        let planName = "N/A";
        const funnelId = getFunnelIdFromUrl() || "";
        if (funnelId.includes('w1') || funnelId.includes('w2')) {
             planName = (planScore <= 0.30) ? "Gentle Wall Pilates" : "Basic Wall Pilates";
        } else {
             planName = (planScore <= 0.30) ? "Gentle Chair Yoga" : "Basic Chair Yoga";
        }
        assignedPlanValue.textContent = planName;
        planScoreFormula.textContent = `PlanScore = ${planScore.toFixed(4)}`;
        fitnessScoreFormula.textContent = `FitScore = ${totalScore.toFixed(4)}`;

        // Show breakdowns
        flexScoreBreakdown.style.display = 'block';
        yogaScoreBreakdown.style.display = 'block';
        fitnessScoreBreakdown.style.display = 'block';
        activityScoreBreakdown.style.display = 'block';
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
            activeTabInput.value = data.activeTab || '';
            emailInput.value = data.personalInfo?.email || '';
        } catch(e) { /* Do nothing if JSON is invalid during typing */ }
    }

    function syncInputsToJsonArea() {
         try {
            let currentJson = JSON.parse(jsonDataArea.value);
            currentJson.activeTab = parseInt(activeTabInput.value, 10);
            if(currentJson.personalInfo) {
                 currentJson.personalInfo.email = emailInput.value;
            }
            jsonDataArea.value = JSON.stringify(currentJson, null, 2);
            updateHighlights();
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
                activeTabInput.value = cookieData.activeTab || '';
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
        loadDiscount();
        renderAgePresets();
        initMarketingParams();
        restoreSpoilers(); // Restore expanded state
    }

    function saveScreensCookie() {
        try {
            // Sync all inputs (like email, activeTab) to the JSON text area first
            syncInputsToJsonArea();

            // Now, parse the definitive data from the text area
            const data = JSON.parse(jsonDataArea.value);

            const encodedValue = encodeURIComponent(JSON.stringify(data));
            setCookie('screens', encodedValue, 365);
            showStatus("Saved! Reloading...");
            reloadPage();
        } catch (e) {
            showStatus('Invalid JSON!', true);
            console.error("Error saving cookie:", e);
        }
    }

    // --- Event Handlers ---
    saveBtn.addEventListener('click', saveScreensCookie);

    quickFillBtn.addEventListener('click', () => {
        const funnelId = getFunnelIdFromUrl();
        const randomSuffix = generateRandomString(5);
        let jsonData;

        if (funnelId === 'c1f23r' || funnelId === 'c2f23r') {
             jsonData = { ...config.chairYogaJson };
             jsonData.funnelId = funnelId;
             const prefix = funnelId === 'c2f23r' ? 'testc2' : 'testc1';
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail${prefix}+test_${randomSuffix}@gmail.com`;
                 if (funnelId === 'c2f23r') jsonData.personalInfo.name = "Chair Yoga 2";
             }
             showStatus(`Filled with Chair Yoga data (${funnelId})`);
        } else if (funnelId === 'w1f123r' || funnelId === 'w2f123r') {
             jsonData = { ...config.wallPilatesJson };
             jsonData.funnelId = funnelId;
             const prefix = funnelId === 'w2f123r' ? 'testw2' : 'testw1';
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmail${prefix}+test_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with Wall Pilates data (${funnelId})`);
        } else if (funnelId === 'chb2f23r') {
             jsonData = { ...config.chairBarreJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmailchb2+test_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with Chair Barre data (${funnelId})`);
        } else if (funnelId === 'tch2f23r') {
             jsonData = { ...config.taiChiJson };
             if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmailtch2+test_${randomSuffix}@gmail.com`;
             }
             showStatus(`Filled with Tai Chi data (${funnelId})`);
        } else {
            jsonData = config.defaultQuickFillJson;
            if(jsonData.personalInfo) {
                 jsonData.personalInfo.email = `hafrealtestmailf1+test_${randomSuffix}@gmail.com`;
            }
            showStatus("Fields filled with default template data.");
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
        reloadPage();
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
            const isHidden = content.style.display === 'none';
            content.style.display = isHidden ? 'block' : 'none';
            toggleIcon.textContent = isHidden ? '[-]' : '[+]';

            // Save state
            localStorage.setItem(storageKey, isHidden);
        });
    };

    toggleSpoiler(
        scoreSpoilerHeader,
        scoreSpoilerContent,
        scoreSpoilerToggle,
        config.storageKeys.scoreSpoiler
    );

    toggleSpoiler(
        personalSpoilerHeader,
        personalSpoilerContent,
        personalSpoilerToggle,
        config.storageKeys.personalSpoiler
    );

    // Personal Inputs Listeners
    pHeight.addEventListener('input', updateJsonFromPersonalInputs);
    pWeight.addEventListener('input', updateJsonFromPersonalInputs);
    pTargetWeight.addEventListener('input', updateJsonFromPersonalInputs);
    pAge.addEventListener('input', updateJsonFromPersonalInputs);

    // Score Buttons Delegation (Handles both Score and Personal buttons)
    panel.querySelector('#cookie-editor-content').addEventListener('click', (e) => {
        const target = e.target.closest('.score-set-btn');
        if (!target) return;
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
        loadSandboxData(); // Only reload sandbox UI
    });

    deleteSandboxBtn.addEventListener('click', () => {
        setCookie('sandbox_test', '', -1);
        showStatus("Deleted 'sandbox_test' cookie!");
        loadSandboxData(); // Only reload sandbox UI
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
        // --- FORCE RESET FOR MOBILE (v2.2.0 logic) ---
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
        let lastDiscountTs = localStorage.getItem('discountEndTimestamp');
        let lastDiscountExpired = localStorage.getItem('discountExpired');

        pollingInterval = setInterval(() => {
            const currentScreensCookie = getCookie('screens');
            const currentSandboxCookie = getCookie('sandbox_test');
            const currentDiscountTs = localStorage.getItem('discountEndTimestamp');
            const currentDiscountExpired = localStorage.getItem('discountExpired');

            if (currentScreensCookie !== lastKnownScreensCookie || currentSandboxCookie !== lastKnownSandboxCookie) {
                lastKnownScreensCookie = currentScreensCookie;
                lastKnownSandboxCookie = currentSandboxCookie;
                loadCookieStates();
            }

            if (currentDiscountTs !== lastDiscountTs || currentDiscountExpired !== lastDiscountExpired) {
                lastDiscountTs = currentDiscountTs;
                lastDiscountExpired = currentDiscountExpired;
                loadDiscount();
            }
        }, 750);
    }

    // --- Initialization ---
    // Using simple initialization like v1.6.6/v2.2.0 which proved stable
    document.body.appendChild(panel);
    loadCookieStates();
    makeDraggable(panel);
    initializePanelPosition(panel);
    startCookiePolling();

})();
