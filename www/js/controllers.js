/**
 * Created by Ajaykumar on 8/31/2015.
 */

angular.module('starter.controllers', ['ionic.utils'])

    .controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
        $scope.about = true;
    })

    .controller('AuthCtrl', function($scope, LoginService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.login = function() {
            LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
                $state.go('app.home');
            }).error(function(data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            });
        };

        $scope.logout = function () {
            LoginService.logoutUser();
            $ionicLoading.show({template: 'Logging out....'});
            $localstorage.set('loggin_state', '');

            $timeout(function () {
                $ionicLoading.hide();
                $ionicHistory.clearCache();
                $ionicHistory.clearHistory();
                $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
                $state.go('login');
            }, 30);

        };
    })

    .controller('PatientCtrl', function ($scope, $stateParams, $ionicModal, $timeout, uuid2, AppointmentsFactory, PatientsFactory) {
        var patientId = $stateParams.patientId;
        $scope.patientInfo = null;
        var keepGoing = true;
        angular.forEach(PatientsFactory.all(), function (value, key) {
            if (keepGoing) {
                if (value.id.toString() === patientId) {
                    keepGoing = false;
                    $scope.patientInfo = value;
                    PatientsFactory.setLastActiveIndex(key);
                }
            }
        })

        var patients = PatientsFactory.all();
        $scope.inlinePatientInfoSave = function(patientInfo){
            var patients_last_index = PatientsFactory.getLastActiveIndex();
            patients[patients_last_index] = patientInfo;
            PatientsFactory.save(patients);
        }
    })

    .controller('AppointmentDetailsCtrl', function ($scope, $stateParams, $ionicModal, $timeout, uuid2, AppointmentsFactory, PatientsFactory) {
        var appointmentId = $stateParams.appointmentId;
        $scope.patientInfo = null;

        $scope.patientInfoMap = {};
        var generatePatientInfoMap = function (patientId) {
            angular.forEach(PatientsFactory.all(), function (value, key) {
                $scope.patientInfoMap[value.id] = value;
            })
        }
        generatePatientInfoMap();
        var pkeepGoing = true;

        var findPatientInfoFromId = function(patientId) {
            angular.forEach(PatientsFactory.all(), function (value, key) {
                if (pkeepGoing) {
                    if (value.id.toString() === patientId) {
                        pkeepGoing = false;
                        $scope.patientInfo = value;
                        PatientsFactory.setLastActiveIndex(key);
                    }
                }
            })
        }

        $scope.appointmentInfo = null;
        var keepGoing = true;
        var appointments = AppointmentsFactory.all();

        angular.forEach(appointments, function (value, key) {
            if (keepGoing) {
                if (value.id.toString() === appointmentId) {
                    keepGoing = false;
                    $scope.appointmentInfo = value;
                    console.log(value);
                    findPatientInfoFromId($scope.appointmentInfo.patientId);
                    AppointmentsFactory.setLastActiveIndex(key);
                }
            }
        })

        var patients = PatientsFactory.all();
        $scope.inlinePatientInfoSave = function(patientInfo){
            var patients_last_index = PatientsFactory.getLastActiveIndex();
            patients[patients_last_index] = patientInfo;
            PatientsFactory.save(patients);
        }

        $scope.inlineAppointmnetInfoSave = function(appointmentInfo){
            appointments[AppointmentsFactory.getLastActiveIndex()] = appointmentInfo;
            AppointmentsFactory.save(appointments);
        }
    })

    .controller('HomeCtrl', function ($scope, $state, $ionicModal, $timeout, uuid2, AppointmentsFactory, PatientsFactory) {
        // Appointments

        // All Saved appointments
        $scope.appointments = AppointmentsFactory.all();

        $scope.patientInfoMap = {};
        var generatePatientInfoMap = function (patientId) {
            angular.forEach(PatientsFactory.all(), function (value, key) {
                $scope.patientInfoMap[value.id] = value;
            })
        }
        generatePatientInfoMap();

        $scope.chooseApp = function(app) {

        }

        $scope.today = new Date();
        $scope.timeNow = new Date().getTime();

        // New appointment Modal initialization
        $ionicModal.fromTemplateUrl('templates/new-appointment.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.appointmentModal = modal;
            $scope.appointment = {};
        });
        //Show New appointment Modal
        $scope.showNewAppointmentModal = function() {
            $scope.appointmentModal.show();
        };
        //Hide New appointment Modal
        $scope.closeNewAppointmentModal = function() {
            $scope.appointmentModal.hide();
        }

        var findPatientInfoFromId = function(patientId) {
            angular.forEach(PatientsFactory.all(), function (value, key) {
                if (keepGoing) {
                    if (value.id.toString() === patientId) {
                        keepGoing = false;
                        $scope.patientInfo = value;
                    }
                }
            })
        }

        var createAppointment = function(Date, PatientId, Purpose, Category) {
            var newAppointment = AppointmentsFactory.newAppointment(uuid2.newguid(), Date, PatientId, Purpose, Category);
            $scope.appointments.push(newAppointment);
            AppointmentsFactory.save($scope.appointments);
//            $scope.selectAppointment(newAppointment, $scope.appointments.length-1);
        }
        //Save New appointment and close Modal
        $scope.saveNewAppointment = function(appointment) {
            if (appointment) {
                createAppointment(appointment.date, appointment.patientId, appointment.purpose, appointment.category);
                $scope.closeNewAppointmentModal();
            }
        }

//        $scope.onSelectPatient = function(patient) {
//            console.log(patient.id);
//        }
//
//        $scope.patientSearch = function(data) {
//            alert($scope.appointment.patient);
//        }

        // Patients
        $scope.patients = PatientsFactory.all();

        // New appointment Modal initialization
        $ionicModal.fromTemplateUrl('templates/new-patient.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.patientModal = modal;
            $scope.patient = "";
        });
        //Show New appointment Modal
        $scope.showNewPatientModal = function() {
            $scope.patientModal.show();
        };
        //Hide New patient Modal
        $scope.closeNewPatientModal = function() {
            $scope.patientModal.hide();
        }

        var createPatient = function(firstName, lastName, phone) {
            var newPatient = PatientsFactory.newPatient(uuid2.newguid(), firstName, lastName, phone, new Date());
            $scope.patients.push(newPatient);
            PatientsFactory.save($scope.patients);
//            $scope.selectPatient(newPatient, $scope.Patients.length-1);
        }
        //Save New Patient and close Modal
        $scope.saveNewPatient = function(patient) {
            if (patient) {
                createPatient(patient.firstName, patient.lastName, patient.phone);
                $scope.closeNewPatientModal();
            }
        }

        // Billing
    })