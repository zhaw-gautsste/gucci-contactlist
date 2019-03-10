import { Injectable } from '@angular/core';
import { Contact } from './contact';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ContactService {
  private contactsUrl = '/api/contacts';

  constructor (private http: HttpClient) {}

  // get("/api/contacts")
  getContacts(): Promise<void | Contact[]> {
    return this.http.get(this.contactsUrl)
      .toPromise()
      .then(response => JSON.parse(response.toString()) as Contact[])
      .catch(this.handleError);
  }

  // post("/api/contacts")
  createContact(newContact: Contact): Promise<void | Contact> {
    return this.http.post(this.contactsUrl, newContact)
      .toPromise()
      .then(response => JSON.parse(response.toString()) as Contact)
      .catch(this.handleError);
  }

  // get("/api/contacts/:id") endpoint not used by Angular app

  // delete("/api/contacts/:id")
  deleteContact(delContactId: String): Promise<void | String> {
    return this.http.delete(this.contactsUrl + '/' + delContactId)
      .toPromise()
      .then(response => JSON.parse(response.toString()) as String)
      .catch(this.handleError);
  }

  // put("/api/contacts/:id")
  updateContact(putContact: Contact): Promise<void | Contact> {
    const putUrl = this.contactsUrl + '/' + putContact._id;
    return this.http.put(putUrl, putContact)
      .toPromise()
      .then(response => JSON.parse(response.toString()) as Contact)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
  }
}
