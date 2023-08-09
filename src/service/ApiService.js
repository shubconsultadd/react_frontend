import axios from "axios";

class ApiService {
    constructor() {
        this.baseURL = "http://52.66.239.60:8000/backend";
        this.baseURL2 = "http://127.0.0.1:8080/api/v1"
    }

    async Login(endpoint, data, config) {
        try{
            const response = await axios.post(this.baseURL + endpoint, data, config);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async Register(endpoint, data) {
        try{
            const response = await axios.post(this.baseURL + endpoint, data);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async fetchUserInfo(endpoint) {
        try {
            const response = await axios.get(this.baseURL + endpoint);
            return response.data;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async addTravelPlan(endpoint, data) {
        try{
            const response = await axios.post(this.baseURL + endpoint, data);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async getAllPlans(endpoint) {
        try{
            const response = await axios.get(this.baseURL + endpoint);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async getPlan(endpoint, options) {
        try{
            const response = await axios.get(this.baseURL + endpoint, options);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async deletePlan(endpoint){
        try{
            const response = await axios.delete(this.baseURL + endpoint);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async registerPlan(endpoint, data) {
        try{
            const response = await axios.post(this.baseURL + endpoint, data);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async deRegisterPlan(endpoint, data){
        try{
            const response = await axios.delete(this.baseURL + endpoint, data);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async plansRegisteredByUser(endpoint) {
        try{
            const response = await axios.get(this.baseURL + endpoint);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async modifyTravelPlan(endpoint, data){
        try{
            const response = await axios.put(this.baseURL + endpoint, data);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async showPlansWithRegisteredUsers(endpoint){
        try{
            const response = await axios.get(this.baseURL + endpoint);
            return response;
        }
        catch(error){
            throw new Error(error);
        }
    }

    async isUserRegisteredWithThePlan(endpoint) {
        try{
            const response = await axios.get(this.baseURL + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async GetAdminUserName(endpoint) {
        try{
            const response = await axios.get(this.baseURL + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }
    async AddNotification(endpoint, data){
        try{
            const response = await axios.post(this.baseURL2 + endpoint, data);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }
    async GetUnreadNotificationCount(endpoint) {
        try{
            const response = await axios.get(this.baseURL2 + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }
    async GetUnreadNotification(endpoint){
        try{
            const response = await axios.get(this.baseURL2 + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async MarkNotificationAsRead(endpoint) {
        try{
            const response = await axios.post(this.baseURL2 + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }

    async MarkAllNotificationsAsRead(endpoint) {
        try{
            const response = await axios.post(this.baseURL2 + endpoint);
            return response;
        }
        catch(err){
            throw new Error(err);
        }
    }
}

export default new ApiService();