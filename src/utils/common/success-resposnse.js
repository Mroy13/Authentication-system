const success={
    success:true,
    message:'successfully completed request',
    data:{},
    error:{},
    reset() {
        this.data = null;
        this.message = "successfully completed request";
    },
}

module.exports=success