import { getUserData } from '@/lib/actions/login-patient.actions';

describe('getUserData function', () => {
  it('should retrieve the current logged in user\'s data', async () => {
    try {
      const userData = await getUserData();
      console.log('Current logged in user\'s data:');
      console.log(userData);
      expect(userData).toBeDefined();
      expect(userData.userName).toBeDefined();
      expect(userData.userId).toBeDefined();
      expect(userData.userGender).toBeDefined();
      expect(userData.userOccupation).toBeDefined();
      expect(userData.userInsuranceProvider).toBeDefined();
      expect(userData.userAllergies).toBeDefined();
      expect(userData.userMedication).toBeDefined();
      expect(userData.userPhysician).toBeDefined();
    } catch (error) {
      console.error('Error retrieving user data:', error);
      expect(error).toBeNull();
    }
  });
});