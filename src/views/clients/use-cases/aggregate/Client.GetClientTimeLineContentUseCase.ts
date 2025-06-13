import { TimeLineContent } from '@/time-line-content/domain';
import { IClientAggregateRepository } from '@/views/clients/';

export class GetClientTimeLineUseCase {
  constructor(private readonly clientRepository: IClientAggregateRepository) {}

  async execute(clientId: string): Promise<TimeLineContent[]> {
    return this.clientRepository.getTimeLineContent(clientId);
  }
}
