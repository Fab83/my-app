<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('nom', 255);
            $table->string('prenom', 255);
            $table->string('statut', 255);
            $table->string('adresse_proprietaire', 255);
            $table->string('commune_proprietaire');
            $table->string('email', 255);
            $table->string('telephone', 255);
            $table->integer('revenu_fiscal');
            $table->integer('nombre_personnes');
            $table->string('locataire_loyer', 255);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('contacts', function (Blueprint $table) {
            Schema::dropIfExists('contacts');
        });
    }
};
