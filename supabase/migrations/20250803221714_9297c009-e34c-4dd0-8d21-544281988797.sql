-- Seed quiz questions with Nigerian curriculum content for WAEC and JAMB

-- Mathematics - Algebra questions
INSERT INTO public.quiz_questions (subject, topic, difficulty_level, exam_type, question_text, options, correct_answer, explanation) VALUES
('Mathematics', 'Algebra', 'medium', 'jamb', 'If 3x - 7 = 14, what is the value of x?', '["5", "7", "21", "9"]', 1, '3x - 7 = 14. Add 7 to both sides: 3x = 21. Divide by 3: x = 7'),
('Mathematics', 'Algebra', 'medium', 'jamb', 'What is the value of x² - 4x + 4 when x = 3?', '["1", "4", "9", "13"]', 0, 'Substitute x = 3: (3)² - 4(3) + 4 = 9 - 12 + 4 = 1'),
('Mathematics', 'Algebra', 'hard', 'jamb', 'Factorize: x² + 5x + 6', '["(x + 2)(x + 3)", "(x + 1)(x + 6)", "(x - 2)(x - 3)", "(x + 4)(x + 1)"]', 0, 'Find two numbers that multiply to 6 and add to 5: 2 and 3. So x² + 5x + 6 = (x + 2)(x + 3)'),
('Mathematics', 'Algebra', 'easy', 'waec', 'Solve for y: 2y + 5 = 13', '["4", "6", "8", "9"]', 0, '2y + 5 = 13. Subtract 5: 2y = 8. Divide by 2: y = 4'),
('Mathematics', 'Algebra', 'medium', 'waec', 'If y varies directly as x and y = 12 when x = 4, find y when x = 7', '["21", "28", "18", "24"]', 0, 'y ∝ x, so y = kx. When y = 12, x = 4: 12 = 4k, so k = 3. When x = 7: y = 3(7) = 21');

-- Physics - Mechanics questions
INSERT INTO public.quiz_questions (subject, topic, difficulty_level, exam_type, question_text, options, correct_answer, explanation) VALUES
('Physics', 'Mechanics', 'medium', 'jamb', 'A ball is thrown upward with an initial velocity of 20 m/s. What is its velocity after 2 seconds? (g = 10 m/s²)', '["0 m/s", "10 m/s", "20 m/s", "40 m/s"]', 0, 'Using v = u - gt: v = 20 - (10)(2) = 20 - 20 = 0 m/s'),
('Physics', 'Mechanics', 'medium', 'waec', 'What is the unit of momentum?', '["kg⋅m/s", "N⋅s", "Both A and B", "kg⋅m/s²"]', 2, 'Momentum p = mv has units kg⋅m/s. Since impulse = change in momentum, N⋅s is also correct.'),
('Physics', 'Mechanics', 'hard', 'jamb', 'A car accelerates from rest to 30 m/s in 6 seconds. What is the acceleration?', '["5 m/s²", "6 m/s²", "180 m/s²", "24 m/s²"]', 0, 'Using a = (v - u)/t: a = (30 - 0)/6 = 30/6 = 5 m/s²'),
('Physics', 'Mechanics', 'easy', 'waec', 'Which of the following is a vector quantity?', '["Speed", "Distance", "Velocity", "Time"]', 2, 'Velocity has both magnitude and direction, making it a vector quantity. Speed and distance are scalar quantities.');

-- Chemistry - Organic Chemistry questions
INSERT INTO public.quiz_questions (subject, topic, difficulty_level, exam_type, question_text, options, correct_answer, explanation) VALUES
('Chemistry', 'Organic Chemistry', 'easy', 'jamb', 'What is the molecular formula of methane?', '["CH₄", "C₂H₆", "CH₃OH", "C₂H₄"]', 0, 'Methane is the simplest alkane with one carbon atom bonded to four hydrogen atoms: CH₄'),
('Chemistry', 'Organic Chemistry', 'medium', 'waec', 'Which functional group is present in alcohols?', '["-OH", "-COOH", "-CHO", "-CO-"]', 0, 'Alcohols contain the hydroxyl functional group (-OH) attached to a carbon atom'),
('Chemistry', 'Organic Chemistry', 'hard', 'jamb', 'What type of reaction occurs when ethene reacts with hydrogen gas?', '["Substitution", "Addition", "Elimination", "Polymerization"]', 1, 'Ethene + H₂ → Ethane. This is an addition reaction where hydrogen atoms are added across the double bond'),
('Chemistry', 'Organic Chemistry', 'medium', 'waec', 'The IUPAC name for C₂H₅OH is:', '["Methanol", "Ethanol", "Propanol", "Butanol"]', 1, 'C₂H₅OH has 2 carbon atoms and the -OH group, making it ethanol (eth- for 2 carbons, -ol for alcohol)');

-- English - Grammar questions
INSERT INTO public.quiz_questions (subject, topic, difficulty_level, exam_type, question_text, options, correct_answer, explanation) VALUES
('English', 'Grammar', 'medium', 'jamb', 'Choose the correct sentence:', '["Each of the students have submitted their work", "Each of the students has submitted their work", "Each of the students have submitted his work", "Each of the students has submitted his or her work"]', 3, '''Each'' is singular, so it takes ''has''. For gender-neutral reference, use ''his or her'' or restructure the sentence.'),
('English', 'Grammar', 'easy', 'waec', 'What is the past tense of ''go''?', '["Gone", "Went", "Going", "Goes"]', 1, 'The past tense of the irregular verb ''go'' is ''went''. ''Gone'' is the past participle.'),
('English', 'Grammar', 'hard', 'jamb', 'Identify the figure of speech: ''The classroom was a zoo during the break.''', '["Simile", "Metaphor", "Personification", "Hyperbole"]', 1, 'This is a metaphor because it directly compares the classroom to a zoo without using ''like'' or ''as'''),
('English', 'Grammar', 'medium', 'waec', 'Choose the correct form: ''If I _____ rich, I would help the poor.''', '["am", "was", "were", "will be"]', 2, 'This is a second conditional sentence expressing an unreal present situation. Use ''were'' for all persons in the if-clause.');

-- Biology questions (additional subject)
INSERT INTO public.quiz_questions (subject, topic, difficulty_level, exam_type, question_text, options, correct_answer, explanation) VALUES
('Biology', 'Cell Biology', 'medium', 'jamb', 'Which organelle is responsible for protein synthesis?', '["Mitochondria", "Ribosome", "Nucleus", "Golgi apparatus"]', 1, 'Ribosomes are the cellular organelles responsible for protein synthesis through translation of mRNA'),
('Biology', 'Cell Biology', 'easy', 'waec', 'What is the basic unit of life?', '["Tissue", "Organ", "Cell", "Organism"]', 2, 'The cell is the basic structural and functional unit of all living organisms'),
('Biology', 'Genetics', 'hard', 'jamb', 'In a cross between two heterozygous plants (Aa × Aa), what is the probability of getting a homozygous recessive offspring?', '["25%", "50%", "75%", "100%"]', 0, 'In Aa × Aa cross: AA (25%), Aa (50%), aa (25%). Homozygous recessive (aa) = 25%'),
('Biology', 'Ecology', 'medium', 'waec', 'Which of the following is a primary consumer?', '["Lion", "Grass", "Rabbit", "Eagle"]', 2, 'Rabbits are herbivores that feed directly on producers (plants), making them primary consumers in the food chain');