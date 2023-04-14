<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChannelsTest extends TestCase
{
    public function test_contains_table(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertSee('laravel');
    }
}
