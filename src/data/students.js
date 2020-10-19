export const studentsRawData = [
  {
    firstName: 'Alex',
    lastName: 'Buteau',
    githubUserName: 'AlexButeau',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Amandine',
    lastName: 'Gervis',
    githubUserName: 'AmandineGervis',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Antoine',
    lastName: 'Gorenflot',
    githubUserName: 'AntoineGGG',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Aymeric',
    lastName: 'Bouault',
    githubUserName: 'Abouault',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Brieuc',
    lastName: 'Quertier',
    githubUserName: 'BrieucQ',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Caroline',
    lastName: 'Morlet',
    githubUserName: 'carolinemorlet',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Cédric',
    lastName: 'Leroy',
    githubUserName: 'leroy117',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Christian',
    lastName: 'Théobald',
    githubUserName: 'christiantheobald',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Clément',
    lastName: 'Garcin',
    githubUserName: 'gclement28',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Eddy',
    lastName: 'Mandran',
    githubUserName: 'eddymandran',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Gilles',
    lastName: 'Autier',
    githubUserName: 'Guillou33',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Guillem',
    lastName: 'Dardill',
    githubUserName: 'Twiggui',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Jean',
    lastName: 'Ducret',
    githubUserName: 'jeandct',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Julien',
    lastName: 'Pellattiero',
    githubUserName: 'Pella0',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Karen',
    lastName: 'Orduña',
    githubUserName: 'KarenOrduna',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Laurence',
    lastName: 'Portron',
    githubUserName: 'LaurencePortron',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Louise',
    lastName: 'Ceccaldi',
    githubUserName: 'LouiseCeccaldi',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Nathan',
    lastName: 'Vanstaevel',
    githubUserName: 'Nathan-Vanstaevel/',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Nicolas',
    lastName: 'Dantas',
    githubUserName: 'nicolasdantas',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Rémi',
    lastName: 'Cusset',
    githubUserName: 'lerem-s38',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Romain',
    lastName: 'Montel',
    githubUserName: 'Rom-mtl',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Sabrina',
    lastName: 'Karakog',
    githubUserName: 'SaKara69',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Thibault',
    lastName: 'Verin',
    githubUserName: 'ThibaultVerin',
    firstTrainerMeetingDone: false,
  },
  {
    firstName: 'Thomas',
    lastName: 'Chevaleraud',
    githubUserName: 'ThomasChevaleraud',
    firstTrainerMeetingDone: false,
  },
];

export class Student {
  constructor(props) {
    for (const key in props) {
      this[key] = props[key];
    }
  }

  get avatarUrl() {
    return `https://github.com/${this.githubUserName}.png`;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }

  static persistAll() {
    localStorage.setItem('students', JSON.stringify(students));
  }
}

const studentsFromStorage = JSON.parse(localStorage.getItem('students'));
const students =
  studentsFromStorage ||
  studentsRawData.map((rawStudentData) => new Student(rawStudentData));

window.students = students;
export default students;
