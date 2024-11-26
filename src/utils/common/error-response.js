const error={
    success:false,
    message:`something went wrong`,
    data:{},
    error:{},
    reset() {
        this.error = null;
    }
}

module.exports=error