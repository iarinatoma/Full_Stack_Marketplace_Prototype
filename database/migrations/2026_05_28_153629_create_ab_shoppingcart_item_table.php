<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('ab_shoppingcart_item', function (Blueprint $table) {
            $table->unsignedBigInteger('id')->autoIncrement();
            $table->unsignedBigInteger('ab_shoppingcart_id')->nullable(false);
            $table->unsignedBigInteger('ab_article_id')->nullable(false);
            $table->timestamp('ab_createdate')->nullable(false);

            // cerinta a) - cascade delete
            $table->foreign('ab_shoppingcart_id')
                ->references('id')
                ->on('ab_shoppingcart')
                ->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('ab_shoppingcart_item');
    }
};
