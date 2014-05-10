// Cars Collection
Cars = new Meteor.Collection('cars');

Cars.allow({
    'insert' : function () { return true; },
    'update' : function () { return true; },
    'remove' : function () { return true; }
});

// Test Collection
TestCollection = new Meteor.Collection2('test', {
    schema : {
        'name' : {
            type : String
        }
    }
});

TestCollection.allow({
    'insert' : function () { return true; },
    'update' : function () { return true; },
    'remove' : function () { return true; }
});

// Router Configuration
Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'rootTemplate'
    });
});

if (Meteor.isServer) {
    Meteor.publish('all', function () {
        return [TestCollection.find(), Cars.find()];
    })
}

// Ogno Admin Configuration
OgnoAdmin.config({
    'prefix' : '/admin',
    'auto' : true,
    'homeScreenTemplate' : 'test',
    'homeScreenTemplateGuest' : 'cant_view',
    'waitOn' : function () {
        return Meteor.subscribe('all');
    }
});

Meteor.users.allow({
    'insert' : function () { return true; },
    'update' : function () { return true; },
    'remove' : function () { return true; }
});

// Ogno Admin extend structure
OgnoAdmin.structure([
    {
        'weight' : 3,
        'type' : 'custom',
        'use' : 'customTemplate',
        'icon' : 'pencil',
        'menu-title' : 'Custom Menu Item'
    }
]);
