import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityServices from '@modules/appointments/services/ListProviderDayAvailabilityServices';

class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityServices,
    );
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(availability);
  }
}

export default new ProviderDayAvailabilityController();
