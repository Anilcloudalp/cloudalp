/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/

/// <amd-module name="Contact.View"/>
/// <reference path="../../../Commons/Utilities/JavaScript/UnderscoreExtended.d.ts"/>

import * as _ from 'underscore';
import * as contact_tpl from 'contact_us.tpl';
import * as Utils from '../../../Commons/Utilities/JavaScript/Utils';
import { Loggers } from '../../../Commons/Loggers/JavaScript/Loggers';
import { GlobalViewsMessageView } from '../../../Commons/GlobalViews/JavaScript/GlobalViews.Message.View';
import Backbone = require('../../../Commons/Utilities/JavaScript/backbone.custom');
import BackboneView = require('../../../Commons/BackboneExtras/JavaScript/Backbone.View');
import ContactUsModel = require('./Contact.Us.Model');
import BackboneFormView = require('../../../Commons/Backbone.FormView/JavaScript/Backbone.FormView');

// @module Contact.View @extends Backbone.View
const ContactView: any = BackboneView.extend({
    template: contact_tpl,

    title: Utils.translate('Contact us'),

    page_header: Utils.translate('Contact us'),

    attributes: {
        id: 'landing-page',
        class: 'landing-page'
    },

    events: {
        'click [data-action="validate"]': 'validateFields',
    },
    
    bindings:{
        '[name="firstname"]': 'firstname',
        '[name="lastname"]': 'lastname',
        '[name="email"]': 'email',
        '[name="phone"]': 'phone',
        '[name="comments"]': 'comments',
        '[name="subsidiary"]':'subsidiary'
    },

    initialize:function(){
        this.model = new ContactUsModel();
        this.model.on('save', _.bind(this.showSuccess, this));
        this.model.on('saveCompleted', _.bind(this.resetForm, this));
        BackboneFormView.add(this);
        
    },
    resetForm:function(event){
        this.model.unset('firstname');
        this.model.unset('lastname');
        this.model.unset('email');
        this.model.unset('phone');
        this.model.unset('comments');
        this.model.unset('subsidiary');
        event && event.preventDefault();
    },
    showSuccess: function() {
      if (this.$savingForm) {
        const global_view_message = new GlobalViewsMessageView({
          message: Utils.translate("Your's request is submitted and Thank you for contacting us"),
          type: 'success',
          closable: true
        });
      }
    },

    validateFields: function(e, model, props) {
        const self =  this;
        const loggers = Loggers.getLogger();
        const actionId = loggers.start('contact-submit form');

        const promise = self.saveForm(e, model, props);

        if (promise) {
            promise.done(() => {
                loggers.end(actionId, {
                    operationIds: self.model.getOperationIds(),
                    status: 'success'
                });
            });
            return promise && promise.then
               (
                 function(success){
                   if (success.successmessage){
                     self.showMessage(success.successmessage, 'success');
                   }else{
                     self.showMessage(success.message, 'error')
                    }
                  }
                  , function(fail){
                      fail.preventDefault = true;
              
                      _.each(fail.responseJSON.errormessage, function(message, field){
                        self.showMessage(message, 'error', field);
                      });
                      // _.each(fail.errormessage, function(message, field)
                      // {
                      //   self.showMessage(message, 'error', field);
                      // });
                    
                    //   if (fail.message){
                    //     self.showMessage(fail.message, 'error');
                    //   }
                      
                    }
                );
                // const placeholder = jQuery('<div/>', {
                //     'id': 'alert-placeholder',
                //     'class':'any1'
                // });
                // this.$el
                // .children()
                // .first()
                // .prepend(placeholder);
                // const global_view_message = new GlobalViewsMessageView({
                //     message: "Your's request is submitted and Thank you",
                //     type: 'success',
                //     closable: true
                // });
                // placeholder.append(global_view_message.render().$el.html());
                // console.log(global_view_message.options.message);
                // alert(global_view_message.options.message);
                // alert(global_view_message.render().$el.html());
        }else{
            //     const placeholder = jQuery('<div/>', {
            //         'id': 'alert-placeholder',
            //         'class':'any1'

            //     });
            //     this.$el
            //     .children()
            //     .first()
            //     .prepend(placeholder);
            //     const global_view_message = new GlobalViewsMessageView({
            //         message: "Something went wrong, please try again later!",
            //         type: 'error',
            //         closable: true
            //     });
            //     placeholder.append(global_view_message.render().$el.html());
            //     // alert(global_view_message.options.message);
            //     console.log(global_view_message.options.message);
            }
               
    },     
     showMessage: function(message, type, field){

     if(type === 'error'){  
        const global_view_message = new GlobalViewsMessageView({
          message:message,
          // message:message,
          type: 'error',
          closable: true
        });
     
        this.$('[data-type="alert-placeholder"]').append(global_view_message.render().$el.html());
      }else{
        const globa_view_message = new GlobalViewsMessageView({
          message:message,
          // message:message,
          type: 'success',
          closable: true
        });
   
        this.$('[data-type="alert-placeholder"]').append(globa_view_message.render().$el.html());
      } 
  },    
   
    // @method getContext @return Contact.View.Context
    getContext: function() {
        
      return {
             
      };
    }
});

export = ContactView;


