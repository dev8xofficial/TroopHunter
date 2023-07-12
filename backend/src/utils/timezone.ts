import BusinessSource from '../models/BusinessSource';
import Timezone from '../models/Timezone';
import { SourceAttributes } from '../types/businessSource';
import { TimezoneAttributes } from '../types/timezone';

export const findOrCreateTimezone = async (timezone: TimezoneAttributes): Promise<TimezoneAttributes | undefined> => {
  try {
    const { timezoneName, utcOffset, dst, dstOffset, countryCode } = timezone;
    const [record, created] = await Timezone.findOrCreate({
      where: { timezoneName, utcOffset, dst, dstOffset, countryCode },
      defaults: { createdAt: new Date(), updatedAt: new Date() },
    });

    if (created) {
      return record.toJSON() as TimezoneAttributes;
    } else {
      return record.toJSON() as TimezoneAttributes;
    }
  } catch (error) {
    console.error('Failed to find or create business timezone:', error);
  }
};
