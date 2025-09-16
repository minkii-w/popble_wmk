import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { postAdd } from "../../api/userApi";
import TextField from "@mui/material/TextField";




    const SignUpFormValues ={

        loginId:'',
        password:'',
        email:'',
        name:'',
      
        
    }
    

    const JoinComponent = () => {

       
        
   
     const {
        control,
        handleSubmit,
        getValues,
        trigger,

        formState: {errors,isValid},
     } = useForm({
        mode: 'onChange',
        defaultValues: SignUpFormValues,
     });
     



       

        const onSubmit = async (join) => {

              console.log("회원가입 시도 객체(join):", join);
        
        
        
                   const finalJoin = {
                        ...join,
                        
                 phonenumber: '010-0000-0000',
                role: 'MEMBER',
                 social: false
                 };

            try {
                const response = await postAdd(finalJoin);
                console.log("회원가입 성공:", response)

            } catch (e) {
                console.error("회원가입 실패:",e);
            }
        }
       

        




        return(





            
           <div>
     



      <div>
                  


            </div>


            <div className="flex justify-center">
        
               <div className="
                   relative
                   top-[-200px]
               w-[30em]
                h-40
                 bg-primaryColor
                  rounded-md
             
                     flex items-center justify-center
                     mb-[5em]
                     ">
      
                 </div>


            </div>
        <div
            className="
              justify-center
            w-[40em]
            h-[5em]

            "
        
        >
            <Controller
         name="name"
         control={control}
         defaultValue=""
         rules={{
             required: "닉네임을 입력하세요"
             
             
         }}

         render={({field}) => (

         <TextField
         {...field}
         label="닉네임"
         required
         
         fullWidth
         variant="standard"

            InputProps={{
                disableUnderline:true,
            }}

          


            sx={{

                 width: '450px',  

                top: '-505px',
               // left: '-30px',
                right: '-200px',
                
                border: "none",
                
                fontSize: '16px',
                lineHeight: 10,
         
                  backgroundColor: '#e5e5e5'
               
            }}


         onChange={ (e) => {
             field.onChange(e);
             trigger('name'); 
           
         }}
          helperText={errors.name && errors.loginId.name}
       
          
         />
    

        )}  

       
         />






        <Controller
            name="loginId"
            control={control}
            defaultValue=""
            rules={{
                required: "ID를 입력하세요"
                
            }}
        
            render={({field}) => (
        
            <TextField
           {...field}
         label="이메일"
         required
         
         fullWidth
         variant="standard"

            InputProps={{
                disableUnderline:true,
            }}

          


            sx={{

                 width: '450px',  

                top: '-505px',
               // left: '-30px',
                right: '-200px',
                
                border: "none",
                
                fontSize: '16px',
                lineHeight: 10,
         
                  backgroundColor: '#e5e5e5'
     
            }}
             helperText={errors.loginId && errors.loginId.message}
            />
            )}  
            />


                         <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "비밀번호 를 입력하세요"

                   
                        
                    }}

                    render={({field}) => (

                    <TextField
                    {...field}
                    label="비밀번호"
                    required
                    fullWidth
                    variant="standard"
                    onChange={ (e) => {
                        field.onChange(e);
                        trigger('password');
                        
                        
                      
                    }}
                     helperText={errors.password && errors.password.message}
                    />
                    



                    )}  
                    />


                <Controller
                    name="email"
                    control={control}
                    defaultValue={control}
                    rules={{
                        required: '이메일을 입력해주세요.',
                        pattern: {
                            value:/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: '유효한 이메일 주소를 입력해주세요. 예) example.com'
                        },
                    }}
                    render={({field }) => (
                   
                  <TextField

                    {...field}
                    label="이메일"
                    required
                    fullWidth
                    variant="standard"
                    placeholder="example@email.com"
                    
                    error={!!errors.email}
                    
                    helperText={errors.email && errors.email.message}
                    />

                        )}
                />


                   </div>



                     <div className="flex justify-center">
                <div className="relative mb-4 flex justify-center" >
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                     <button className="
               w-[60em]
                h-[4em]
                 bg-primaryColor
                  rounded-md
             
                     flex items-center justify-center
                     mb-[5em]
                     ">
      
                 </button>
                    </div>
                </div>


            </div>


       

            


      

      </div>


                        



        )




    }

    export default JoinComponent;









