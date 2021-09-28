const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => console.log("veri tabanına bağlanıldı"))
.catch(hata => console.log(`veri tabanı bağlantı hatası ${hata}`))