import { QueryResult } from 'pg';

import { getDB } from '../db';
import { CreateEvent } from '../types';

async function newEvent(eventObject: CreateEvent) {
  let db = await getDB();

  let {
    event_name,
    category,
    place,
    price,
    description,
    available_seat,
    image,
  } = eventObject;

  let values = [
    event_name,
    category,
    place,
    price,
    description,
    available_seat,
    image,
  ];

  let result: QueryResult = await db.query(
    'INSERT INTO events (event_name, category, place, price, description, available_seat, image) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
    values,
  );

  let event = result.rows[0];

  return {
    success: true,
    data: {
      id: event.id,
      event_name: event.event_name,
      category: event.category,
      place: event.place,
      price: event.price,
      description: event.description,
      available_seat: event.available_seat,
      image: event.image,
    },
    message: 'Event created successfully',
  };
}

export default { newEvent };
