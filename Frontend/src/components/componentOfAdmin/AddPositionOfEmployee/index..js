import classNames from "classnames/bind";
import style from './AddPositionOfEmployee.module.scss';
import { useEffect,useState } from "react";
import axios from "axios";
import { useForm } from 'react-hook-form';

import Button from "src/components/Button";
import Swal from "sweetalert2";
const cx = classNames.bind(style);

function AddPositionOfEmployee(props) {
    const [position, setPosition] = useState(props.position)
    const cancelHandle = () => {
        props.sendData(0);
        props.sendAllPositions(position);
    }    
      //  useForm
      const {register,
        handleSubmit,
        reset,
        formState : {errors,isSubmitSuccessful}
        } = useForm({
        defaultValues:{
          name :"",
          salary : 0,
        }
      });
      const onSubmit = async(data) => {
        try {
          const result = (await axios.post('/api/positionofemployee/createpositionofemployee',data)).data;
          if (result) {
            await Swal.fire({
            icon: 'success',
            title: 'Thêm chức vụ và lương thành công',
            text: 'Chức vụ và lương đã được thêm vào danh sách',
          })
          setPosition(result);}
        } catch (error) {
          console.log(error)
        }
      };
      useEffect(()=>{
        if (isSubmitSuccessful) {
          reset({
            name :"",
            salary : 0,
          })
        }
      },[isSubmitSuccessful,reset])

    return (
      <>
        <div className={cx("title","flex")}> 
          <h2>Thêm chức vụ của nhân viên</h2>
          <div className={cx("flex")}>
              <Button 
                    onClick={cancelHandle}
                    feature
                    className={cx("btn","cancelBtn")}
                >
                    Cancel
                </Button>
                <Button 
                    onClick={handleSubmit(onSubmit)}
                    feature
                    className={cx("btn","addBtn")}
                >
                    Add
                </Button>
          </div>
        </div>
        <div className={cx("body")}> 
          <form 
            key={1}
            onSubmit={handleSubmit(onSubmit)} 
            className={cx('form')}>
            {/* LEFT FORM ------------------------------------------------------------------------------------ */}
            <div className={cx("leftForm")}> 
              {/* 1. title name */}
              <div  className={cx('form-group')}>
                  <label htmlFor="name" className={cx('form-label')}>
                      Tên chức vụ
                  </label>
                  <input
                      {...register("name", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ tên chức vụ, công việc"
                        },
                        value:""})} // react hook form
                      id="name"
                      name="name"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.name && (
                          <span className={cx("error")}>{errors.name.message}</span>
                      )}
                  </div>
              </div>
              {/* 2. salary  */}
              <div  className={cx('form-group')}>
                  <label htmlFor="salary" className={cx('form-label')}>
                      Giá Lương
                  </label>
                  <input
                      {...register("salary", {
                        required: {
                          value: true,
                          message:"Vui lòng nhập đầy đủ giá lương"
                        },
                        valueAsNumber: {
                          value: true,
                          message:"Trường này bắt buộc là chữ số"
                        },
                        value:0})} // react hook form
                      id="salary"
                      name="salary"
                      type="text"
                      className={cx('form-control-left')}
                  ></input>
                  <div className={cx("errorDiv")}>
                      {errors.salary && (
                          <span className={cx("error")}>{errors.salary.message}</span>
                      )}
                  </div>
              </div>
            </div>
          </form>
        </div>
      </>
     );
}

export default AddPositionOfEmployee;