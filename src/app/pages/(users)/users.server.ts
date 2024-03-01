import { isNull } from 'drizzle-orm';
import { db } from '../../../database/connection';
import { users } from '../../../database/models';

export const load = async () => {
  const result = await db.query.users.findMany({
    where: isNull(users.deletedAt),
  });

  console.debug(result);

  return result;
};
