import { Request, Response } from "express";
import { container } from "tsyringe";

import ListProviderMonthAvailabilityServices from '@modules/appointments/services/ListProviderMonthAvailabilityServices';

class ProviderMonthAvailabilityController{
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params
    const { day, month, year } = request.body

    const listProviderMonthAvailability = container.resolve(ListProviderMonthAvailabilityServices);
    const availability = await listProviderMonthAvailability.execute({
      provider_id,
      month,
      year
    });

    return response.json(availability);
  }
}

export default new ProviderMonthAvailabilityController
