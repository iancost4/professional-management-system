export const exceptionsMessages = {
  internalServerError: 'Erro interno do servidor',
  availability: {
    notFoundError: 'Disponibilidade não encontrada',
    unprocessableShortTimeEntityError: 'Intervalo de horário muito curto!',
    unprocessableTimeEntityError: 'Horários inválidos!',
    unprocessableEntityError: 'Dados inválidos!',
  },
  bookings: {
    unprocessableProfessionalTimeAvailableEntityError:
      'Profissional não possui este horário!',
    unprocessableTimeAvailableEntityError: 'Horários indisponivel!',
    unprocessableTimeEntityError: 'Horários inválidos!',
  },
  user: {
    notFoundError: 'Usuário não encontrado',
  },
};
