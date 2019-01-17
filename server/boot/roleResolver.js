const util = require('util')

module.exports = function (app) {
  var Role = app.models.role;
  
  var roleList = [
    'Admin',
    'D4VMember',
    'BloodReqModerator'
  ]
console.log("test line")
   roleList.forEach((roleName) =>{
     console.log("For role:"+roleName)
    Role.registerResolver(roleName, function (role, context, cb) {
    
      console.log("test line model name is :" + util.inspect(context.accessToken, true, 1, true))
  
      // if (context.modelName !== 'educationRequest') {
      //   // A: No. This role is only for projects: callback with FALSE
      //   return process.nextTick(() => cb(null, false));
      // }
  
      //Q: Is the user logged in? (there will be an accessToken with an ID if so)
      var userId = context.accessToken.userId;
      if (!userId) {
        //A: No, user is NOT logged in: callback with FALSE
        return process.nextTick(() => cb(null, false));
      }
  
      // Q: Does the user have 'admin' as one of its role
      // Step 1: get the user details
      var userDetails = app.models.credential;
      // Step 2: use findByID by using user id got from user
      userDetails.findById(userId, {
        // Step 3: include roles in the result set
        include: 'roles'
      }, (err, userObjList) => {
        if (err) return cb(err);
        userObjList.roles.find(
          function (err, resp) {
            if (err) return cb(err);
            var isValidReq = false
            resp.forEach(element => {
              if (element.name == roleName)
                isValidReq = true
            });
            if (isValidReq)
              return process.nextTick(() => cb(null, true));
            else
              return process.nextTick(() => cb(null, false));
          })
        // userObjList.roles.forEach((userObj)=>{
        //   var obj = userObj.toJSON();
        //   console.log("insinde the for each"+obj.name)
        // })
  
      })
  
      // context.model.findById(userId, function(err, response){
      //   if(err) return cb(err);
      //   console.log(response)
      //   return process.nextTick(() => cb(null, false));
      // })
  
      //Q: Is the current logged-in user associated with this Project?
      //Step 1: lookup the requested project
      // context.model.findById(context.userId, function(err, project) {
      //   // A: The datastore produced an error! Pass error to callback
      //   if(err) return cb(err);
      //   // A: There's no project by this ID! Pass error to callback
      //   if(!project) return cb(new Error("Project not found"));
  
      //   // Step 2: check if User is part of the Team associated with this Project
      //   // (using count() because we only want to know if such a record exists)
      //   var Team = app.models.Team;
      //   Team.count({
      //     ownerId: project.ownerId,
      //     memberId: userId
      //   }, function(err, count) {
      //     // A: The datastore produced an error! Pass error to callback
      //     if (err) return cb(err);
  
      //     if(count > 0){
      //       // A: YES. At least one Team associated with this User AND Project
      //       // callback with TRUE, user is role:`teamMember`
      //       return cb(null, true);
      //     }
  
      // else{
      //       // A: NO, User is not in this Project's Team
      //       // callback with FALSE, user is NOT role:`teamMember`
      //       return cb(null, false);
      //     }
      //   });
      // });
    });
   })

  
};