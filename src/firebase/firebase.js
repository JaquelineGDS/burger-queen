import { useState, useEffect } from 'react';
import firebase from '../firebaseConfig';
const database = firebase.firestore();

export const sendOrder = (products, client, total) => {
  setMenu([]);
  setName('');
  return database.collection('ordered').add({
    client,
    date: Date(),
    hours: `${new Date().getHours()}:${ new Date().getMinutes()}`,
    products,
    total,
  });
};