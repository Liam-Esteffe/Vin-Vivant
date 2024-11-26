import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Ajout des imports nécessaires
import { Degustation } from '../../../interfaces/events.interface';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../environments/environments';

@Component({
  selector: 'app-domicile',
  templateUrl: './domicile.component.html',
  styleUrls: ['./domicile.component.scss']
})
export class DomicileComponent implements OnInit {
  public events: Array<Degustation> = [];
  public is_loading: boolean = true;
  public userForm: FormGroup;  // Formulaire réactif
  apiUrl: string = environment.apiUrl;
  DEGUSTATION_EVENT_API = `${this.apiUrl}event/degustation/`;
  DEGUSTATION_SUBSCRIBE_EVENT_API = `${this.apiUrl}event/inscription`;
  public test = "0";
  
  constructor(private http: HttpClient, private fb: FormBuilder, private messageService: MessageService,) {
    // Création du formulaire avec les validateurs
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]], // Pattern pour le téléphone
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit() {
    this.getLatestEvents();
  }

  // Méthode pour vérifier la disponibilité des places
  public checkAvailability(event_slug: string): boolean {
    const event = this.events.find(item => item.slug === event_slug);
    return event! && event.place > 0;
  }

  getEventForMail(event_slug: string) {
    const event = this.events.find(item => item.slug === event_slug);
    return event!;
  }

  // Méthode pour envoyer la demande d'inscription
  public buildPostRequest(event_slug: string) {
    if (this.userForm.valid && this.checkAvailability(event_slug)) {
      let requestObjectBody = {
        "user": {
          'name': this.userForm.value.name,
          'phone': this.userForm.value.phone,
          'email': this.userForm.value.email
        },
        "event": event_slug
      };

      this.http.post(this.DEGUSTATION_SUBSCRIBE_EVENT_API, requestObjectBody, {
        headers: new HttpHeaders()
      }).subscribe((result: any) => {
        this.sendEmail(event_slug)
      });
    } else {
      console.log("Le formulaire est invalide ou il n'y a plus de places disponibles");
    }
  }

  private sendEmail(event_slug: string): void {
    const templateParams = {
      from_name: this.userForm.value.name,
      user: {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        phone: this.userForm.value.phone,
      },
      event: {
        name: this.getEventForMail(event_slug).name,
        date: this.getEventForMail(event_slug).date,
      },
    };
    emailjs.send('service_g5ho193', 'template_76jyjir', templateParams, '5i-b3vFg0Lk-AjFBh')
      .then(() => {
        // Si l'email a été envoyé avec succès, afficher le message de succès
        this.messageService.add({
          severity: 'success', // Type de toast
          summary: 'Succès',
          detail: "L'inscrption à bien été passé !"
        });
      })
      .catch(() => {
        // En cas d'erreur lors de l'envoi d'email, afficher un message d'erreur
        this.messageService.add({
          severity: 'error', // Type de toast pour une erreur
          summary: 'Erreur', // Titre du message
          detail: 'Une erreur s\'est produite lors de l\'envoi de l\'email. Veuillez réessayer plus tard.' // Détail du message
        });
      });
      emailjs.send('service_g5ho193', 'template_t97zn6a', templateParams, '5i-b3vFg0Lk-AjFBh')
  }

  // Méthode pour récupérer les événements
  private getLatestEvents() {
    this.http.get(this.DEGUSTATION_EVENT_API).subscribe((results: any) => {
      const actualDate = new Date();

      this.events = results.filter((event: Degustation) => {
        const eventDate = new Date(event.date);
        return eventDate >= actualDate;
      });
      this.is_loading = false;
    });
  }
}