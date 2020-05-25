<template>
  <div id="upload-video" class="upload-video">
    <div class="container">
      <h1>Upload Video</h1>
      <!-- add steps to upload video here -->

      <div class="steps" style="margin: 10rem 0">
        <a-steps :current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" />
        </a-steps>
        <div class="steps-content">
          <div class="step-1" v-if="current==0">
            <a-upload-dragger
              name="file"
              :fileList="fileList"
              :loading="loading"
              :multiple="false"
              :headers="headers"
              action="http://localhost:5000/api/video/upload-file"
              @change="handleFileChange"
              :beforeUpload="beforeUpload"
              :remove="handleRemove"
            >
              <div class="ant-upload-drag-icon" v-if="!uploading">
                <a-icon type="plus" style="font-size: 5rem"/>
                <p class="ant-upload-text">Click or drag file to this area to upload</p>
              </div>
              <div class="ant-upload-drag-icon" v-if="uploading">
                <p type="upload" style="font-size: 3rem">{{`${uploadProgress}%`}}</p>
                <p class="ant-upload-text">Uploading...</p>
              </div>
              
            </a-upload-dragger>
          </div>

          <div class="step-2" v-if="current==1" style="text-align: left">
            <a-row>
              <a-col :span="12" style="padding: 0 1rem">
                <a-form>
              <a-form-item label="Title">
                <a-input type="text" v-model="title" required></a-input>
              </a-form-item>
              <a-form-item label="Description">
                <a-input type="textarea" v-model="description" required></a-input>
              </a-form-item>
              <a-form-item label="Secret">
                <a-radio-group  v-model="secret" defaultValue="public">
                <a-radio-button  value="private">Private</a-radio-button>
                <a-radio-button value="public">Public</a-radio-button>
              </a-radio-group>
              </a-form-item>
              <a-form-item label="Category">
                <a-select style="width: 300px" placeholder="Select category" v-model="category" @change="onCategoryChange">
                  <a-select-option value="film">Film</a-select-option>
                  <a-select-option value="music">Music</a-select-option>
                  <a-select-option value="sport">Sports</a-select-option>
                  <a-select-option value="gaming">Gaming</a-select-option>
                  <a-select-option value="food">Food</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
              </a-col>
              <a-col :span="12" style="margin-top:0rem">
                <video v-if="file" :src="`http://localhost:5000/${file.path}`" controls width="100%"></video>
              </a-col>
            </a-row>
          </div>

          <div class="step-3" v-if="current==2" style="text-align:left; padding: 1rem">
            <p><span><b>Title: </b> </span><span>{{title}}</span></p> 
            <p><span><b>Description: </b> </span><span>{{description}}</span></p> 
            <p><span><b>Secret: </b> </span><span>{{secret}}</span></p> 
            <p><span><b>Category: </b> </span><span>{{category}}</span></p> 
          </div>
        </div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1 && current >=1" type="primary" @click="next">Next</a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="onFinishing"
            :loading="loading"
          >Finish</a-button>
          <a-button v-if="current>1" style="margin-left: 8px" @click="prev">Previous</a-button>
          <a-button v-if="current>0" type="danger" style="margin-left: 8px" @click="handleRemove" >Cancel</a-button>
        </div>
      </div>

      <!-- finish step -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "upload-video",
  data() {
    return {
      current: 0,
      fileList:[],
      steps: [
        {
          title: "Upload video",
          content: "First-content"
        },
        {
          title: "Add details",
          content: "Second-content"
        },
        {
          title: "Finishing",
          content: "Last-content"
        }
      ],
      file: null,
      uploading: false,
      uploadProgress: '',
      loading: false,
      title: "",
      description: "",
      secret: 'public',
      category: null,
      headers: {
        "x-auth-token": this.$store.state.auth.accessToken
      }
    };
  },
  methods: {
    next() {
      if(this.title === '' || this.description === '' || this.category === null ) {
        this.$message.error('Please enter all fields')
      } else {
        this.current++;
      }
      
    },
    prev() {
      this.current--;
    },
    handleFileChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
        console.log(info.file.percent)
      }
      if (status == "uploading") {
        // console.log(info.fileList);
        this.uploading = true;
        this.uploadProgress = Math.floor(info.file.percent,0)
        // console.log(Math.floor(info.file.percent,0))
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} file uploaded successfully.`);
        this.uploading = false;
        this.current = 1;
        if (info.file.response) {
          this.file = info.file.response.fileUploaded
          this.title = info.file.response.fileUploaded.originalname
        }
      } else if (status === "error") {
        this.$message.error(`${info.file.name} file upload failed.`);
      }

      this.fileList = info.fileList
    },
    beforeUpload(file) {
      const isMP4orMov = file.type === "video/mp4" || file.type === "video/mov";
      if (!isMP4orMov) {
        this.$message.error("You can only upload .MP4 file!");
      } else {
        this.fileList=[file]
      }
      return isMP4orMov;
    },
    async handleRemove() {
      if (this.file)
      try {
        const response = await axios.post(
          "http://localhost:5000/api/video/remove-file",
          { filePath: this.file.path },
          this.headers
        );
        if (response) {
          this.title = "";
          this.file = null;
          this.uploading = false;
          this.current = 0;
          this.fileList = []
        }
      } catch (err) {
        console.log(err);
        this.$message.error(err);
      }
    },
    onSecretChange() {
      // this.secret = value;
      // console.log(e.target.value)
      console.log(this.secret)
    }
    ,
    onCategoryChange(value) {
      this.category = value;
      console.log(this.category)
    },
// send request to create video
    async onFinishing(e) {
      e.preventDefault();
      const config = {
        headers: {
          "x-auth-token": this.$store.state.auth.accessToken
        }
      };

      const newVideo = {
        title: this.title,
        description: this.description,
        secret: this.secret,
        category: this.category,
        filePath: this.file.path,
        author: this.$store.getters.getCurrentUser._id
      }
      console.log(newVideo);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/video",
          {video: newVideo},
          config
        );

        if (response) {
          this.$message.success("upload successfully.");
          console.log(response.data.video)
          this.$router.push({name:'home'})
        }
      } catch (err) {
        console.log(err);
        this.uploading = false;
        this.$message.error("upload failed.");
      }
    }
  }
};
</script>

<style lang="less">
#upload-video {
  position: relative;
  height: 100vh;

  .container {
    width: 50%;
    margin: 10rem auto;
    .ant-upload.ant-upload-drag {
      width: 15rem;
      height: 15rem;
      margin: 1rem auto;
      border-radius: 50%;
    }
  }
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding: 80px 0;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>