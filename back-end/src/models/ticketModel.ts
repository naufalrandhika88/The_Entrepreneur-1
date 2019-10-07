import { getDB } from '../db';
import { BuyTicket } from '../types';

async function buyTicket(ticketObject: BuyTicket) {
  try {
    let db = await getDB();

    let { id_event, id_user, type, qty, total } = ticketObject;
    let values = [id_event, id_user, type, qty, total];

    let result = await db.query(
      'INSERT INTO tickets (id_event, id_user, type, qty, total) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values,
    );
    let ticket = result.rows[0];

    return {
      success: true,
      data: {
        id_event: ticket.id_event,
        id_user: ticket.id_user,
        type: ticket.type,
        qty: ticket.qty,
        total: ticket.total,
      },
      message: 'Successfully purchased tickets',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default { buyTicket };
