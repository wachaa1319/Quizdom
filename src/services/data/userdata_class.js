class User_data{
    constructor(email,password,name,lastname,username,year_of_birth){
        this.email=email;
        this.password=password;
        this.name=name;
        this.lastname=lastname;
        this.username=username;
        this.year_of_birth=year_of_birth;
        this.email=String(this.email);
        this.password=String(this.password);
        this.name=String(this.name);
        this.lastname=String(this.lastname);
        this.username=String(this.username);
    }
    map_info(this,milestones,exp,level,current_theme,achievement,map_decor){
        this.milestones=milestones
        this.exp=exp
        this.level=level
        this.current_theme=current_theme
        this.achievement=achievement
        this.map_decor=map_decor
        this.map_1m=[this.milestons,this.exp,this.level]
    }
    user_profile_info(this,friend,achievement_pg,about_me,theme,questions_data,profile_pic,map_pg,subject_like,fav_badge,frame,banner){
        this.friend=friend
        this.achievement_pg=achievement_pg
        this.about_me=about_me
        this.theme=theme
        this.questions_data=questions_data
        this.profile_pic=profile_pic
        this.map_pg=map_pg
        this.subject_like=subject_like
        this.fav_badge=fav_badge
        this.frame=frame
        this.banner=banner
    }
    plan_info(this,name_plan,map_in_p){
        this.name_plan=name_plan
        this.map_in_p=map_in_p
    }
}