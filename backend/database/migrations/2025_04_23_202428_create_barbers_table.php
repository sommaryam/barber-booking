<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarbersTable extends Migration
{
    public function up()
    {
        Schema::create('barbers', function (Blueprint $table) {
            $table->id();  // سيتم إنشاء عمود 'id' تلقائيًا
            $table->string('name');
            $table->string('email')->nullable()->unique();
            $table->string('phone_number')->nullable();
            $table->string('specialization')->nullable();
            $table->string('profile_picture')->nullable();
            $table->timestamps();  // سيقوم بإنشاء 'created_at' و 'updated_at'
        });
    }

    public function down()
    {
        Schema::dropIfExists('barbers');
    }
}