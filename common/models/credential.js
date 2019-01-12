'use strict';

module.exports = function(Credential) {
    // Credential.observe('after save', function setRoleMapping(ctx, next) {
    //     if (ctx.instance) {
    //       if(ctx.isNewInstance) {
      
    //         // look up role based on type
    //         //
    //         // Role.find({where: {name: ctx.instance.type}}, function(err, role) {
    //         //   if (err) {return console.log(err);}
      
    //         //   RoleMapping.create({
    //         //     principalType: "USER",
    //         //     principalId: ctx.instance.id,
    //         //     roleId: role.id
    //         //   }, function(err, roleMapping) {
      
    //         //     if (err) {return console.log(err);}
      
    //         //     console.log('User assigned RoleID ' + role.id + ' (' + ctx.instance.type + ')');
      
    //         //   }):
      
    //         // });

    //         console.log("value for  ctx.instance.type: "+ctx.instance.type)
      
    //       }
    //     }
    //     next();
    //   });
    // Credential.removeRoleMapping =function(roleId, cb){
    //   cb(null,)
    // }
};
