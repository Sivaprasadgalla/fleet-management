import React,{useState,useEffect} from 'react'
import DataTable from 'react-data-table-component'
import {Search,Eye,Pencil,Trash2,Plus,X,CheckCircle,UserRound,Mail,Phone,CreditCard } from 'lucide-react'
import { useDispatch,useSelector } from 'react-redux'
import { getDrivers,getDriver,createDriver,updateDriver,deleteDriver } from '../../app/drivers/driverAction'

const emptyFormData = {
    
     firstName:"",
     lastName:"",
     phoneNumber:"",
     email:"",
     licenseNumber:"",
     licenseExpiry:"",
     status:"active"
}
const Drivers = () => {
        const dispatch = useDispatch();
        const {drivers, loading, error} = useSelector((state)=> state.drivers);
        const {user : loggedInUser} = useSelector((state) => state.auth);
        
        const [search,setSearch] =useState("")
        const [showForm,setShowForm] =useState(false);
        const [showView,setShowView] =useState(false);
        const [editMode,setEditMode] =useState(false);
        const [selectedDriver,setSelectedDriver] = useState(null);

        const [formData,setFormData] = useState(emptyFormData);

        useEffect(()=>{
            dispatch(getDrivers());
        },[dispatch])

        const handleChange = (e)=>{
            const {name,value} =e.target;
            setFormData((prev)=>({
                ...prev,
                [name] : value
            }))
        }

// add driver
     const handleAddDriver =()=>{
        setEditMode(false);
        setSelectedDriver(null);
        setFormData(...emptyFormData);
        setShowForm(true);
     }
//edit driver
     const handleEdit = (row)=>{
        setEditMode(true);
        setSelectedDriver(row);
        setFormData({
            firstName: row.firstName || "",
            lastName: row.lastName || "",
            phoneNumber: row.phoneNumber || "",
            email : row.email || "",
            licenseNumber: row.licenseNumber || "",
            licenseExpiry: row.licenseExpiry ? row.licenseExpiry.subString(0,10) : "",
            status: row.status || "active"
        })
        setShowForm(true);
     }

//close form 
    const closeForm =()=>{
        setShowForm(false);
        setEditMode(false);
        setSelectedDriver(null);
        setFormData(...emptyFormData);
    }
//create and update driver
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            //create driver
            if(!editMode){
                const createPayload ={
                    userId : loggedInUser?.userId,
                    firstName : formData.firstName.trim(),
                    lastName : formData.lastName.trim(),
                    phoneNumber: formData.phoneNumber.trim(),
                    email : formData.email.trim(),
                    licenseNumber : formData.licenseNumber.trim(),
                    licenseExpiry : formData.licenseExpiry.trim(),
                    status : formData.status
                }
                await dispatch(createDriver(createPayload)).unwrap();
                await dispatch(getDrivers()).unwrap();
                closeForm();
                return
            }
            //update driver
            if(!loggedInUser?.userId){
               alert("Logged-in user ID not found.");
               return;
            }
            if(!selectedDriver?._id){
                alert("Driver ID not found.");
               return;
            }
            const updatePyload ={
                userId : loggedInUser?.userId,
                 id : selectedDriver?._id, 
                firstName : formData.firstName.trim(),
                lastName : formData.lastName.trim(),
                phoneNumber: formData.phoneNumber.trim(),
                email : formData.email.trim(),
                licenseNumber : formData.licenseNumber.trim(),
                licenseExpiry : formData.licenseExpiry.trim(),
                status : formData.status
            }
            await dispatch(updateDriver(updatePyload)).unwrap();
            await dispatch(getDrivers()).unwrap();
            closeForm();
            return
            
        } catch (error) {
             console.error("Driver operation failed:", err);

      alert(
        err?.message ||
          err?.error ||
          "Driver operation failed"
      );
        }
    }

//view Driver
    const handleView =async (id)=>{
        try {
            setShowView(false);
            setSelectedDriver(null);
            const response = await dispatch(getDriver(id)).unwrap();
            const driverData = response?.data;
            if(!driverData){
                alert("Driver details not found");
                return;
            }
            setSelectedDriver(driverData);
            setShowView(true);
        } catch (error) {
            console.error("View driver failed:", error);
            alert(error?.message || error?.error || "Unable to get driver details");
        }
    }

//close view
const closeView = () => {
    setShowView(false);
    setSelectedUser(null);
  };
//delete driver
const handleDelete = async(id)=>{
     const confirmDelete = window.confirm(
    "Are you sure you want to delete this driver?");

    if (!confirmDelete) return;
    try {
        await dispatch(deleteDriver(id)).unwrap();
        await dispatch(getDrivers()).unwrap();
    } catch (error) {
        console.error("Delete driver failed:", error);
        alert(error?.message || error?.error ||"Unable to delete driver");     
    }
}
  return (
    <div>Drivers</div>
  )
}

export default Drivers