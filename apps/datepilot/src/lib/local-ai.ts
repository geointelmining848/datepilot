import { generateAskOutResult } from './askOutHelper';
import { generateOpeners } from './openerGenerator';
import { generateProfileDoctorResult } from './profileDoctor';
import { generateReplyCoachResult } from './replyCoach';

export const localAi = {
  runProfileDoctor: generateProfileDoctorResult,
  runOpenerGenerator: generateOpeners,
  runReplyCoach: generateReplyCoachResult,
  runAskOutHelper: generateAskOutResult,
};
