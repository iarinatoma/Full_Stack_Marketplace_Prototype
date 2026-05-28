<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ab_shoppingcart', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->unsignedBigInteger('ab_creator_id')->nullable(false);
            $table->timestamp('ab_createdate')->nullable(false);
        });
    }

    public function down(): void {
        Schema::dropIfExists('ab_shoppingcart');
    }
};
