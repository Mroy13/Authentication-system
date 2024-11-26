const error={
    success:false,
    message:`something went wrong`,
    data:{},
    error:{},
    reset() {
        this.error = null;
        this.data=null;
        this.message="something went wrong";
    }
}

module.exports=error