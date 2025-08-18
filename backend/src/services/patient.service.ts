export const findPatientByEmail = async ( email: string ) => {
  retunr await Patinet.findOne({ where: { email }});
};