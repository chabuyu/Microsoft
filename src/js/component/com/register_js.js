define(["jquery"], () => {
	class Register{
		constructor(){
			this.init();
		}
		init(){
            $(function(){
                $("#register_next").on("click",function(e){
                    e.preventDefault()
                    console.log(1);
                    
                })
            })
            
		}
	}
    return new Register();
                    console.log(1);
    
})