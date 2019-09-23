import { QueryResult } from 'pg';
import moment from 'moment';

import { getDB } from '../db';
import { CreateEvent, ReqEditEventObject } from '../types';

async function newEvent(eventObject: CreateEvent) {
  try {
    let db = await getDB();

    let {
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    } = eventObject;

    let values = [
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    ];

    let result: QueryResult = await db.query(
      'INSERT INTO events (event_name, category, event_date, place, price, description, available_seat, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      values,
    );

    let event = result.rows[0];

    return {
      success: true,
      data: {
        id: event.id,
        event_name: event.event_name,
        category: event.category,
        event_date: event.event_date,
        place: event.place,
        price: event.price,
        description: event.description,
        available_seat: event.available_seat,
        image: event.image,
      },
      message: 'Event created successfully',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getEvent() {
  try {
    let db = await getDB();

    let result: QueryResult = await db.query('SELECT * FROM events');

    let event = result.rows;

    return {
      success: true,
      data: {
        event,
      },
      message: 'Successfully retrieve events data',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function getEventById(id: string) {
  try {
    let db = await getDB();

    let result: QueryResult = await db.query(
      'SELECT * FROM events where id=$1',
      [id],
    );

    let event = result.rows[0];

    return {
      success: true,
      data: {
        id: event.id,
        event_name: event.event_name,
        category: event.category,
        event_date: event.event_date,
        place: event.place,
        price: event.price,
        description: event.description,
        available_seat: event.available_seat,
        image: event.image,
      },
      message: 'Successfully retrieve event data',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function editEvent(eventObject: ReqEditEventObject, id) {
  try {
    let {
      event_name,
      category,
      event_date,
      place,
      price,
      description,
      available_seat,
      image,
    } = eventObject;
    let db = await getDB();

    await db.query(
      'UPDATE events SET event_name=$1, category=$2, event_date=$3, place=$4, price=$5, description=$6, available_seat=$7, image=$8 WHERE id=$9',
      [
        event_name,
        category,
        event_date,
        place,
        price,
        description,
        available_seat,
        image,
        id,
      ],
    );

    let result = await getEventById(id);

    return {
      success: true,
      data: result.data,
      message: 'Event has been updated',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

async function deleteEvent(id: string) {
  try {
    let db = await getDB();

    await db.query('DELETE FROM events where id=$1', [id]);

    return {
      success: true,
      data: {},
      message: 'Successfully delete event',
    };
  } catch (e) {
    return {
      success: false,
      data: {},
      message: String(e),
    };
  }
}

export default { newEvent, getEvent, getEventById, editEvent, deleteEvent };
