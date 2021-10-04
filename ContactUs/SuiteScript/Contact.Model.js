/*
	© 2020 NetSuite Inc.
	User may not copy, modify, distribute, or re-bundle or otherwise make available this code;
	provided, however, if you are an authorized user with a NetSuite account or log-in, you
	may use this code subject to the terms that govern your access and use.
*/





// @module contact
// ----------
// Handles form submit for customer
// module contact
define('Contact.Model', [
    'SC.Model',
    'Utils',
    'SC.Models.Init',
    'Profile.Model',
    'LiveOrder.Model',
    'Address.Model',
    'CreditCard.Model',
    'SiteSettings.Model',
    'underscore'
], function(
    SCModel,
    Utils,
    Application,
    ModelsInit,
    Profile,
    LiveOrder,
    Address,
    CreditCard,
    SiteSettings,
    _
) {
    // @class Contact.Model Defines the model used by the all contact related services.
    // @extends SCModel
    return SCModel.extend({
        name: 'Contact',
        validation: {
            firstname: {
                required: true,
                msg: 'First Name is required'
            },

            // This code is commented temporally, because of the inconsistences between Checkout and My Account regarding the require data from profile information (Checkout can miss last name)
            lastname: {
                required: true,
                msg: 'Last Name is required'
            },

            email: {
                required: true,
                pattern: 'email',
                msg: 'Email is required'
            },
        },
        // @method register
        // @param {ContactUs Data} contactus_data
        // @param {Contact.Model.Attributes} contactus_data
        register: function(contactus_data) {
            var jsondata=contactus_data;
            var field ="subsidiary";
            var convert=JSON.stringify(jsondata);
            try{
                // if ((field in jsondata) === true) {
                    if(jsondata.hasOwnProperty(field)){
                        if(jsondata[field] !== ''){
                            console.warn(convert);
                                return{
                                    // success:true,
                                    successmessage:'thank you for contacting us'
                                }
                        }else{
                            return{
                                message:field+' is mandatory'
                            } 
                        }

                    }  
                else{
                    return{
                        message:field+' is not available'
                    }      
                }
            }catch(error){
                return{
                    message:'try again later'
                }      
            }    
        }     
    });
});

// @class ContactUsData
// @property {String} firstname
// @property {String} lastname
// @property {String} email
// @property {String} phone
// @property {String} comments

