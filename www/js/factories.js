/**
 * Created by rajaka1 on 9/11/2015.
 */
angular.module('starter.factories', [])

    .factory('AppointmentsFactory', function () {
        return {
            all: function () {
                var appointmentString = window.localStorage['appointments'];
                if (appointmentString) {
                    return angular.fromJson(appointmentString);
                }
                return [];
            },
            save: function (appointments) {
                window.localStorage['appointments'] = angular.toJson(appointments);
            },
            newAppointment: function (guid, Date, PatientId, Purpose, Category) {
                // Add a new Appointmnet
                return {
                    id: guid,
                    date: Date,
                    patientId: PatientId,
                    purpose: Purpose,
                    category: Category,
                    status: [],
                    billing: '',
                    other_notes: '',
                    clinical_notes: '',
                    medications: '',
                    followup_date: ''
                };
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveProject']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveProject'] = index;
            }
        }
    })

    .factory('PatientsFactory', function () {
        return {
            all: function () {
                var projectString = window.localStorage['patients'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [];
            },
            save: function (patients) {
                window.localStorage['patients'] = angular.toJson(patients);
            },
            newPatient: function (uuid, first_name, last_name, phone, email, joining_date) {
                // Add a new patient
                return {
                    id: uuid,
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    joined_on: joining_date,
                    email: email
                };
            },
            getPatientInfo: function (id) {
                var patients = this.all();
                var keepGoing = true;
                angular.forEach(patients, function (value, key) {
                    if (keepGoing) {
                        if (value.id.toString() === id) {
                            console.log(value);
                            keepGoing = false;
                            return value;
                        }
                    }
                })
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActivePatient']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActivePatient'] = index;
            }
        }
    })

    .factory('LaboratoryFactory', function () {
        return {
            all: function () {
                var projectString = window.localStorage['labs'];
                if (projectString) {
                    return angular.fromJson(projectString);
                }
                return [{
                    'test': 'Lipid',
                    'charges': 200
                    },
                    {
                        'test': 'Test2',
                        'charges': 200
                    },
                    {
                        'test': 'Test3',
                        'charges': 300
                    },
                ];
            },
            save: function (labs) {
                window.localStorage['labs'] = angular.toJson(labs);
            },
            newLab: function (uuid, first_name, last_name, phone, email, joining_date) {
                // Add a new Lab
                return {
                    id: uuid,
                    first_name: first_name,
                    last_name: last_name,
                    phone: phone,
                    joined_on: joining_date,
                    email: email
                };
            },
            getLabInfo: function (id) {
                var labs = this.all();
                var keepGoing = true;
                angular.forEach(labs, function (value, key) {
                    if (keepGoing) {
                        if (value.id.toString() === id) {
                            console.log(value);
                            keepGoing = false;
                            return value;
                        }
                    }
                })
            },
            getLastActiveIndex: function () {
                return parseInt(window.localStorage['lastActiveLab']) || 0;
            },
            setLastActiveIndex: function (index) {
                window.localStorage['lastActiveLab'] = index;
            }
        }
    })