// @ts-nocheck
import request from 'supertest';
import { describe, it, expect } from 'vitest';

// 👇 AQUÍ ESTÁ LA MAGIA: Le decimos que entre a src/
import app from '../src/index'; 

describe('API de tareas - Bug 3', () => {
  it('rechaza crear una tarea con texto vacio o espacios', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ text: '   ' });
    
    expect(res.status).toBe(400);
  });
});