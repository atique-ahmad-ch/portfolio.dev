import { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { insertContactSchema } from '../shared/schema';

// In-memory storage for contacts (you may want to replace this with a database)
let contacts: any[] = [];
let currentId = 1;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
    try {
      const validatedData = insertContactSchema.parse(req.body);
      const contact = {
        ...validatedData,
        id: currentId++,
        createdAt: new Date()
      };
      contacts.push(contact);
      
      res.status(200).json({ success: true, contact });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          success: false, 
          message: "Invalid form data", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ 
          success: false, 
          message: "Failed to send message" 
        });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}